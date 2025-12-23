import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { Colors } from "../../../Global/colors";
import { styles } from "../Styles";

const LoadingState = () => {
  return (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color={Colors.Primary} />
      <Text style={styles.loadingText}>Loading seating plans...</Text>
    </View>
  );
};

export default LoadingState;
