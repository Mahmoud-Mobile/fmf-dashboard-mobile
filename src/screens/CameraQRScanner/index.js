import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CameraView, useCameraPermissions } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { Colors } from "../../Global/colors";
import CustomHeader from "../../components/CustomHeader";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import navigationService from "../../Global/navRef";
import { styles } from "./Styles";

const CameraQRScanner = ({ onScanned }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const isLockedRef = useRef(false);
  const isFocused = useIsFocused();

  const handleBarCodeScanned = useCallback(
    async ({ data }) => {
      if (isLockedRef.current || !data) return;
      isLockedRef.current = true;
      setIsProcessing(true);
      try {
        await handleScanned(String(data));
      } finally {
        setIsProcessing(false);
        setTimeout(() => {
          isLockedRef.current = false;
        }, 1000);
      }
    },
    [onScanned]
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
      // Ensure we don't stay locked or processing when leaving the screen
      isLockedRef.current = false;
      setIsProcessing(false);
    }
  }, [isFocused]);

  const handleBack = () => {
    navigationService.navigation?.goBack();
  };

  const handleScanned = async (data) => {
    console.log("QR Code scanned:", data);
    // Handle the scanned data here
    // You can add your logic to process the QR code
    Alert.alert("QR Code Scanned", `Scanned data: ${data}`, [
      {
        text: "OK",
        onPress: () => navigationService.navigation?.goBack(),
      },
    ]);
  };

  if (!isReady) {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader
          title="Camera Scanner"
          center={false}
          onLeftButtonPress={handleBack}
        />
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.White} />
          <Text style={styles.loadingText}>
            Requesting camera permission...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <CustomHeader
        title="Camera Scanner"
        center={false}
        onLeftButtonPress={handleBack}
      />

      <View style={styles.cameraContainer}>
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
      <FloatingChatIcon />
    </SafeAreaView>
  );
};

export default CameraQRScanner;
