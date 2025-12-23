import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Colors } from "../Global/colors";
import { Fonts } from "../Global/fonts";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";

const DateSearchModal = ({
  visible,
  onClose,
  onDateSelect,
  selectedDate,
  title = "Select Date",
  placeholder = "Choose a date to filter",
}) => {
  const [tempDate, setTempDate] = useState(
    selectedDate ? new Date(selectedDate) : new Date()
  );
  const [showAndroidPicker, setShowAndroidPicker] = useState(false);

  // Reset temp date when modal opens
  useEffect(() => {
    if (visible) {
      setTempDate(selectedDate ? new Date(selectedDate) : new Date());
      if (Platform.OS === "android") {
        setShowAndroidPicker(true);
      }
    }
  }, [visible, selectedDate]);

  const handleDateChange = (event, date) => {
    if (Platform.OS === "android") {
      setShowAndroidPicker(false);
      if (event.type === "set" && date) {
        onDateSelect(date);
      }
      onClose();
    } else {
      if (date) {
        setTempDate(date);
      }
    }
  };

  const handleConfirm = () => {
    onDateSelect(tempDate);
    onClose();
  };

  const handleClear = () => {
    onDateSelect(null);
    onClose();
  };

  const formatDate = (date) => {
    if (!date) return "No date selected";
    return moment(date).format("MMM DD, YYYY");
  };

  // Android: Show native picker directly (no modal wrapper)
  if (Platform.OS === "android") {
    return showAndroidPicker ? (
      <DateTimePicker
        value={tempDate}
        mode="date"
        display="default"
        onChange={handleDateChange}
      />
    ) : null;
  }

  // iOS: Show compact modal
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <SafeAreaView style={styles.modalContent}>
            <View style={styles.header}>
              <View style={styles.headerDateContainer}>
                <MaterialIcons
                  name="calendar-today"
                  size={18}
                  color={Colors.Primary}
                  style={styles.headerIcon}
                />
                <Text style={styles.headerDateText}>
                  {formatDate(tempDate)}
                </Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <MaterialIcons name="close" size={22} color={Colors.Gray} />
              </TouchableOpacity>
            </View>

            <View style={styles.content}>
              <View style={styles.datePickerContainer}>
                <DateTimePicker
                  value={tempDate}
                  mode="date"
                  display="inline"
                  onChange={handleDateChange}
                  style={styles.datePicker}
                  textColor={Colors.Primary}
                />
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.button, styles.clearButton]}
                  onPress={handleClear}
                  activeOpacity={0.7}
                >
                  <MaterialIcons name="clear" size={18} color={Colors.Gray} />
                  <Text style={styles.clearButtonText}>Clear</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.confirmButton]}
                  onPress={handleConfirm}
                  activeOpacity={0.8}
                >
                  <Text style={styles.confirmButtonText}>Apply</Text>
                  <MaterialIcons name="check" size={18} color={Colors.White} />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: Colors.White,
    borderRadius: 24,
    width: "90%",
    maxWidth: 400,
    maxHeight: "85%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.15,
        shadowRadius: 24,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  modalContent: {
    paddingVertical: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerIcon: {
    marginRight: 8,
  },
  headerDateText: {
    fontSize: 18,
    fontFamily: Fonts.FONT_SEMI_BOLD,
    color: Colors.Primary,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  datePickerContainer: {
    alignItems: "center",
    marginBottom: 24,
    overflow: "hidden",
  },
  datePicker: {
    width: "100%",
    height: 350,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  clearButton: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
  },
  clearButtonText: {
    fontSize: 15,
    fontFamily: Fonts.FONT_SEMI_BOLD,
    color: Colors.Gray,
  },
  confirmButton: {
    backgroundColor: Colors.Primary,
    ...Platform.select({
      ios: {
        shadowColor: Colors.Primary,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  confirmButtonText: {
    fontSize: 15,
    fontFamily: Fonts.FONT_SEMI_BOLD,
    color: Colors.White,
  },
});

export default DateSearchModal;
