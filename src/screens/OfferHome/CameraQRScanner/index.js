import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import {
  useIsFocused,
  useRoute,
  useNavigation,
} from "@react-navigation/native";
import { Colors } from "../../../Global/colors";
import CustomHeader from "../../../components/CustomHeader";
import QRScanResultModalOfferHome from "../../../components/QRScanResultModalOfferHome";
import { styles } from "./Styles";
import { checkin_OfferHome } from "../../../webservice/apiConfig";

const CameraQRScannerOfferHome = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const eventId = route.params?.eventId;
  const vendorId = route.params?.vendorId;

  const [permission, requestPermission] = useCameraPermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const isLockedRef = useRef(false);
  const isFocused = useIsFocused();
  const modalRef = useRef(null);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleScanned = useCallback(
    async (qrCode) => {
      setIsLoadingUserInfo(true);
      setErrorMessage(null);

      const payload = {
        vendorId: vendorId,
        mainevent: eventId,
      };

      try {
        const response = await checkin_OfferHome(eventId, vendorId, payload);
        setUserInfo(response);
        setIsSuccess(true);
        setErrorMessage(null);
        modalRef.current?.open();
      } catch (error) {
        const errorData = error?.response?.data || error?.data || {};
        const errorMsg =
          errorData?.message ||
          error?.message ||
          errorData?.error ||
          "Failed to check in. Please try again.";
        setErrorMessage(errorMsg);
        setUserInfo(null);
        setIsSuccess(false);
        modalRef.current?.open();
      } finally {
        setIsLoadingUserInfo(false);
      }
    },
    [eventId, vendorId]
  );

  const handleScanAnother = useCallback(() => {
    isLockedRef.current = false;
    setUserInfo(null);
    setErrorMessage(null);
    setIsSuccess(false);
  }, []);

  const handleTryAgain = useCallback(() => {
    isLockedRef.current = false;
    setErrorMessage(null);
    setIsSuccess(false);
  }, []);

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

      <QRScanResultModalOfferHome
        ref={modalRef}
        isSuccess={isSuccess}
        userInfo={userInfo}
        errorMessage={errorMessage}
        onScanAnother={handleScanAnother}
        onTryAgain={handleTryAgain}
        isLoading={isLoadingUserInfo}
      />
    </View>
  );
};

export default CameraQRScannerOfferHome;
