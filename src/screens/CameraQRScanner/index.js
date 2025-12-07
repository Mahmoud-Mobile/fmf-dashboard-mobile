import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { Colors } from "../../Global/colors";
import CustomHeader from "../../components/CustomHeader";
import navigationService from "../../Global/navRef";
import QRScanResultModal from "../../components/QRScanResultModal";
import QRScanErrorModal from "../../components/QRScanErrorModal";
import { styles } from "./Styles";
import { checkIn } from "../../webservice/apiConfig";

const CameraQRScanner = ({ onScanned }) => {
  const route = useRoute();
  const eventId = route.params?.eventId;
  const subEventId = route.params?.subEventId;
  const scanLocation = route.params?.scanLocation;

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
    navigationService.navigation?.goBack();
  };

  const handleScanned = useCallback(
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
        const response = await checkIn(eventId, subEventId, payload);
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
          "Failed to check in. Please try again.";
        setErrorMessage(errorMsg);
        errorModalRef.current?.open();
      } finally {
        setIsLoadingUserInfo(false);
      }
    },
    [eventId, subEventId, scanLocation]
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

  const handleShowSeats = useCallback(() => {
    navigationService.navigation?.navigate("ShowSeats", {
      title: "Show Seats",
    });
  }, [scannedData]);

  const handleShowProfile = useCallback(() => {
    navigationService.navigation?.navigate("AudienceProfile", {
      userInfo: userInfo,
    });
  }, [userInfo]);

  const handleBarCodeScanned = useCallback(
    async ({ data }) => {
      if (isLockedRef.current || !data) return;

      isLockedRef.current = true;
      setIsProcessing(true);

      try {
        await handleScanned(String(data));
      } finally {
        setIsProcessing(false);
      }
    },
    [handleScanned]
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
      <CustomHeader leftLabel="Camera Scanner" onLeftButtonPress={handleBack} />

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

      <QRScanResultModal
        ref={successModalRef}
        onScanAnother={handleScanAnother}
        onShowSeats={handleShowSeats}
        onShowProfile={handleShowProfile}
        userInfo={userInfo}
        isLoading={isLoadingUserInfo}
      />

      <QRScanErrorModal
        ref={errorModalRef}
        onTryAgain={handleTryAgain}
        errorMessage={errorMessage}
      />
    </View>
  );
};

export default CameraQRScanner;
