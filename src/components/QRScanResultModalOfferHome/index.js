import React, {
  useCallback,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Colors } from "../../Global/colors";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";

const QRScanResultModalOfferHome = forwardRef(
  (
    {
      isSuccess = false,
      userInfo = null,
      errorMessage = null,
      onScanAnother,
      onTryAgain,
      isLoading = false,
    },
    ref
  ) => {
    const bottomSheetRef = useRef(null);
    const isOpenRef = useRef(false);

    useImperativeHandle(ref, () => ({
      open: () => {
        if (bottomSheetRef.current) {
          try {
            isOpenRef.current = true;
            bottomSheetRef.current.snapToIndex(0);
          } catch (error) {
            console.log("Error opening QR scan result modal:", error);
          }
        }
      },
      close: () => {
        if (bottomSheetRef.current) {
          try {
            isOpenRef.current = false;
            bottomSheetRef.current.close();
          } catch (error) {
            console.log("Error closing QR scan result modal:", error);
          }
        }
      },
    }));

    const handleSheetChanges = useCallback(
      (index) => {
        if (index === -1) {
          isOpenRef.current = false;
          if (isSuccess && onScanAnother) {
            onScanAnother();
          } else if (!isSuccess && onTryAgain) {
            onTryAgain();
          }
        }
      },
      [isSuccess, onScanAnother, onTryAgain]
    );

    useEffect(() => {
      return () => {
        // Cleanup: close bottom sheet if component unmounts
        if (bottomSheetRef.current) {
          try {
            bottomSheetRef.current.close();
          } catch (error) {
            console.log("Error during cleanup:", error);
          }
        }
        isOpenRef.current = false;
      };
    }, []);

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

    const handleAction = () => {
      isOpenRef.current = false;
      bottomSheetRef.current?.close();
      if (isSuccess && onScanAnother) {
        onScanAnother();
      } else if (!isSuccess && onTryAgain) {
        onTryAgain();
      }
    };

    const handleClose = () => {
      isOpenRef.current = false;
      bottomSheetRef.current?.close();
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
            {isSuccess ? (
              <View style={styles.successContainer}>
                <MaterialIcons
                  name="check-circle"
                  size={64}
                  color={Colors.Success}
                />
              </View>
            ) : (
              <View style={styles.errorContainer}>
                <MaterialIcons name="cancel" size={64} color={Colors.Error} />
              </View>
            )}
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.Primary} />
              <Text style={styles.loadingText}>Loading information...</Text>
            </View>
          ) : isSuccess ? (
            <View style={styles.userInfoContainer}>
              {userInfo?.participant?.name && (
                <Text style={styles.userName}>{userInfo.participant.name}</Text>
              )}

              {userInfo?.participant?.email && (
                <Text style={styles.userEmail}>
                  {userInfo.participant.email}
                </Text>
              )}
            </View>
          ) : (
            <View style={styles.errorMessageContainer}>
              <Text style={styles.errorMessage}>
                {errorMessage || "An error occurred. Please try again."}
              </Text>
            </View>
          )}

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                isSuccess ? styles.scanAnotherButton : styles.tryAgainButton,
              ]}
              onPress={handleAction}
              activeOpacity={0.7}
            >
              <MaterialIcons
                name="qr-code-scanner"
                size={18}
                color={Colors.White}
              />
              <Text style={styles.buttonText}>
                {isSuccess ? "Scan Another" : "Try Again"}
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

QRScanResultModalOfferHome.displayName = "QRScanResultModalOfferHome";

export default QRScanResultModalOfferHome;
