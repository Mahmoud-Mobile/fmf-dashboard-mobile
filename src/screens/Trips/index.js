import React, { useState } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import { Colors } from "../../Global/colors";
import styles from "./Styles";

const Trips = () => {
  const [onRefresh, setOnRefresh] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);

  const Call_RefreshControl = () => {
    setOnRefresh(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={{ top: "additive" }}>
      <CustomHeader title="Trips" center={true} top={0} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={onRefresh}
            onRefresh={Call_RefreshControl}
          />
        }
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: Colors.Primary,
            fontFamily: "Poppins-Medium",
          }}
        >
          Trips Management
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#666",
            marginTop: 8,
            textAlign: "center",
          }}
        >
          Manage your trips and travel information here
        </Text>
      </ScrollView>
      <FloatingChatIcon />
    </SafeAreaView>
  );
};

export default Trips;
