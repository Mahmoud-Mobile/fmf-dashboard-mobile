import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";

const AddMeetingModal = ({ visible, onClose, onSubmit, selectedMeeting }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      if (selectedMeeting) {
        setTitle(selectedMeeting.title || "");
        setDescription(selectedMeeting.description || "");
        setDate(
          selectedMeeting.date ? new Date(selectedMeeting.date) : new Date()
        );
        setTime(
          selectedMeeting.time
            ? new Date(`2000-01-01T${selectedMeeting.time}`)
            : new Date()
        );
      } else {
        // Reset form for new meeting
        setTitle("");
        setDescription("");
        setDate(new Date());
        setTime(new Date());
      }
      setShowDatePicker(false);
      setShowTimePicker(false);
      setKeyboardVisible(false);
    }
  }, [visible, selectedMeeting]);

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
        // Hide pickers when keyboard appears
        setShowDatePicker(false);
        setShowTimePicker(false);
      }
    );
    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
      if (event.type === "set" && selectedDate) {
        setDate(selectedDate);
      }
    } else {
      // iOS: Update in real-time as user scrolls
      if (selectedDate) {
        setDate(selectedDate);
      }
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    if (Platform.OS === "android") {
      setShowTimePicker(false);
      if (event.type === "set" && selectedTime) {
        setTime(selectedTime);
      }
    } else {
      // iOS: Update in real-time as user scrolls
      if (selectedTime) {
        setTime(selectedTime);
      }
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      return;
    }

    const meetingData = {
      title: title.trim(),
      description: description.trim(),
      date: moment(date).format("YYYY-MM-DD"),
      time: moment(time).format("HH:mm"),
    };

    if (selectedMeeting) {
      onSubmit({ ...meetingData, id: selectedMeeting.id });
    } else {
      onSubmit(meetingData);
    }

    handleClose();
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setDate(new Date());
    setTime(new Date());
    setShowDatePicker(false);
    setShowTimePicker(false);
    onClose();
  };

  const formatDate = (date) => {
    return moment(date).format("MMM DD, YYYY");
  };

  const formatTime = (time) => {
    return moment(time).format("HH:mm");
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      style={[styles.modal, keyboardVisible && styles.modalTop]}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      avoidKeyboard={true}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={[
          styles.keyboardAvoidingView,
          keyboardVisible && styles.keyboardAvoidingViewTop,
        ]}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <View
          style={[
            styles.modalContainer,
            keyboardVisible && styles.modalContainerTop,
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {selectedMeeting ? "Edit Meeting" : "Add New Meeting"}
            </Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color={Colors.Gray} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
          >
            {/* Title Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Title *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter meeting title"
                placeholderTextColor={Colors.Gray}
                value={title}
                onChangeText={setTitle}
                maxLength={100}
              />
            </View>

            {/* Date Picker */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date *</Text>
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => {
                  if (showDatePicker) {
                    setShowDatePicker(false);
                  } else {
                    setShowDatePicker(true);
                    setShowTimePicker(false);
                    Keyboard.dismiss(); // Hide keyboard if open
                  }
                }}
              >
                <MaterialIcons
                  name="calendar-today"
                  size={20}
                  color={Colors.Primary}
                />
                <Text style={styles.pickerText}>{formatDate(date)}</Text>
                {showDatePicker && (
                  <MaterialIcons
                    name="keyboard-arrow-up"
                    size={20}
                    color={Colors.Primary}
                  />
                )}
              </TouchableOpacity>
              {showDatePicker && Platform.OS === "android" && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                />
              )}
              {showDatePicker && Platform.OS === "ios" && (
                <View style={styles.iosPickerContainer}>
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="spinner"
                    onChange={handleDateChange}
                    minimumDate={new Date()}
                    style={styles.iosPicker}
                  />
                  <TouchableOpacity
                    style={styles.iosPickerDoneButton}
                    onPress={() => setShowDatePicker(false)}
                  >
                    <Text style={styles.iosPickerDoneText}>Done</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Time Picker */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Time *</Text>
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => {
                  // Toggle time picker - if open, close it; if closed, open it and close date picker
                  if (showTimePicker) {
                    setShowTimePicker(false);
                  } else {
                    setShowTimePicker(true);
                    setShowDatePicker(false);
                    Keyboard.dismiss(); // Hide keyboard if open
                  }
                }}
              >
                <MaterialIcons
                  name="access-time"
                  size={20}
                  color={Colors.Primary}
                />
                <Text style={styles.pickerText}>{formatTime(time)}</Text>
                {showTimePicker && (
                  <MaterialIcons
                    name="keyboard-arrow-up"
                    size={20}
                    color={Colors.Primary}
                  />
                )}
              </TouchableOpacity>
              {showTimePicker && Platform.OS === "android" && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  display="default"
                  onChange={handleTimeChange}
                />
              )}
              {showTimePicker && Platform.OS === "ios" && (
                <View style={styles.iosPickerContainer}>
                  <DateTimePicker
                    value={time}
                    mode="time"
                    display="spinner"
                    onChange={handleTimeChange}
                    style={styles.iosPicker}
                  />
                  <TouchableOpacity
                    style={styles.iosPickerDoneButton}
                    onPress={() => setShowTimePicker(false)}
                  >
                    <Text style={styles.iosPickerDoneText}>Done</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Description Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter meeting description (optional)"
                placeholderTextColor={Colors.Gray}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                maxLength={500}
              />
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleClose}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                styles.submitButton,
                !title.trim() && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              activeOpacity={0.8}
              disabled={!title.trim()}
            >
              <Text style={styles.submitButtonText}>
                {selectedMeeting ? "Update" : "Add Meeting"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalTop: {
    justifyContent: "flex-start",
    paddingTop: Platform.OS === "ios" ? 40 : 20,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  keyboardAvoidingViewTop: {
    justifyContent: "flex-start",
  },
  modalContainer: {
    backgroundColor: Colors.White,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "95%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  modalContainerTop: {
    borderRadius: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginHorizontal: Platform.OS === "ios" ? 0 : 16,
    marginTop: Platform.OS === "ios" ? 40 : 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.Background,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  scrollContent: {
    paddingBottom: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.FONT_SEMI_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.LightGray,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    backgroundColor: Colors.Background,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 14,
  },
  pickerButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.LightGray,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: Colors.Background,
    gap: 12,
  },
  pickerText: {
    fontSize: 15,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: Platform.OS === "ios" ? 34 : 16,
    borderTopWidth: 1,
    borderTopColor: Colors.LightGray,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: Colors.Background,
    borderWidth: 1,
    borderColor: Colors.LightGray,
  },
  cancelButtonText: {
    fontSize: 15,
    fontFamily: Fonts.FONT_SEMI_BOLD,
    color: Colors.Gray,
  },
  submitButton: {
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
  submitButtonDisabled: {
    backgroundColor: Colors.LightGray,
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 15,
    fontFamily: Fonts.FONT_SEMI_BOLD,
    color: Colors.White,
  },
  iosPickerContainer: {
    marginTop: 12,
    backgroundColor: Colors.Background,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.LightGray,
  },
  iosPicker: {
    width: "100%",
    height: 200,
  },
  iosPickerDoneButton: {
    marginTop: 12,
    paddingVertical: 10,
    backgroundColor: Colors.Primary,
    borderRadius: 8,
    alignItems: "center",
  },
  iosPickerDoneText: {
    fontSize: 15,
    fontFamily: Fonts.FONT_SEMI_BOLD,
    color: Colors.White,
  },
});

export default AddMeetingModal;
