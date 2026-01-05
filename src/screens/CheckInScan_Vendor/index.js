import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import {
  useIsFocused,
  useRoute,
  useNavigation,
} from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../Global/colors";
import CustomHeader from "../../components/CustomHeader";
import { styles } from "./Styles";
import CheckInSuccessModal from "./components/CheckInSuccessModal";
import CheckInDeclineModal from "./components/CheckInDeclineModal";
import RecordPurchaseModal from "../../components/RecordPurchaseModal";

const ACTION_TYPES = {
  VISIT: "visit",
  PURCHASE: "purchase",
};

const CheckInScan_Vendor = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { actionType } = route.params || {};
  const [permission, requestPermission] = useCameraPermissions();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [manualCode, setManualCode] = useState("");
  const [selectedActionType, setSelectedActionType] = useState(
    actionType || ACTION_TYPES.VISIT
  );

  const isLockedRef = useRef(false);
  const checkInSuccessModalRef = useRef(null);
  const checkInDeclineModalRef = useRef(null);
  const recordPurchaseModalRef = useRef(null);

  const isReady = Boolean(permission?.granted);
  const isSubmitDisabled = !manualCode.trim() || isProcessing;

  const handleVisitAction = useCallback((qrCode) => {
    console.log("qr is scan", qrCode);
    isLockedRef.current = false;
  }, []);

  const handlePurchaseAction = useCallback(async (qrCode) => {
    setIsLoadingUserInfo(true);
    setErrorMessage(null);
    setUserInfo(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUserInfo({ participant: { name: "Test User" } });
      recordPurchaseModalRef.current?.open();
    } catch (error) {
      console.log("Purchase Error:", error);
      const errorData = error?.response?.data || error?.data || {};
      const errorMsg =
        errorData?.message ||
        error?.message ||
        errorData?.error ||
        "Failed to process purchase. Please try again.";
      setErrorMessage(errorMsg);
      checkInDeclineModalRef.current?.open();
    } finally {
      setIsLoadingUserInfo(false);
    }
  }, []);

  const handleScanned = useCallback(
    async (qrCode) => {
      console.log("QR Code scanned:", qrCode);

      if (selectedActionType === ACTION_TYPES.VISIT) {
        handleVisitAction(qrCode);
        return;
      }

      if (selectedActionType === ACTION_TYPES.PURCHASE) {
        await handlePurchaseAction(qrCode);
        return;
      }
    },
    [selectedActionType, handleVisitAction, handlePurchaseAction]
  );

  const handleScanAnother = useCallback(() => {
    isLockedRef.current = false;
    setUserInfo(null);
    setErrorMessage(null);
  }, []);

  const handleTryAgain = useCallback(() => {
    isLockedRef.current = false;
    setErrorMessage(null);
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
      if (selectedActionType === ACTION_TYPES.VISIT) {
        isLockedRef.current = false;
      }
    }
  }, [handleScanned, manualCode, selectedActionType]);

  const handleBarCodeScanned = useCallback(
    async ({ data }) => {
      if (isLockedRef.current || !data) return;

      isLockedRef.current = true;
      setIsProcessing(true);

      try {
        await handleScanned(String(data));
      } finally {
        setIsProcessing(false);
        if (selectedActionType === ACTION_TYPES.VISIT) {
          isLockedRef.current = false;
        }
      }
    },
    [handleScanned, selectedActionType]
  );

  const handleRecordPurchaseConfirm = useCallback(
    (purchaseData) => {
      recordPurchaseModalRef.current?.close();

      Alert.alert(
        "Success",
        "Purchase recorded successfully!",
        [
          {
            text: "OK",
            onPress: handleScanAnother,
          },
        ],
        { cancelable: false }
      );
    },
    [handleScanAnother]
  );

  const getVisitorName = () => {
    return userInfo?.participant?.name || userInfo?.name || "";
  };

  useEffect(() => {
    if (!permission) return;
    if (!permission.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

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
          onLeftButtonPress={() => navigation.goBack()}
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
        leftLabel="Camera Scanner"
        onLeftButtonPress={() => navigation.goBack()}
      />

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
            isSubmitDisabled && styles.submitButtonDisabled,
          ]}
          onPress={handleManualCodeSubmit}
          disabled={isSubmitDisabled}
          activeOpacity={0.7}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionTypeContainer}>
        <TouchableOpacity
          style={styles.actionTypeOption}
          onPress={() => setSelectedActionType(ACTION_TYPES.VISIT)}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.checkbox,
              selectedActionType === ACTION_TYPES.VISIT &&
                styles.checkboxChecked,
            ]}
          >
            {selectedActionType === ACTION_TYPES.VISIT && (
              <MaterialIcons name="check" size={18} color={Colors.White} />
            )}
          </View>
          <Text style={styles.actionTypeText}>Visit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionTypeOption}
          onPress={() => setSelectedActionType(ACTION_TYPES.PURCHASE)}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.checkbox,
              selectedActionType === ACTION_TYPES.PURCHASE &&
                styles.checkboxChecked,
            ]}
          >
            {selectedActionType === ACTION_TYPES.PURCHASE && (
              <MaterialIcons name="check" size={18} color={Colors.White} />
            )}
          </View>
          <Text style={styles.actionTypeText}>Transaction</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {isFocused && (
          <CameraView
            style={StyleSheet.absoluteFill}
            facing="back"
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            onBarcodeScanned={handleBarCodeScanned}
          />
        )}
        {isProcessing && (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.processingText}>Processing QR Code...</Text>
          </View>
        )}

        <View style={styles.scanArea}>
          <View style={styles.scanFrame} />
          <Text style={styles.scanText}>Position QR code within the frame</Text>
        </View>
      </View>

      <CheckInSuccessModal
        ref={checkInSuccessModalRef}
        visitorName={getVisitorName()}
        location={userInfo?.location}
        dateTime={new Date().toLocaleString()}
        onClose={handleScanAnother}
      />
      <CheckInDeclineModal
        ref={checkInDeclineModalRef}
        message={errorMessage}
        onClose={handleTryAgain}
      />
      <RecordPurchaseModal
        ref={recordPurchaseModalRef}
        productName=""
        originalPrice=""
        finalPrice=""
        discount=""
        onRecordPurchase={handleRecordPurchaseConfirm}
        onCancel={() => {
          recordPurchaseModalRef.current?.close();
          handleScanAnother();
        }}
      />
    </View>
  );
};

export default CheckInScan_Vendor;
