import React, { useState } from "react";
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

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setTempDate(selectedDate);
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
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.placeholder} />
            </View>

            <View style={styles.content}>
              <Text style={styles.placeholderText}>{placeholder}</Text>

              <View style={styles.currentSelection}>
                <Text style={styles.currentSelectionLabel}>Selected Date:</Text>
                <Text style={styles.currentSelectionValue}>
                  {formatDate(tempDate)}
                </Text>
              </View>

              <View style={styles.datePickerContainer}>
                <DateTimePicker
                  value={tempDate}
                  mode="date"
                  display={Platform.OS === "ios" ? "inline" : "default"}
                  onChange={handleDateChange}
                  style={styles.datePicker}
                />
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.button, styles.clearButton]}
                  onPress={handleClear}
                >
                  <Text style={styles.clearButtonText}>Clear Filter</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.confirmButton]}
                  onPress={handleConfirm}
                >
                  <Text style={styles.confirmButtonText}>Apply Filter</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: Colors.White,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "90%",
    minHeight: "60%",
  },
  modalContent: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 18,
    color: "#6B7280",
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.FONT_SEMI_BOLD,
    color: Colors.Primary,
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  placeholderText: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
  },
  currentSelection: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  currentSelectionLabel: {
    fontSize: 14,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#64748B",
    marginBottom: 4,
  },
  currentSelectionValue: {
    fontSize: 16,
    fontFamily: Fonts.FONT_SEMI_BOLD,
    color: Colors.Primary,
  },
  datePickerContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  datePicker: {
    width: "100%",
    height: 200,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  clearButtonText: {
    fontSize: 16,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#6B7280",
  },
  confirmButton: {
    backgroundColor: Colors.Primary,
  },
  confirmButtonText: {
    fontSize: 16,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.White,
  },
});

export default DateSearchModal;
