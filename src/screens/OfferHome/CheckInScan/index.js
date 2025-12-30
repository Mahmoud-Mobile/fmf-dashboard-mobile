import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import {
  useIsFocused,
  useRoute,
  useNavigation,
} from "@react-navigation/native";
import { Colors } from "../../../Global/colors";
import CustomHeader from "../../../components/CustomHeader";
import { styles } from "./Styles";
import OrgSuccessModal from "./components/OrgSuccessModal";
import CheckInSuccessModal from "./components/CheckInSuccessModal";
import CheckInDeclineModal from "./components/CheckInDeclineModal";

const dummyVisitorInfo = {
  name: "Ahmed Al-Mansour",
  email: "ahmed@gmail.com",
  mobile: "+971 50 123 4567",
  position: "His Position",
  visitorCode: "VIS-002",
  image: null,
};

const CheckInScan = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const roleConifg = "organizer";

  const [permission, requestPermission] = useCameraPermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [manualCode, setManualCode] = useState("");
  const isLockedRef = useRef(false);
  const isFocused = useIsFocused();
  const orgSuccessModalRef = useRef(null);
  const checkInSuccessModalRef = useRef(null);
  const checkInDeclineModalRef = useRef(null);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleScanned = useCallback(
    async (qrCode) => {
      console.log("qrCode", qrCode);
      setIsLoadingUserInfo(true);
      setErrorMessage(null);
      setUserInfo(null);
      setIsSuccess(false);

      try {
        if (roleConifg === "organizer") {
          setUserInfo(dummyVisitorInfo);
          setIsSuccess(true);
          orgSuccessModalRef.current?.open();
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const shouldSucceed = Math.random() > 0.3;

        if (shouldSucceed) {
          setUserInfo({ participant: { name: "Test User" } });
          setIsSuccess(true);
          checkInSuccessModalRef.current?.open();
        } else {
          setErrorMessage("Check-in declined. Visitor not approved.");
          setIsSuccess(false);
          checkInDeclineModalRef.current?.open();
        }
      } catch (error) {
        const errorMsg =
          error?.message || "Failed to check in. Please try again.";
        setErrorMessage(errorMsg);
        setUserInfo(null);
        setIsSuccess(false);
        checkInDeclineModalRef.current?.open();
      } finally {
        setIsLoadingUserInfo(false);
      }
    },
    [roleConifg]
  );

  const handleCompleteCheckIn = useCallback(async (companionsCount) => {
    console.log("Completing check-in with companions:", companionsCount);
    orgSuccessModalRef.current?.close();

    setTimeout(() => {
      checkInSuccessModalRef.current?.open();
    }, 300);
  }, []);

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

  const handleManualCodeSubmit = useCallback(async () => {
    if (isLockedRef.current || !manualCode.trim()) return;

    isLockedRef.current = true;
    setIsProcessing(true);

    try {
      await handleScanned(manualCode.trim());
      setManualCode("");
    } finally {
      setIsProcessing(false);
    }
  }, [handleScanned, manualCode]);

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

      <View style={styles.manualInputContainer}>
        <TextInput
          style={styles.manualInput}
          placeholder="Enter code manually"
          placeholderTextColor={Colors.SecondaryText}
          value={manualCode}
          onChangeText={setManualCode}
          onSubmitEditing={handleManualCodeSubmit}
          returnKeyType="done"
          editable={!isProcessing}
        />
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!manualCode.trim() || isProcessing) && styles.submitButtonDisabled,
          ]}
          onPress={handleManualCodeSubmit}
          disabled={!manualCode.trim() || isProcessing}
          activeOpacity={0.7}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

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

      {roleConifg === "organizer" ? (
        <>
          <OrgSuccessModal
            ref={orgSuccessModalRef}
            visitorInfo={userInfo || dummyVisitorInfo}
            onCompleteCheckIn={handleCompleteCheckIn}
            onClose={handleScanAnother}
          />
          <CheckInSuccessModal
            ref={checkInSuccessModalRef}
            visitorName={userInfo?.name || dummyVisitorInfo?.name}
            location={userInfo?.location}
            dateTime={new Date().toLocaleString()}
            onClose={handleScanAnother}
          />
          <CheckInDeclineModal
            ref={checkInDeclineModalRef}
            message={errorMessage}
            onClose={handleTryAgain}
          />
        </>
      ) : (
        <>
          <CheckInSuccessModal
            ref={checkInSuccessModalRef}
            visitorName={userInfo?.participant?.name}
            location={userInfo?.location}
            dateTime={new Date().toLocaleString()}
            onClose={handleScanAnother}
          />
          <CheckInDeclineModal
            ref={checkInDeclineModalRef}
            message={errorMessage}
            onClose={handleTryAgain}
          />
        </>
      )}
    </View>
  );
};

export default CheckInScan;
