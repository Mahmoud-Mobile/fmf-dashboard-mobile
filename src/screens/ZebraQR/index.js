import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Platform, Text, TextInput, View, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import CustomHeader from "../../components/CustomHeader";
import navigationService from "../../Global/navRef";
import { styles } from "./Styles";
import { Colors } from "../../Global/colors";

const verifyQrCode = async ({ qr }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ valid: Math.random() > 0.3 });
    }, 1000);
  });
};

const ZebraQR = () => {
  const inputRef = useRef(null);
  const [buffer, setBuffer] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [scrollY] = useState(new Animated.Value(0));
  const debounceRef = useRef(null);
  const immediateSubmitRef = useRef(null);
  const lastFocusAtRef = useRef(0);
  const isFocused = useIsFocused();

  const handleSubmit = useCallback(
    async (forced) => {
      if (!isFocused) return;
      const data = (forced ?? buffer).trim();
      if (!data || isProcessing) return;
      setIsProcessing(true);
      try {
        console.log("verifyQrCode body:", { qr: data });
        const res = await verifyQrCode({ qr: data });
        const isValid = Boolean(res?.valid);

        // Show result alert
        Alert.alert(
          "QR Code Scanned",
          `Scanned data: ${data}\nStatus: ${isValid ? "Valid" : "Invalid"}`,
          [
            {
              text: "OK",
              onPress: () => navigationService.navigation?.goBack(),
            },
          ]
        );
      } catch (e) {
        console.error("Error verifying QR code:", e);
      } finally {
        setIsProcessing(false);
        setBuffer("");
        // re-focus for next scan
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    },
    [buffer, isProcessing, isFocused]
  );

  const onChangeText = useCallback(
    (text) => {
      if (!isFocused) return;
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

  // Ensure hidden input regains focus when screen becomes active
  useEffect(() => {
    if (isFocused) {
      lastFocusAtRef.current = Date.now();
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      // On blur: stop any pending submits and blur the hidden input
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
      if (immediateSubmitRef.current) {
        clearTimeout(immediateSubmitRef.current);
        immediateSubmitRef.current = null;
      }
      inputRef.current?.blur();
      setBuffer("");
    }
  }, [isFocused]);

  const handleBack = () => {
    navigationService.navigation?.goBack();
  };

  return (
    <View style={styles.container}>
      <CustomHeader leftLabel="Zebra Scanner" onLeftButtonPress={handleBack} />

      <View style={styles.body}>
        <View style={styles.scannerInfo}>
          <MaterialIcons
            name="qr-code-scanner"
            size={64}
            color={Colors.Primary}
          />
          <Text style={styles.infoTitle}>Zebra Scanner Ready</Text>
          <Text style={styles.infoText}>
            Use your Zebra scanner to scan QR codes. The scanner will
            automatically detect and process the codes.
          </Text>
          {isProcessing && (
            <View style={styles.processingContainer}>
              <Text style={styles.processingText}>Processing QR Code...</Text>
            </View>
          )}
        </View>

        {isFocused ? (
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
    </View>
  );
};

export default ZebraQR;
