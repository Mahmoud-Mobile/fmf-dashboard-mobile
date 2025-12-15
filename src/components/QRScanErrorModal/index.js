import React, {
  useCallback,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Colors } from "../../Global/colors";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";

const QRScanErrorModal = forwardRef(
  (
    {
      onTryAgain,
      errorMessage = "This QR code does not have access to this event.",
      onManualRegister,
      showManualRegister = false,
    },
    ref
  ) => {
    const bottomSheetRef = useRef(null);

    useImperativeHandle(ref, () => ({
      open: () => {
        if (bottomSheetRef.current) {
          try {
            bottomSheetRef.current.snapToIndex(0);
          } catch (error) {
            console.log("Error opening QR scan error modal:", error);
          }
        }
      },
      close: () => {
        if (bottomSheetRef.current) {
          try {
            bottomSheetRef.current.close();
          } catch (error) {
            console.log("Error closing QR scan error modal:", error);
          }
        }
      },
    }));

    const handleSheetChanges = useCallback(
      (index) => {
        if (index === -1 && onTryAgain) {
          // Modal closed, reset scanner to allow another scan
          onTryAgain();
        }
      },
      [onTryAgain]
    );

    const renderBackdrop = useCallback(
      (props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
          pressBehavior="none"
        />
      ),
      []
    );

    const handleTryAgain = () => {
      bottomSheetRef.current?.close();
      if (onTryAgain) {
        onTryAgain();
      }
    };

    const handleClose = () => {
      bottomSheetRef.current?.close();
      // onTryAgain will be called via handleSheetChanges when modal closes
    };

    const handleManualRegister = () => {
      bottomSheetRef.current?.close();
      if (onManualRegister) {
        onManualRegister();
      }
    };

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={["55%", "60%"]}
        enablePanDownToClose={false}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
              activeOpacity={0.6}
            >
              <MaterialIcons
                name="close"
                size={18}
                color={Colors.PrimaryText}
              />
            </TouchableOpacity>
            <View style={styles.errorHeaderContainer}>
              <MaterialIcons
                name="error-outline"
                size={32}
                color={Colors.Error}
              />
              <Text style={styles.errorTitle}>Access Denied</Text>
            </View>
          </View>

          <View style={styles.errorContainer}>
            <View style={styles.errorIconContainer}>
              <MaterialIcons name="block" size={48} color={Colors.Error} />
            </View>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </View>

          <View style={styles.buttonsContainer}>
            {showManualRegister && onManualRegister && (
              <TouchableOpacity
                style={[styles.button, styles.manualRegisterButton]}
                onPress={handleManualRegister}
                activeOpacity={0.7}
              >
                <MaterialIcons
                  name="event-seat"
                  size={18}
                  color={Colors.White}
                />
                <Text style={styles.buttonText}>
                  Manual Register to Sub-Event
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.button, styles.tryAgainButton]}
              onPress={handleTryAgain}
              activeOpacity={0.7}
            >
              <MaterialIcons
                name="qr-code-scanner"
                size={18}
                color={Colors.White}
              />
              <Text style={styles.buttonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

QRScanErrorModal.displayName = "QRScanErrorModal";

export default QRScanErrorModal;
