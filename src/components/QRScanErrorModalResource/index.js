import React, {
  useCallback,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Colors } from "../../Global/colors";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";

const QRScanErrorModalResource = forwardRef(
  (
    {
      onTryAgain,
      errorMessage = "This QR code does not have access to this resource.",
      onManualRegister,
      showManualRegister = false,
    },
    ref
  ) => {
    const bottomSheetRef = useRef(null);
    const [timer, setTimer] = useState(3);
    const timerIntervalRef = useRef(null);
    const isOpenRef = useRef(false);

    const startTimer = useCallback(() => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      setTimer(3);
      timerIntervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            if (timerIntervalRef.current) {
              clearInterval(timerIntervalRef.current);
              timerIntervalRef.current = null;
            }
            setTimeout(() => {
              bottomSheetRef.current?.close();
            }, 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, []);

    const stopTimer = useCallback(() => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      setTimer(3);
    }, []);

    useImperativeHandle(ref, () => ({
      open: () => {
        if (bottomSheetRef.current) {
          try {
            setTimer(3);
            isOpenRef.current = true;
            bottomSheetRef.current.snapToIndex(0);
            // Start timer after modal opens
            setTimeout(() => {
              if (isOpenRef.current) {
                startTimer();
              }
            }, 100);
          } catch (error) {
            console.log("Error opening QR scan error modal (resource):", error);
          }
        }
      },
      close: () => {
        if (bottomSheetRef.current) {
          try {
            isOpenRef.current = false;
            stopTimer();
            bottomSheetRef.current.close();
          } catch (error) {
            console.log("Error closing QR scan error modal (resource):", error);
          }
        }
      },
    }));

    const handleSheetChanges = useCallback(
      (index) => {
        if (index === -1) {
          // Modal closed
          isOpenRef.current = false;
          stopTimer();
          if (onTryAgain) {
            onTryAgain();
          }
        }
      },
      [onTryAgain, stopTimer]
    );

    useEffect(() => {
      return () => {
        stopTimer();
      };
    }, [stopTimer]);

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
      isOpenRef.current = false;
      stopTimer();
      bottomSheetRef.current?.close();
      if (onTryAgain) {
        onTryAgain();
      }
    };

    const handleClose = () => {
      isOpenRef.current = false;
      stopTimer();
      bottomSheetRef.current?.close();
      // onTryAgain will be called via handleSheetChanges when modal closes
    };

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={["50%", "60%"]}
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
            {/* Timer Display */}
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>{timer}</Text>
            </View>

            {/* Error Message */}
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </View>

          <View style={styles.buttonsContainer}>
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

QRScanErrorModalResource.displayName = "QRScanErrorModalResource";

export default QRScanErrorModalResource;
