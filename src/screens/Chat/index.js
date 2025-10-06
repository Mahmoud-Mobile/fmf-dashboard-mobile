import React, { useState } from "react";
import { View, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import styles from "./Styles";
import { useNavigation } from "@react-navigation/native";

const Chat = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container} edges={{ top: "additive" }}>
      <CustomHeader
        title="Chat"
        center={false}
        onLeftButtonPress={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
};

export default Chat;
