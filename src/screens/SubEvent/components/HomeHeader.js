import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { Fonts } from "../../../Global/fonts";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { horizontalMargin } from "../../../config/metrics";
import { Colors } from "../../../Global/colors";

const HomeHeader = () => {
  const navigation = useNavigation();
  const userInfo = useSelector((state) => state.auth.user);
  const profileData = useMemo(() => {
    const profile = userInfo?.user ?? userInfo ?? {};
    const firstName = profile.firstName?.trim();
    const lastName = profile.lastName?.trim();
    const displayName = [firstName, lastName].filter(Boolean).join(" ") || " ";

    const initialsSource =
      displayName !== " " ? displayName : profile.email || displayName;

    const initials =
      initialsSource
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || " ";

    return {
      profileImage: profile.profileImage || null,
      initials,
      displayName,
      role: profile.role || profile.userRole || profile.title || "",
    };
  }, [userInfo]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerCard}>
        <View style={styles.userInfo}>
          {profileData.profileImage ? (
            <Image
              source={{ uri: profileData.profileImage }}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.profileFallback}>
              <Text style={styles.profileInitials}>{profileData.initials}</Text>
            </View>
          )}

          <View style={{ gap: 4 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.greeting}>Welcome back, </Text>
              <Text style={styles.username}>{profileData.displayName}</Text>
            </View>
            <Text style={styles.userRole}>{profileData.role}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.notificationContainer}
          onPress={() => navigation.navigate("NotificationScreen")}
        >
          <Ionicons name="notifications-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalMargin,
    paddingVertical: Platform.OS === "ios" ? 5 : 15,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: Colors.Primary,
  },
  headerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e4681",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  greeting: {
    fontSize: 14,
    color: Colors.White,
    fontFamily: Fonts.FONT_REGULAR,
  },
  username: {
    fontSize: 12,
    color: Colors.White,
    fontFamily: Fonts.FONT_MEDIUM,
  },
  userRole: {
    fontSize: 13,
    color: "#E3E3E3",
    fontFamily: Fonts.FONT_REGULAR,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  profileFallback: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitials: {
    fontSize: 14,
    color: Colors.White,
    fontFamily: Fonts.FONT_REGULAR,
  },
});

export default HomeHeader;
