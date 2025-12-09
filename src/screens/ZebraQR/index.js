import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Platform,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import CustomHeader from "../../components/CustomHeader";
import CustomPressable from "../../components/CustomPressable";
import QRScanResultModal from "../../components/QRScanResultModal";
import QRScanErrorModal from "../../components/QRScanErrorModal";
import { styles } from "./Styles";
import { Colors } from "../../Global/colors";
import { subEvent_Checkin, resource_Checkin } from "../../webservice/apiConfig";

const ZebraQR = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const eventId = route.params?.eventId;
  const subEventId = route.params?.subEventId;
  const resourceId = route.params?.resourceId;
  const scanLocation = route.params?.scanLocation;
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
  const debounceRef = useRef(null);
  const immediateSubmitRef = useRef(null);
  const lastFocusAtRef = useRef(0);
  const isLockedRef = useRef(false);
  const isFocused = useIsFocused();
  const successModalRef = useRef(null);
  const errorModalRef = useRef(null);

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
        const response = await subEvent_Checkin(eventId, subEventId, payload);
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
        const response = await resource_Checkin(eventId, resourceId, payload);
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
    [eventId, resourceId, scanLocation]
  );

  const handleScanAnother = useCallback(() => {
    isLockedRef.current = false;
    setBuffer("");
    setManualInput("");
    setUserInfo(null);
    setScannedData(null);
    setErrorMessage(null);
    if (manualMode) {
      requestAnimationFrame(() => manualInputRef.current?.focus());
    } else {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [manualMode]);

  const handleTryAgain = useCallback(() => {
    isLockedRef.current = false;
    setErrorMessage(null);
    setBuffer("");
    setManualInput("");
    if (manualMode) {
      requestAnimationFrame(() => manualInputRef.current?.focus());
    } else {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [manualMode]);

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

  const handleSubmit = useCallback(
    async (forced) => {
      if (!isFocused) return;
      const data = (forced ?? (manualMode ? manualInput : buffer)).trim();
      if (!data || isProcessing || isLockedRef.current) return;

      isLockedRef.current = true;
      setIsProcessing(true);

      try {
        if (subEventId) {
          await handleScanned_subEvent(data);
        } else if (resourceId) {
          await handleScanned_Resource(data);
        }
      } catch (e) {
        console.error("Error processing QR code:", e);
        isLockedRef.current = false;
      } finally {
        setIsProcessing(false);
        setBuffer("");
        setManualInput("");
      }
    },
    [
      buffer,
      manualInput,
      manualMode,
      isProcessing,
      isFocused,
      subEventId,
      resourceId,
      handleScanned_subEvent,
      handleScanned_Resource,
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
    navigation.goBack();
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
