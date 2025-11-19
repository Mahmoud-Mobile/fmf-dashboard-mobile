import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { Colors } from "../../Global/colors";
import CustomHeader from "../../components/CustomHeader";
import navigationService from "../../Global/navRef";
import QRScanResultModal from "../../components/QRScanResultModal";
import { styles } from "./Styles";

// Mock function to fetch user info from QR code
// Replace this with your actual API call
const fetchUserInfoFromQR = async (qrData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, you would parse the QR data or make an API call
      // For now, return mock data
      resolve({
        name: "John Doe",
        email: "john.doe@example.com",
        mobile: "+1 234 567 8900",
        address: "123 Main Street, City, State 12345",
        image: null,
      });
    }, 1000);
  });
};

const CameraQRScanner = ({ onScanned }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const isLockedRef = useRef(false);
  const isFocused = useIsFocused();
  const modalRef = useRef(null);

  const handleBack = () => {
    navigationService.navigation?.goBack();
  };

  const handleScanned = useCallback(async (data) => {
    console.log("QR Code scanned:", data);
    setScannedData(data);
    setIsLoadingUserInfo(true);

    try {
      // Fetch user info from QR code
      const info = await fetchUserInfoFromQR(data);
      setUserInfo(info);
      // Open modal
      modalRef.current?.open();
    } catch (error) {
      console.error("Error fetching user info:", error);
      // Still show modal with basic info
      setUserInfo({ name: "User", email: null, mobile: null, address: null });
      modalRef.current?.open();
    } finally {
      setIsLoadingUserInfo(false);
    }
  }, []);

  const handleScanAnother = useCallback(() => {
    // Reset lock to allow another scan
    isLockedRef.current = false;
    setUserInfo(null);
    setScannedData(null);
  }, []);

  const handleShowSeats = useCallback(() => {
    navigationService.navigation?.navigate("ShowSeats", {
      title: "Show Seats",
      // imageUri: scannedData, // Uncomment if QR code contains image URL
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
        ref={modalRef}
        onScanAnother={handleScanAnother}
        onShowSeats={handleShowSeats}
        onShowProfile={handleShowProfile}
        userInfo={userInfo}
        isLoading={isLoadingUserInfo}
      />
    </View>
  );
};

export default CameraQRScanner;
