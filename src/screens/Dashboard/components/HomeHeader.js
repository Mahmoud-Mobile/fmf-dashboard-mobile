import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

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

  const getCurrentTime = () => {
    return moment().format("hh:mm A");
  };

  const getCurrentDate = () => {
    return moment().format("dddd, MMM D");
  };

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
          <View style={styles.leftSection}>
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

          <View style={styles.rightSection}>
            <View style={styles.timeContainer}>
              <View style={styles.timeIconContainer}>
                <Ionicons name="time-outline" size={16} color="white" />
              </View>
              <View style={styles.timeInfo}>
                <Text style={styles.time}>{getCurrentTime()}</Text>
                <Text style={styles.date}>{getCurrentDate()}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.notificationContainer}
              onPress={() => navigation.navigate("NotificationScreen")}
            >
              <View style={styles.notificationIconContainer}>
                <Ionicons
                  name="notifications-outline"
                  size={18}
                  color="white"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 15,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    height: 170,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  leftSection: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    fontFamily: Fonts.FONT_REGULAR,
    marginBottom: 4,
  },
  username: {
    fontSize: 24,
    fontWeight: "800",
    color: "white",
    fontFamily: Fonts.FONT_BOLD,
    marginBottom: 2,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  userRole: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: Fonts.FONT_MEDIUM,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  timeContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    minHeight: 44,
  },
  timeIconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  timeInfo: {
    alignItems: "flex-start",
  },
  time: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
    fontFamily: Fonts.FONT_BOLD,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  date: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: Fonts.FONT_REGULAR,
    marginTop: 2,
  },
  notificationContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    padding: 10,
    minWidth: 44,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationIconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
    width: 24,
    height: 24,
  },
});

export default HomeHeader;
