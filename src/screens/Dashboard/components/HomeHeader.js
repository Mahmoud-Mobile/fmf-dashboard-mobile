import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Fonts } from "../../../Global/fonts";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { horizontalMargin } from "../../../config/metrics";

const HomeHeader = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation();
  const authUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        // Use Redux state first, then fallback to SecureStore
        if (authUser) {
          setUserInfo(authUser);
        } else {
          const storedUserInfo = await SecureStore.getItemAsync("userInfo");
          if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
          }
        }
      } catch (error) {
        console.error("Error loading user info:", error);
      }
    };
    loadUserInfo();
  }, [authUser]);

  const getGreeting = () => {
    const hour = moment().hour();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <LinearGradient
      colors={["#880CB9", "#368BBA", "#368BBA"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.username}>
              {userInfo?.user?.firstName && userInfo?.user?.lastName
                ? `${userInfo.user.firstName} ${userInfo.user.lastName}`
                : userInfo?.user?.email || userInfo?.email || "User"}
            </Text>
            <Text style={styles.userRole}>
              {userInfo?.user?.role || userInfo?.role || "Operations Manager"}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.notificationContainer}
            onPress={() => navigation.navigate("NotificationScreen")}
          >
            <Ionicons name="notifications-outline" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalMargin,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    height: 160,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  greeting: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    fontFamily: Fonts.FONT_REGULAR,
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: "white",
    fontFamily: Fonts.FONT_BOLD,
    marginBottom: 2,
  },
  userRole: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: Fonts.FONT_MEDIUM,
  },
  notificationContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 12,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeHeader;
