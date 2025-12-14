import React from "react";
import { View, Text } from "react-native";
import { styles } from "../Styles";

const ErrorState = ({ message }) => {
  return (
    <View style={styles.centerContainer}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
};

export default ErrorState;
