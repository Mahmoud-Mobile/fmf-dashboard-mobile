import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { Colors } from "../../Global/colors";
import CustomHeader from "../../components/CustomHeader";
import QRScanResultModalSubEvent from "../../components/QRScanResultModalSubEvent";
import QRScanResultModalResource from "../../components/QRScanResultModalResource";
import QRScanErrorModalSubEvent from "../../components/QRScanErrorModalSubEvent";
import QRScanErrorModalResource from "../../components/QRScanErrorModalResource";
import { styles } from "./Styles";
import {
  subEvent_Checkin,
  resource_Checkin,
  subEvent_Checkout,
  resource_Checkout,
} from "../../webservice/apiConfig";
import { useNavigation } from "@react-navigation/native";

const CameraQRScanner = ({ onScanned }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const eventId = route.params?.eventId;
  const subEventId = route.params?.subEventId;
  const resourceId = route.params?.resourceId;
  const scanLocation = route.params?.scanLocation;
  const mode = route.params?.mode || "checkin"; // "checkin" or "checkout"

  // console.log("route params", route.params);

  const [permission, requestPermission] = useCameraPermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const isLockedRef = useRef(false);
  const isFocused = useIsFocused();
  const successModalRef = useRef(null);
  const errorModalRef = useRef(null);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleScanned_subEvent = useCallback(
    async (qrCode) => {
      console.log("QR Code scanned:", qrCode);
      setScannedData(qrCode);
      setIsLoadingUserInfo(true);
      setErrorMessage(null);

      try {
        const payload = {
          qrCode: qrCode,
          scanLocation: scanLocation || "",
        };
        const response =
          mode === "checkout"
            ? await subEvent_Checkout(eventId, subEventId, payload)
            : await subEvent_Checkin(eventId, subEventId, payload);
        console.log("response", response);
        setUserInfo(response);
        successModalRef.current?.open();
      } catch (error) {
        console.log("Error object:", error);
        const errorData = error?.response?.data || error?.data || {};
        const errorMsg =
          errorData?.message ||
          error?.message ||
          errorData?.error ||
          `Failed to ${
            mode === "checkout" ? "check out" : "check in"
          }. Please try again.`;
        setErrorMessage(errorMsg);
        errorModalRef.current?.open();
      } finally {
        setIsLoadingUserInfo(false);
      }
    },
    [eventId, subEventId, scanLocation, mode]
  );

  const handleScanned_Resource = useCallback(
    async (qrCode) => {
      console.log("QR Code scanned:", qrCode);
      setScannedData(qrCode);
      setIsLoadingUserInfo(true);
      setErrorMessage(null);

      try {
        const payload = {
          qrCode: qrCode,
          scanLocation: scanLocation || "",
        };
        const response =
          mode === "checkout"
            ? await resource_Checkout(eventId, resourceId, payload)
            : await resource_Checkin(eventId, resourceId, payload);
        console.log("response", response);
        setUserInfo(response);
        successModalRef.current?.open();
      } catch (error) {
        console.log("Error object:", error);
        const errorData = error?.response?.data || error?.data || {};
        const errorMsg =
          errorData?.message ||
          error?.message ||
          errorData?.error ||
          `Failed to ${
            mode === "checkout" ? "check out" : "check in"
          }. Please try again.`;
        setErrorMessage(errorMsg);
        errorModalRef.current?.open();
      } finally {
        setIsLoadingUserInfo(false);
      }
    },
    [eventId, resourceId, scanLocation, mode]
  );

  const handleScanAnother = useCallback(() => {
    isLockedRef.current = false;
    setUserInfo(null);
    setScannedData(null);
    setErrorMessage(null);
  }, []);

  const handleTryAgain = useCallback(() => {
    isLockedRef.current = false;
    setErrorMessage(null);
  }, []);

  const handleManualRegister = useCallback(() => {
    if (subEventId && scannedData) {
      navigation.navigate("PreviewSeats", {
        eventId: eventId,
        subEventID: subEventId,
        qrCode: scannedData,
        manualRegisterMode: true,
      });
    }
  }, [navigation, eventId, subEventId, scannedData]);
  const handleShowSeats = useCallback(
    (userInfoData) => {
      const data = userInfoData || userInfo;
      navigation.navigate("ShowSeats", {
        participantId: data?.participant?.id,
      });
    },
    [userInfo]
  );

  const handleShowProfile = useCallback((userInfoData) => {
    const data = userInfoData || userInfo;
    navigation.navigate("AudienceProfile", {
      userInfo: data,
      participantId: data?.participant?.id,
    });
  }, []);

  const handleBarCodeScanned = useCallback(
    async ({ data }) => {
      if (isLockedRef.current || !data) return;

      isLockedRef.current = true;
      setIsProcessing(true);

      try {
        if (subEventId) {
          await handleScanned_subEvent(String(data));
        } else if (resourceId) {
          await handleScanned_Resource(String(data));
        }
      } finally {
        setIsProcessing(false);
      }
    },
    [subEventId, resourceId, handleScanned_subEvent, handleScanned_Resource]
  );

  useEffect(() => {
    if (!permission) return;
    if (!permission.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const isReady = Boolean(permission?.granted);

  useEffect(() => {
    if (!isFocused) {
      isLockedRef.current = false;
      setIsProcessing(false);
    }
  }, [isFocused]);

  if (!isReady) {
    return (
      <View style={styles.container}>
        <CustomHeader
          leftLabel="Camera Scanner"
          onLeftButtonPress={handleBack}
        />
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.White} />
          <Text style={styles.loadingText}>
            Requesting camera permission...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader
        leftLabel={
          mode === "checkout" ? "Camera Scanner - Check Out" : "Camera Scanner"
        }
        onLeftButtonPress={handleBack}
      />

      <View style={styles.container}>
        {isFocused ? (
          <CameraView
            style={StyleSheet.absoluteFill}
            facing="back"
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            onBarcodeScanned={handleBarCodeScanned}
          />
        ) : null}
        {isProcessing ? (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.processingText}>Processing QR Code...</Text>
          </View>
        ) : null}

        <View style={styles.scanArea}>
          <View style={styles.scanFrame} />
          <Text style={styles.scanText}>Position QR code within the frame</Text>
        </View>
      </View>

      {subEventId ? (
        <>
          <QRScanResultModalSubEvent
            ref={successModalRef}
            onScanAnother={handleScanAnother}
            onShowSeats={handleShowSeats}
            onShowProfile={handleShowProfile}
            userInfo={userInfo}
            isLoading={isLoadingUserInfo}
          />
          <QRScanErrorModalSubEvent
            ref={errorModalRef}
            onTryAgain={handleTryAgain}
            errorMessage={errorMessage}
            onManualRegister={handleManualRegister}
            showManualRegister={
              !!subEventId &&
              !!scannedData &&
              !!errorMessage &&
              mode !== "checkout"
            }
          />
        </>
      ) : resourceId ? (
        <>
          <QRScanResultModalResource
            ref={successModalRef}
            onScanAnother={handleScanAnother}
            onShowSeats={handleShowSeats}
            onShowProfile={handleShowProfile}
            userInfo={userInfo}
            isLoading={isLoadingUserInfo}
          />
          <QRScanErrorModalResource
            ref={errorModalRef}
            onTryAgain={handleTryAgain}
            errorMessage={errorMessage}
            showManualRegister={false}
          />
        </>
      ) : null}
    </View>
  );
};

export default CameraQRScanner;
