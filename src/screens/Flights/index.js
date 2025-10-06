import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import FlightsNavigator from "./FlightsNavigator";
import CustomHeader from "../../components/CustomHeader";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import { Fonts } from "../../Global/fonts";
import { SafeAreaView } from "react-native-safe-area-context";

const Flights = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Flights" center={true} top={0} />
      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>Flight Management System</Text>
      </View>

      <View style={styles.tabContainer}>
        <FlightsNavigator />
      </View>
      <FloatingChatIcon />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#F8F9FA",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: Fonts.FONT_BOLD,
    color: "#1A1A1A",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#6B7280",
  },
  tabContainer: {
    flex: 1,
  },
});

export default Flights;
