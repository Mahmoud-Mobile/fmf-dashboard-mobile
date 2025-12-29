import React, {
  useCallback,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Colors } from "../../Global/colors";
import { MaterialIcons } from "@expo/vector-icons";
import DigitalIdCard from "../DigitalIdCard";
import styles from "./Styles";

const QRScanResultModalResource = forwardRef(
  ({ onScanAnother, userInfo, isLoading = false }, ref) => {
    console.log("userInfo", userInfo);
    const bottomSheetRef = useRef(null);
    const [timer, setTimer] = useState(4);
    const timerIntervalRef = useRef(null);
    const isOpenRef = useRef(false);

    const startTimer = useCallback(() => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      setTimer(4);
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
      setTimer(4);
    }, []);

    useImperativeHandle(ref, () => ({
      open: () => {
        if (bottomSheetRef.current) {
          try {
            setTimer(4);
            isOpenRef.current = true;
            bottomSheetRef.current.snapToIndex(0);
            // Start timer after modal opens
            setTimeout(() => {
              if (isOpenRef.current) {
                startTimer();
              }
            }, 100);
          } catch (error) {
            console.log(
              "Error opening QR scan result modal (resource):",
              error
            );
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
            console.log(
              "Error closing QR scan result modal (resource):",
              error
            );
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
          if (onScanAnother) {
            onScanAnother();
          }
        }
      },
      [onScanAnother, stopTimer]
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

    const handleScanAnother = () => {
      isOpenRef.current = false;
      stopTimer();
      bottomSheetRef.current?.close();
      if (onScanAnother) {
        onScanAnother();
      }
    };

    const handleClose = () => {
      isOpenRef.current = false;
      stopTimer();
      bottomSheetRef.current?.close();
      // onScanAnother will be called via handleSheetChanges when modal closes
    };

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={["75%", "90%"]}
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
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.Primary} />
              <Text style={styles.loadingText}>
                Loading user information...
              </Text>
            </View>
          ) : (
            <View style={styles.userInfoContainer}>
              {userInfo?.participant && (
                <DigitalIdCard
                  id={userInfo?.participant?.id}
                  name={
                    userInfo?.participant?.firstName &&
                    userInfo?.participant?.lastName
                      ? `${userInfo.participant.firstName} ${userInfo.participant.lastName}`
                      : userInfo?.participant?.name || "-"
                  }
                  image={
                    userInfo?.participant?.profilePicture ||
                    userInfo?.participant?.image
                  }
                  participantType={
                    typeof userInfo?.participant?.participantType === "object"
                      ? userInfo?.participant?.participantType?.name
                      : userInfo?.participant?.participantType
                  }
                  position={userInfo?.participant?.position || "-"}
                  nationality={
                    typeof userInfo?.participant?.nationality === "object"
                      ? userInfo?.participant?.nationality?.name
                      : userInfo?.participant?.nationality || "-"
                  }
                  color={
                    userInfo?.participant?.participantType?.color ||
                    Colors.Primary
                  }
                />
              )}

              {userInfo?.message && (
                <Text style={styles.messageText}>{userInfo.message}</Text>
              )}

              {userInfo?.checkInCount !== undefined && (
                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Check-ins:</Text>
                    <Text style={styles.infoValue}>
                      {userInfo.checkInCount}
                    </Text>
                  </View>
                  {userInfo?.resource && (
                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>Location:</Text>
                      <Text style={styles.infoValue} numberOfLines={1}>
                        {userInfo.resource.location || userInfo.resource.name}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          )}

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.scanAnotherButton]}
              onPress={handleScanAnother}
              activeOpacity={0.7}
            >
              <MaterialIcons
                name="qr-code-scanner"
                size={18}
                color={Colors.White}
              />
              <Text style={styles.buttonText}>Scan Another</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{timer}</Text>
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

QRScanResultModalResource.displayName = "QRScanResultModalResource";

export default QRScanResultModalResource;
