import React, { forwardRef } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./Styles";

// Utility function to convert Arabic numerals to English numerals
const convertToEnglishNumbers = (input) => {
  const arabicToEnglishMap = {
    "٠": "0",
    "١": "1",
    "٢": "2",
    "٣": "3",
    "٤": "4",
    "٥": "5",
    "٦": "6",
    "٧": "7",
    "٨": "8",
    "٩": "9",
  };
  return input.replace(/[٠-٩]/g, (match) => arabicToEnglishMap[match]);
};

const CustomInput = forwardRef(
  (
    {
      label,
      value,
      onChangeText,
      secureTextEntry,
      isError,
      onSubmitEditing,
      multiline,
      autoFocus,
      maxLength,
      keyboardType,
      returnKeyType,
      placeholder,
      blurOnSubmit,
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    // Removed useTranslation - using static English text

    const handleTextChange = (text) => {
      const convertedText = convertToEnglishNumbers(text);
      onChangeText(convertedText);
    };

    return (
      <View style={styles.container}>
        <Text style={styles.labelText}>{label}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, isError && styles.errorInput]}
            value={value}
            onChangeText={handleTextChange}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            ref={ref}
            onSubmitEditing={onSubmitEditing}
            multiline={multiline}
            autoFocus={autoFocus}
            maxLength={maxLength}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType ?? "done"}
            placeholder={placeholder}
            placeholderTextColor="#828282"
            blurOnSubmit={blurOnSubmit}
          />
          {secureTextEntry && (
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.iconContainer}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={20}
                color="#787982"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
);

export default CustomInput;
