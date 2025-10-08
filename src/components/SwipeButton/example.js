import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import SwipeButton from "./index";

const SwipeButtonExample = () => {
  const handleSwipeComplete = () => {
    Alert.alert("Success!", "Swipe action completed!");
  };

  return (
    <View style={styles.container}>
      <SwipeButton
        onSwipeComplete={handleSwipeComplete}
        text="Swipe to Confirm"
        iconName="arrow-forward"
      />

      <SwipeButton
        onSwipeComplete={() => Alert.alert("Payment", "Payment processed!")}
        text="Swipe to Pay"
        iconName="payment"
        backgroundColor="#E8F5E8"
      />

      <SwipeButton
        onSwipeComplete={() => Alert.alert("Delete", "Item deleted!")}
        text="Swipe to Delete"
        iconName="delete"
        backgroundColor="#FFE8E8"
        height={50}
      />

      <SwipeButton
        onSwipeComplete={() => Alert.alert("Send", "Message sent!")}
        text="Swipe to Send"
        iconName="send"
        backgroundColor="#E3F2FD"
        height={70}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default SwipeButtonExample;
