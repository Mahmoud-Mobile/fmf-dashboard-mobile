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
import CustomHeader from "../../../components/CustomHeader";
import CustomPressable from "../../../components/CustomPressable";
import QRScanResultModalOfferHome from "../../../components/QRScanResultModalOfferHome";
import { styles } from "./Styles";
import { Colors } from "../../../Global/colors";
import { checkin_OfferHome } from "../../../webservice/apiConfig";

const ZebraQROfferHome = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const eventId = route.params?.eventId;
  const vendorId = route.params?.vendorId;
  const manualMode = route.params?.manualMode ?? false;

  const inputRef = useRef(null);
  const manualInputRef = useRef(null);
  const [buffer, setBuffer] = useState("");
  const [manualInput, setManualInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const debounceRef = useRef(null);
  const immediateSubmitRef = useRef(null);
  const lastFocusAtRef = useRef(0);
  const isLockedRef = useRef(false);
  const isFocused = useIsFocused();
  const modalRef = useRef(null);

  const handleScanned = useCallback(
    async (qrCode) => {
      setIsLoadingUserInfo(true);
      setErrorMessage(null);

      try {
        const payload = {
          vendorId: vendorId,
          mainevent: eventId,
        };
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
    setBuffer("");
    setManualInput("");
    setUserInfo(null);
    setErrorMessage(null);
    setIsSuccess(false);
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
    setIsSuccess(false);
    if (manualMode) {
      requestAnimationFrame(() => manualInputRef.current?.focus());
    } else {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [manualMode]);

  const handleSubmit = useCallback(
    async (forced) => {
      if (!isFocused) return;
      const data = (forced ?? (manualMode ? manualInput : buffer)).trim();
      if (!data || isProcessing || isLockedRef.current) return;

      isLockedRef.current = true;
      setIsProcessing(true);

      try {
        await handleScanned(data);
      } catch (e) {
        console.error("Error processing QR code:", e);
        isLockedRef.current = false;
      } finally {
        setIsProcessing(false);
        setBuffer("");
        setManualInput("");
      }
    },
    [buffer, manualInput, manualMode, isProcessing, isFocused, handleScanned]
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
                  ? "Enter the guest QR code manually in the field below to check in."
                  : "Use your Zebra scanner to scan QR codes for check in. The scanner will automatically detect and process the codes."}
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
                placeholder="Scan here"
              />
            ) : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

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

export default ZebraQROfferHome;
