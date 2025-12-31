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
import { Colors } from "../../../Global/colors";
import CustomHeader from "../../../components/CustomHeader";
import { styles } from "./Styles";
import SuccessWithAddCompanions from "./components/SuccessWithAddCompanions";
import CheckInSuccessModal from "./components/CheckInSuccessModal";
import CheckInDeclineModal from "./components/CheckInDeclineModal";
import RecordPurchaseModal from "../../../components/RecordPurchaseModal";
import { MaterialIcons } from "@expo/vector-icons";

const DUMMY_VISITOR_INFO = {
  name: "Ahmed Al-Mansour",
  email: "ahmed@gmail.com",
  mobile: "+971 50 123 4567",
  position: "His Position",
  visitorCode: "VIS-002",
  image: null,
};

const ROLE_CONFIG = "vendor";
const SOURCE_SCREENS = {
  SELECT_YOUR_AREA: "SelectYourArea",
  VENDOR_OFFER_HOME: "VendorOfferHome",
};

const CheckInScan = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { slectedVendor, actionType, sourceScreen } = route.params || {};

  // State management
  const [permission, requestPermission] = useCameraPermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [manualCode, setManualCode] = useState("");
  const [selectedActionType, setSelectedActionType] = useState(
    actionType || "visit"
  );

  // Refs
  const isLockedRef = useRef(false);
  const isFocused = useIsFocused();
  const successWithAddCompanionsRef = useRef(null);
  const checkInSuccessModalRef = useRef(null);
  const checkInDeclineModalRef = useRef(null);
  const recordPurchaseModalRef = useRef(null);

  // Log source screen
  useEffect(() => {
    if (sourceScreen) {
      console.log("CheckInScan: Navigated from screen:", sourceScreen);
    } else {
      console.log("CheckInScan: No source screen provided");
    }
  }, [sourceScreen]);

  // Navigation handlers
  const handleBack = () => {
    navigation.goBack();
  };

  // Scan handlers
  const handleScanned = useCallback(
    async (qrCode) => {
      console.log("QR Code scanned:", qrCode);
      setIsLoadingUserInfo(true);
      setErrorMessage(null);
      setUserInfo(null);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Determine which modal to show based on source screen and role
        const isFromSelectYourArea =
          sourceScreen === SOURCE_SCREENS.SELECT_YOUR_AREA;
        const isOrganizer = ROLE_CONFIG === "organizer";
        const isVendorOrAdmin =
          ROLE_CONFIG === "vendor" || ROLE_CONFIG === "admin";

        if (isFromSelectYourArea || isOrganizer) {
          // Show SuccessWithAddCompanions first for SelectYourArea or organizer role
          setUserInfo(DUMMY_VISITOR_INFO);
          successWithAddCompanionsRef.current?.open();
        } else if (isVendorOrAdmin) {
          // For vendor/admin from VendorOfferHome
          setUserInfo({ participant: { name: "Test User" } });
          if (selectedActionType === "purchase") {
            recordPurchaseModalRef.current?.open();
          } else {
            checkInSuccessModalRef.current?.open();
          }
        }
      } catch (error) {
        const errorMsg =
          error?.message || "Failed to check in. Please try again.";
        setErrorMessage(errorMsg);
        setUserInfo(null);
        checkInDeclineModalRef.current?.open();
      } finally {
        setIsLoadingUserInfo(false);
      }
    },
    [sourceScreen, selectedActionType]
  );

  // Modal handlers
  const handleCompleteCheckIn = useCallback(async (companionsCount) => {
    console.log("Completing check-in with companions:", companionsCount);
    successWithAddCompanionsRef.current?.close();

    setTimeout(() => {
      checkInSuccessModalRef.current?.open();
    }, 300);
  }, []);

  const handleScanAnother = useCallback(() => {
    isLockedRef.current = false;
    setUserInfo(null);
    setErrorMessage(null);
  }, []);

  const handleTryAgain = useCallback(() => {
    isLockedRef.current = false;
    setErrorMessage(null);
  }, []);

  // Input handlers
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

  // Permission handling
  useEffect(() => {
    if (!permission) return;
    if (!permission.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const isReady = Boolean(permission?.granted);

  // Reset processing state when screen loses focus
  useEffect(() => {
    if (!isFocused) {
      isLockedRef.current = false;
      setIsProcessing(false);
    }
  }, [isFocused]);

  // Purchase handler
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

  // Helper functions
  const shouldShowActionTypeSelector = () => {
    return (
      sourceScreen === SOURCE_SCREENS.VENDOR_OFFER_HOME &&
      (ROLE_CONFIG === "vendor" || ROLE_CONFIG === "admin")
    );
  };

  const shouldShowSuccessWithCompanionsModals = () => {
    // Show for SelectYourArea (any role) or organizer role
    return (
      sourceScreen === SOURCE_SCREENS.SELECT_YOUR_AREA ||
      ROLE_CONFIG === "organizer"
    );
  };

  const shouldShowVendorModals = () => {
    // Show for VendorOfferHome with vendor/admin role
    return (
      sourceScreen === SOURCE_SCREENS.VENDOR_OFFER_HOME &&
      (ROLE_CONFIG === "vendor" || ROLE_CONFIG === "admin")
    );
  };

  const getVisitorName = () => {
    if (
      sourceScreen === SOURCE_SCREENS.SELECT_YOUR_AREA ||
      ROLE_CONFIG === "organizer"
    ) {
      return userInfo?.name || DUMMY_VISITOR_INFO?.name;
    }
    return userInfo?.participant?.name;
  };

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

      {/* Action Type Selector - Only for VendorOfferHome */}
      {shouldShowActionTypeSelector() && (
        <View style={styles.actionTypeContainer}>
          <TouchableOpacity
            style={styles.actionTypeOption}
            onPress={() => setSelectedActionType("visit")}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.checkbox,
                selectedActionType === "visit" && styles.checkboxChecked,
              ]}
            >
              {selectedActionType === "visit" && (
                <MaterialIcons name="check" size={18} color={Colors.White} />
              )}
            </View>
            <Text style={styles.actionTypeText}>Visit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionTypeOption}
            onPress={() => setSelectedActionType("purchase")}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.checkbox,
                selectedActionType === "purchase" && styles.checkboxChecked,
              ]}
            >
              {selectedActionType === "purchase" && (
                <MaterialIcons name="check" size={18} color={Colors.White} />
              )}
            </View>
            <Text style={styles.actionTypeText}>Transaction</Text>
          </TouchableOpacity>
        </View>
      )}
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

      {/* Modals for SelectYourArea or Organizer - Show SuccessWithAddCompanions first */}
      {shouldShowSuccessWithCompanionsModals() && (
        <>
          <SuccessWithAddCompanions
            ref={successWithAddCompanionsRef}
            visitorInfo={userInfo || DUMMY_VISITOR_INFO}
            onCompleteCheckIn={handleCompleteCheckIn}
            onClose={handleScanAnother}
          />
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
        </>
      )}

      {/* Modals for VendorOfferHome - Show CheckInSuccessModal or RecordPurchaseModal */}
      {shouldShowVendorModals() && (
        <>
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
        </>
      )}
    </View>
  );
};

export default CheckInScan;
