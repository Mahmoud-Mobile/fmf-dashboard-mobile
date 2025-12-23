import React, {
  useCallback,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Colors } from "../../Global/colors";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";

const QRScanResultModalSubEvent = forwardRef(
  (
    { onScanAnother, onShowSeats, onShowProfile, userInfo, isLoading = false },
    ref
  ) => {
    const bottomSheetRef = useRef(null);

    useImperativeHandle(ref, () => ({
      open: () => {
        if (bottomSheetRef.current) {
          try {
            bottomSheetRef.current.snapToIndex(0);
          } catch (error) {
            console.log(
              "Error opening QR scan result modal (subevent):",
              error
            );
          }
        }
      },
      close: () => {
        if (bottomSheetRef.current) {
          try {
            bottomSheetRef.current.close();
          } catch (error) {
            console.log(
              "Error closing QR scan result modal (subevent):",
              error
            );
          }
        }
      },
    }));

    const handleSheetChanges = useCallback(
      (index) => {
        if (index === -1 && onScanAnother) {
          // Modal closed, reset scanner to allow another scan
          onScanAnother();
        }
      },
      [onScanAnother]
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

    const handleScanAnother = () => {
      bottomSheetRef.current?.close();
      if (onScanAnother) {
        onScanAnother();
      }
    };

    const handleShowSeats = () => {
      bottomSheetRef.current?.close();
      if (onShowSeats) {
        onShowSeats(userInfo);
      }
    };

    const handleShowProfile = () => {
      bottomSheetRef.current?.close();
      if (onShowProfile) {
        onShowProfile(userInfo);
      }
    };

    const handleClose = () => {
      bottomSheetRef.current?.close();
      // onScanAnother will be called via handleSheetChanges when modal closes
    };

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={
          userInfo?.participant?.name ? ["60%", "70%"] : ["40%", "60%", "70%"]
        }
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
            <View style={styles.successContainer}>
              <MaterialIcons
                name="check-circle"
                size={32}
                color={Colors.Success}
              />
              <Text style={styles.successTitle}>Scan Successful</Text>
            </View>
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
              {userInfo?.participant?.name && (
                <>
                  {userInfo?.participant?.image ? (
                    <Image
                      source={{ uri: userInfo.participant.image }}
                      style={styles.userImage}
                    />
                  ) : (
                    <View style={styles.userImagePlaceholder}>
                      <MaterialIcons
                        name="person"
                        size={32}
                        color={Colors.gray}
                      />
                    </View>
                  )}
                </>
              )}

              {userInfo?.participant?.name && (
                <Text style={styles.userName}>
                  {userInfo?.participant?.name}
                </Text>
              )}

              {userInfo?.participant?.participantType && (
                <View style={styles.participantTypeBadge}>
                  <Text style={styles.participantTypeText}>
                    {userInfo.participant.participantType}
                  </Text>
                </View>
              )}

              {userInfo?.message && (
                <Text style={styles.messageText}>{userInfo.message}</Text>
              )}
              {userInfo?.participant?.name && (
                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <MaterialIcons
                      name="check-circle"
                      size={16}
                      color={Colors.Success}
                    />
                    <Text style={styles.infoLabel}>Check-ins:</Text>
                    <Text style={styles.infoValue}>
                      {userInfo?.checkInCount ?? 0}
                    </Text>
                  </View>
                  {userInfo?.isFirstEntry !== undefined && (
                    <View style={styles.infoItem}>
                      <MaterialIcons
                        name={userInfo.isFirstEntry ? "new-releases" : "repeat"}
                        size={16}
                        color={
                          userInfo.isFirstEntry ? Colors.Primary : Colors.gray
                        }
                      />
                      <Text style={styles.infoLabel}>
                        {userInfo.isFirstEntry ? "First Entry" : "Re-entry"}
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
            {userInfo?.participant?.name && (
              <>
                <TouchableOpacity
                  style={[styles.button, styles.showSeatsButton]}
                  onPress={handleShowSeats}
                  activeOpacity={0.7}
                >
                  <MaterialIcons
                    name="event-seat"
                    size={18}
                    color={Colors.White}
                  />
                  <Text style={styles.buttonText}>Show Seats</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.showProfileButton]}
                  onPress={handleShowProfile}
                  activeOpacity={0.7}
                >
                  <MaterialIcons name="person" size={18} color={Colors.White} />
                  <Text style={styles.buttonText}>Show Profile</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

QRScanResultModalSubEvent.displayName = "QRScanResultModalSubEvent";

export default QRScanResultModalSubEvent;
