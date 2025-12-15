import React, {
  useCallback,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { Colors } from "../../../Global/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../Styles";

const ManualRegisterModal = forwardRef(
  ({ qrCode, seatId, onRegister, onCancel }, ref) => {
    const bottomSheetRef = useRef(null);
    const textInputRef = useRef(null);
    const [notes, setNotes] = useState("");

    useImperativeHandle(ref, () => ({
      open: () => {
        if (bottomSheetRef.current) {
          try {
            bottomSheetRef.current.snapToIndex(0);
            setNotes("");
          } catch (error) {
            console.log("Error opening manual register modal:", error);
          }
        }
      },
      close: () => {
        if (bottomSheetRef.current) {
          try {
            bottomSheetRef.current.close();
            setNotes("");
          } catch (error) {
            console.log("Error closing manual register modal:", error);
          }
        }
      },
    }));

    const handleSheetChanges = useCallback((index) => {
      if (index === -1) {
        setNotes("");
      }
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

    const handleClose = () => {
      bottomSheetRef.current?.close();
      Keyboard.dismiss();
      if (onCancel) {
        onCancel();
      }
    };

    const handleRegister = () => {
      if (onRegister) {
        onRegister(notes.trim() || "Walk-in registration at door");
      }
      bottomSheetRef.current?.close();
    };

    const handleTextInputFocus = () => {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.snapToIndex(2);
      }
    };

    const handleTextInputBlur = () => {
      // Optionally collapse back to middle snap point when TextInput loses focus
      // You can remove this if you want it to stay expanded
    };

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={["80%", "95%"]}
        enablePanDownToClose={false}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
      >
        <BottomSheetView style={styles.modalContentContainer}>
          <View style={styles.modalHeaderContainer}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={handleClose}
              activeOpacity={0.6}
            >
              <MaterialIcons
                name="close"
                size={18}
                color={Colors.PrimaryText}
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Manual Register to Sub-Event</Text>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ScrollView
              style={styles.modalScrollView}
              contentContainerStyle={styles.modalScrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.modalInfoContainer}>
                <View style={styles.modalInfoRow}>
                  <Text style={styles.modalLabel}>QR Code:</Text>
                  <Text style={styles.modalValue}>{qrCode || "N/A"}</Text>
                </View>
                <View style={styles.modalInfoRow}>
                  <Text style={styles.modalLabel}>Seat ID:</Text>
                  <Text style={styles.modalValue}>{seatId || "N/A"}</Text>
                </View>
              </View>

              <View style={styles.modalNotesContainer}>
                <Text style={styles.modalLabel}>Notes:</Text>
                <BottomSheetTextInput
                  ref={textInputRef}
                  style={styles.modalNotesInput}
                  value={notes}
                  onChangeText={setNotes}
                  onFocus={handleTextInputFocus}
                  onBlur={handleTextInputBlur}
                  placeholder="Enter notes (optional)"
                  placeholderTextColor={Colors.SecondaryText}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>

          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalCancelButton]}
              onPress={handleClose}
              activeOpacity={0.7}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalRegisterButton]}
              onPress={handleRegister}
              activeOpacity={0.7}
            >
              <MaterialIcons
                name="check-circle"
                size={18}
                color={Colors.White}
              />
              <Text style={styles.modalButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

ManualRegisterModal.displayName = "ManualRegisterModal";

export default ManualRegisterModal;
