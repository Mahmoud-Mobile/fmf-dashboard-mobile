import React, {
  useCallback,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Colors } from "../../Global/colors";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";
import { subEvent_ManualRegister } from "../../webservice/apiConfig";

const QRScanErrorModalSubEvent = forwardRef(
  (
    {
      onTryAgain,
      errorMessage = "This QR code does not have access to this sub-event.",
      onManualRegister,
      showManualRegister = false,
      eventId,
      subEventId,
      qrCode,
    },
    ref
  ) => {
    const bottomSheetRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => {
        if (bottomSheetRef.current) {
          try {
            bottomSheetRef.current.snapToIndex(0);
          } catch (error) {
            console.log("Error opening QR scan error modal (subevent):", error);
          }
        }
      },
      close: () => {
        if (bottomSheetRef.current) {
          try {
            bottomSheetRef.current.close();
          } catch (error) {
            console.log("Error closing QR scan error modal (subevent):", error);
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

    const handleManualRegister = useCallback(async () => {
      if (!eventId || !subEventId || !qrCode) {
        Alert.alert(
          "Error",
          "Missing required information for manual registration."
        );
        return;
      }

      Alert.alert(
        "Manual Register",
        "Are you sure you want to manually register this guest to the sub-event?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Confirm",
            onPress: async () => {
              setIsLoading(true);
              try {
                const payload = {
                  qrCode: qrCode,
                };
                await subEvent_ManualRegister(eventId, subEventId, payload);
                bottomSheetRef.current?.close();
                Alert.alert(
                  "Success",
                  "Guest has been successfully registered to the sub-event.",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        if (onManualRegister) {
                          onManualRegister();
                        }
                      },
                    },
                  ]
                );
              } catch (error) {
                const errorData = error?.response?.data || error?.data || {};
                const errorMsg =
                  errorData?.message ||
                  error?.message ||
                  errorData?.error ||
                  "Failed to register. Please try again.";
                Alert.alert("Registration Failed", errorMsg);
              } finally {
                setIsLoading(false);
              }
            },
          },
        ],
        { cancelable: true }
      );
    }, [eventId, subEventId, qrCode, onManualRegister]);

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

QRScanErrorModalSubEvent.displayName = "QRScanErrorModalSubEvent";

export default QRScanErrorModalSubEvent;
