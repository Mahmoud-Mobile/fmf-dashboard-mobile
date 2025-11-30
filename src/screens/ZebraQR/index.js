import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Platform,
  Text,
  TextInput,
  View,
  Animated,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused, useRoute } from "@react-navigation/native";
import CustomHeader from "../../components/CustomHeader";
import CustomPressable from "../../components/CustomPressable";
import navigationService from "../../Global/navRef";
import QRScanResultModal from "../../components/QRScanResultModal";
import QRScanErrorModal from "../../components/QRScanErrorModal";
import { styles } from "./Styles";
import { Colors } from "../../Global/colors";

const verifyQrCode = async ({ qr }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ valid: Math.random() > 0.3 });
    }, 1000);
  });
};

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
        image: null, // You can add image URL here if available
      });
    }, 1000);
  });
};

const ZebraQR = () => {
  const route = useRoute();
  const eventId = route.params?.eventId;
  const manualMode = route.params?.manualMode ?? false;
  const inputRef = useRef(null);
  const manualInputRef = useRef(null);
  const [buffer, setBuffer] = useState("");
  const [manualInput, setManualInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [scrollY] = useState(new Animated.Value(0));
  const debounceRef = useRef(null);
  const immediateSubmitRef = useRef(null);
  const lastFocusAtRef = useRef(0);
  const isLockedRef = useRef(false);
  const isFocused = useIsFocused();
  const successModalRef = useRef(null);
  const errorModalRef = useRef(null);

  const handleScanned = useCallback(async (data) => {
    console.log("QR Code scanned:", data);
    setScannedData(data);
    setIsLoadingUserInfo(true);
    setErrorMessage(null);

    try {
      // Fetch user info from QR code
      const info = await fetchUserInfoFromQR(data);
      setUserInfo(info);
      // Open success modal
      successModalRef.current?.open();
    } catch (error) {
      console.error("Error fetching user info:", error);
      // Still show modal with basic info
      setUserInfo({ name: "User", email: null, mobile: null, address: null });
      successModalRef.current?.open();
    } finally {
      setIsLoadingUserInfo(false);
    }
  }, []);

  const handleScanAnother = useCallback(() => {
    // Reset lock to allow another scan
    isLockedRef.current = false;
    setBuffer("");
    setManualInput("");
    setUserInfo(null);
    setScannedData(null);
    setErrorMessage(null);
    // Re-focus for next scan
    if (manualMode) {
      requestAnimationFrame(() => manualInputRef.current?.focus());
    } else {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [manualMode]);

  const handleTryAgain = useCallback(() => {
    // Reset lock to allow another scan after error
    isLockedRef.current = false;
    setErrorMessage(null);
    setBuffer("");
    setManualInput("");
    // Re-focus for next scan
    if (manualMode) {
      requestAnimationFrame(() => manualInputRef.current?.focus());
    } else {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [manualMode]);

  const handleShowSeats = useCallback(() => {
    // Navigate to ShowSeats screen
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

  const handleSubmit = useCallback(
    async (forced) => {
      if (!isFocused) return;
      const data = (forced ?? (manualMode ? manualInput : buffer)).trim();
      if (!data || isProcessing || isLockedRef.current) return;

      isLockedRef.current = true;
      setIsProcessing(true);

      try {
        // Check if event ID is "1" - if so, deny access
        if (eventId === "1") {
          setErrorMessage("This QR code does not have access to this event.");
          setUserInfo(null);
          setScannedData(null);
          setIsProcessing(false);
          // Open error modal
          errorModalRef.current?.open();
          return;
        }

        console.log("verifyQrCode body:", { qr: data });
        const res = await verifyQrCode({ qr: data });
        const isValid = Boolean(res?.valid);

        // Show success modal with options
        await handleScanned(data);
      } catch (e) {
        console.error("Error verifying QR code:", e);
        // On error, reset lock
        isLockedRef.current = false;
      } finally {
        setIsProcessing(false);
        setBuffer("");
        setManualInput("");
        // Don't auto-refocus - wait for user choice in modal
      }
    },
    [
      buffer,
      manualInput,
      manualMode,
      isProcessing,
      isFocused,
      handleScanned,
      eventId,
    ]
  );

  const onChangeText = useCallback(
    (text) => {
      if (!isFocused || isLockedRef.current) return;
      // Ignore any keystrokes that arrive immediately after regaining focus.
      // Many hardware scanners buffer keystrokes during navigation and flush them on focus.
      if (Date.now() - lastFocusAtRef.current < 150) {
        return;
      }
      // Zebra scanners often send a terminating newline / enter
      if (text.endsWith("\n") || text.endsWith("\r")) {
        setBuffer(text.replace(/[\n\r]+$/g, ""));
        // Defer submit until state updates
        if (immediateSubmitRef.current)
          clearTimeout(immediateSubmitRef.current);
        immediateSubmitRef.current = setTimeout(() => handleSubmit(), 0);
        return;
      }
      // No newline: treat as keyboard wedge stream. Debounce a quick submit.
      setBuffer(text);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        // Auto-submit the current text after brief pause
        handleSubmit(text);
      }, 200);
    },
    [handleSubmit, isFocused]
  );

  // Ensure hidden input regains focus when screen becomes active (only for Zebra scanner mode)
  useEffect(() => {
    if (isFocused && !manualMode) {
      lastFocusAtRef.current = Date.now();
      // Only focus if not locked (waiting for user choice)
      if (!isLockedRef.current) {
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    } else if (!isFocused) {
      // On blur: stop any pending submits and blur the input
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
      if (immediateSubmitRef.current) {
        clearTimeout(immediateSubmitRef.current);
        immediateSubmitRef.current = null;
      }
      inputRef.current?.blur();
      manualInputRef.current?.blur();
      setBuffer("");
      setManualInput("");
      isLockedRef.current = false;
    } else if (isFocused && manualMode) {
      // Focus manual input when in manual mode
      if (!isLockedRef.current) {
        requestAnimationFrame(() => manualInputRef.current?.focus());
      }
    }
  }, [isFocused, manualMode]);

  const handleBack = () => {
    navigationService.navigation?.goBack();
  };

  const handleManualInputChange = useCallback((text) => {
    setManualInput(text);
  }, []);

  const handleManualSubmit = useCallback(() => {
    handleSubmit(manualInput);
  }, [manualInput, handleSubmit]);

  return (
    <View style={styles.container}>
      <CustomHeader
        leftLabel={manualMode ? "Manual Entry" : "Zebra Scanner"}
        onLeftButtonPress={handleBack}
      />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.body}>
            <View style={styles.scannerInfo}>
              <MaterialIcons
                name={manualMode ? "keyboard" : "qr-code-scanner"}
                size={64}
                color={Colors.Primary}
              />
              <Text style={styles.infoTitle}>
                {manualMode ? "Manual Entry" : "Zebra Scanner Ready"}
              </Text>
              <Text style={styles.infoText}>
                {manualMode
                  ? "Enter the guest QR code manually in the field below."
                  : "Use your Zebra scanner to scan QR codes. The scanner will automatically detect and process the codes."}
              </Text>
              {isProcessing && (
                <View style={styles.processingContainer}>
                  <Text style={styles.processingText}>
                    Processing QR Code...
                  </Text>
                </View>
              )}
            </View>

            {manualMode ? (
              <View style={styles.manualInputContainer}>
                <TextInput
                  ref={manualInputRef}
                  value={manualInput}
                  onChangeText={handleManualInputChange}
                  onSubmitEditing={handleManualSubmit}
                  autoFocus
                  style={styles.manualInput}
                  editable={!isProcessing}
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder="Enter QR code here"
                  placeholderTextColor="#828282"
                  returnKeyType="done"
                />
                <CustomPressable
                  title="Submit"
                  onPress={handleManualSubmit}
                  disabled={!manualInput.trim() || isProcessing}
                  isLoading={isProcessing}
                  style={styles.submitButton}
                />
              </View>
            ) : isFocused ? (
              <TextInput
                ref={inputRef}
                value={buffer}
                onChangeText={onChangeText}
                onSubmitEditing={() => handleSubmit()}
                autoFocus
                style={styles.hiddenInput}
                editable
                autoCorrect={false}
                autoCapitalize="none"
                {...(Platform.OS === "android"
                  ? { showSoftInputOnFocus: false }
                  : {})}
                caretHidden
                contextMenuHidden
                placeholder={Platform.select({
                  ios: "Scan here",
                  android: "Scan here",
                })}
              />
            ) : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

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

export default ZebraQR;
