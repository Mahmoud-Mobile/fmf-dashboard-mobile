import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomHeader from "../../components/CustomHeader";
import CustomPressable from "../../components/CustomPressable";
import LoadingModal from "../../components/LoadingModal";
import { Colors } from "../../Global/colors";
import { createTrip } from "../../webservice/apiConfig";
import styles from "./Styles";
import moment from "moment";

const CreateTripe = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedEvent } = useSelector((state) => state.api);
  const { participantId } = route.params || {};

  const [loading, setLoading] = useState(false);
  const [tripType, setTripType] = useState("PICKUP");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [scheduledPickup, setScheduledPickup] = useState(new Date());
  const [scheduledDropoff, setScheduledDropoff] = useState(new Date());
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [notes, setNotes] = useState("");

  const [showPickupDatePicker, setShowPickupDatePicker] = useState(false);
  const [showDropoffDatePicker, setShowDropoffDatePicker] = useState(false);
  const [pickupPickerMode, setPickupPickerMode] = useState("date");
  const [dropoffPickerMode, setDropoffPickerMode] = useState("date");

  const tripTypeOptions = [
    { value: "PICKUP", label: "Pickup" },
    { value: "DROPOFF", label: "Dropoff" },
  ];

  const handlePickupDateChange = (event, date) => {
    if (Platform.OS === "android") {
      setShowPickupDatePicker(false);
      if (event.type === "set" && date) {
        if (pickupPickerMode === "date") {
          setScheduledPickup(date);
          setPickupPickerMode("time");
          setShowPickupDatePicker(true);
        } else {
          const currentDate = scheduledPickup;
          const newDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            date.getHours(),
            date.getMinutes()
          );
          setScheduledPickup(newDate);
          setPickupPickerMode("date");
        }
      } else {
        setPickupPickerMode("date");
      }
    } else {
      if (date) {
        if (pickupPickerMode === "date") {
          setScheduledPickup(date);
          setPickupPickerMode("time");
        } else {
          const currentDate = scheduledPickup;
          const newDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            date.getHours(),
            date.getMinutes()
          );
          setScheduledPickup(newDate);
          setPickupPickerMode("date");
          setShowPickupDatePicker(false);
        }
      }
    }
  };

  const handleDropoffDateChange = (event, date) => {
    if (Platform.OS === "android") {
      setShowDropoffDatePicker(false);
      if (event.type === "set" && date) {
        if (dropoffPickerMode === "date") {
          setScheduledDropoff(date);
          setDropoffPickerMode("time");
          setShowDropoffDatePicker(true);
        } else {
          const currentDate = scheduledDropoff;
          const newDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            date.getHours(),
            date.getMinutes()
          );
          setScheduledDropoff(newDate);
          setDropoffPickerMode("date");
        }
      } else {
        setDropoffPickerMode("date");
      }
    } else {
      if (date) {
        if (dropoffPickerMode === "date") {
          setScheduledDropoff(date);
          setDropoffPickerMode("time");
        } else {
          const currentDate = scheduledDropoff;
          const newDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            date.getHours(),
            date.getMinutes()
          );
          setScheduledDropoff(newDate);
          setDropoffPickerMode("date");
          setShowDropoffDatePicker(false);
        }
      }
    }
  };

  const formatDateTime = (date) => {
    return moment(date).format("MMM DD, YYYY HH:mm");
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("Validation Error", "Please enter a title");
      return;
    }

    if (!pickupLocation.trim()) {
      Alert.alert("Validation Error", "Please enter a pickup location");
      return;
    }

    if (!dropoffLocation.trim()) {
      Alert.alert("Validation Error", "Please enter a dropoff location");
      return;
    }

    setLoading(true);

    try {
      const tripData = {
        tripType,
        title: title.trim(),
        description: description.trim(),
        pickupLocation: pickupLocation.trim(),
        dropoffLocation: dropoffLocation.trim(),
        pickupAddress: pickupAddress.trim(),
        dropoffAddress: dropoffAddress.trim(),
        scheduledPickup: scheduledPickup.toISOString(),
        scheduledDropoff: scheduledDropoff.toISOString(),
        specialInstructions: specialInstructions.trim(),
        notes: notes.trim(),
      };

      const response = await createTrip(
        selectedEvent?.id,
        participantId,
        tripData
      );

      if (response) {
        Alert.alert("Success", "Trip created successfully", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        Alert.alert("Error", "Failed to create trip");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        error?.errorMessage || error?.message || "Failed to create trip"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        leftLabel="Create New Trip"
        onLeftButtonPress={() => navigation.goBack()}
      />
      <LoadingModal visible={loading} />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Trip Type */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Trip Type *</Text>
            <View style={styles.optionContainer}>
              {tripTypeOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionButton,
                    tripType === option.value && styles.optionButtonSelected,
                  ]}
                  onPress={() => setTripType(option.value)}
                >
                  <Text
                    style={[
                      styles.optionButtonText,
                      tripType === option.value &&
                        styles.optionButtonTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Title */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Title *</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter trip title"
              placeholderTextColor={Colors.SecondaryText}
            />
          </View>

          {/* Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter description"
              placeholderTextColor={Colors.SecondaryText}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          {/* Pickup Location */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pickup Location *</Text>
            <TextInput
              style={styles.input}
              value={pickupLocation}
              onChangeText={setPickupLocation}
              placeholder="Enter pickup location"
              placeholderTextColor={Colors.SecondaryText}
            />
          </View>

          {/* Pickup Address */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pickup Address</Text>
            <TextInput
              style={styles.input}
              value={pickupAddress}
              onChangeText={setPickupAddress}
              placeholder="Enter pickup address"
              placeholderTextColor={Colors.SecondaryText}
            />
          </View>

          {/* Dropoff Location */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dropoff Location *</Text>
            <TextInput
              style={styles.input}
              value={dropoffLocation}
              onChangeText={setDropoffLocation}
              placeholder="Enter dropoff location"
              placeholderTextColor={Colors.SecondaryText}
            />
          </View>

          {/* Dropoff Address */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dropoff Address</Text>
            <TextInput
              style={styles.input}
              value={dropoffAddress}
              onChangeText={setDropoffAddress}
              placeholder="Enter dropoff address"
              placeholderTextColor={Colors.SecondaryText}
            />
          </View>

          {/* Scheduled Pickup */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Scheduled Pickup</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => {
                if (!showPickupDatePicker) {
                  setPickupPickerMode("date");
                }
                setShowPickupDatePicker(!showPickupDatePicker);
              }}
            >
              <Text style={styles.dateButtonText}>
                {formatDateTime(scheduledPickup)}
              </Text>
            </TouchableOpacity>
            {showPickupDatePicker && (
              <DateTimePicker
                value={scheduledPickup}
                mode={pickupPickerMode}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handlePickupDateChange}
                minimumDate={new Date()}
              />
            )}
          </View>

          {/* Scheduled Dropoff */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Scheduled Dropoff</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => {
                if (!showDropoffDatePicker) {
                  setDropoffPickerMode("date");
                }
                setShowDropoffDatePicker(!showDropoffDatePicker);
              }}
            >
              <Text style={styles.dateButtonText}>
                {formatDateTime(scheduledDropoff)}
              </Text>
            </TouchableOpacity>
            {showDropoffDatePicker && (
              <DateTimePicker
                value={scheduledDropoff}
                mode={dropoffPickerMode}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleDropoffDateChange}
                minimumDate={new Date()}
              />
            )}
          </View>

          {/* Special Instructions */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Special Instructions</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={specialInstructions}
              onChangeText={setSpecialInstructions}
              placeholder="Enter special instructions"
              placeholderTextColor={Colors.SecondaryText}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          {/* Notes */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Enter notes"
              placeholderTextColor={Colors.SecondaryText}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.submitContainer}>
            <CustomPressable
              title="Create Trip"
              onPress={handleSubmit}
              style={styles.submitButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreateTripe;
