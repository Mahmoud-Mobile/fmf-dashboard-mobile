import React, { useState } from "react";
import { Text, View } from "react-native";
import styles from "./Styles";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
} from "react-native-confirmation-code-field";
import CustomPressable from "../../components/CustomPressable";
const convertToEnglishNumbers = (text) => {
  const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let convertedText = text;

  arabicNumbers.forEach((arabic, index) => {
    const regex = new RegExp(arabic, "g");
    convertedText = convertedText.replace(regex, englishNumbers[index]);
  });

  return convertedText;
};

const CustomOTP = ({ OTPentered, loading, title }) => {
  const [value, setValue] = useState("");
  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });

  const handleOTPChange = (text) => {
    const englishValue = convertToEnglishNumbers(text);
    setValue(englishValue);

    if (englishValue.length === CELL_COUNT) {
      OTPentered(englishValue);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>confirm phone number</Text>
      <Text style={styles.descText}>
        {title
          ? title
          : "We have sent your code to the mobile number you entered"}
      </Text>

      <CodeField
        ref={ref}
        autoFocus
        value={value}
        onChangeText={handleOTPChange}
        rootStyle={styles.circleStyleBase}
        cellCount={CELL_COUNT}
        textContentType="oneTimeCode"
        keyboardType="number-pad"
        returnKeyType="done"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <CustomPressable
        onPress={() => {
          OTPentered(value);
        }}
        title="Confirm"
        style={{ marginTop: 30, marginBottom: 50 }}
        icon={true}
        isLoading={loading}
      />
    </View>
  );
};

export default CustomOTP;
