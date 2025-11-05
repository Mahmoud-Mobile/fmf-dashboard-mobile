import React from "react";
import { View, StyleSheet } from "react-native";
import CustomHeader from "../../components/CustomHeader";

const Hotels = () => {
  return (
    <View style={styles.container}>
      <CustomHeader title="Hotels" />
      <View style={styles.content}>
        {/* Empty content - only custom header */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

export default Hotels;
