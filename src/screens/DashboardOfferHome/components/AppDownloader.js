import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";
import { horizontalMargin, commonCardStyle } from "../../../config/metrics";

const AppDownloader = () => {
  const iosDownloads = 2682;
  const androidDownloads = 140;

  const handleIOSDownload = () => {
    console.log("iOS download clicked");
  };

  const handleAndroidDownload = () => {
    console.log("Android download clicked");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Download App</Text>
      <View style={styles.downloadContainer}>
        <TouchableOpacity
          style={styles.downloadCard}
          onPress={handleIOSDownload}
          activeOpacity={0.7}
        >
          <View style={styles.cardContent}>
            <View style={styles.iconWrapper}>
              <Ionicons name="logo-apple" size={32} color={Colors.Primary} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.platformText}>iOS</Text>
              <Text style={styles.downloadCount}>
                {iosDownloads.toLocaleString()} downloads
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.SecondaryText}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.downloadCard}
          onPress={handleAndroidDownload}
          activeOpacity={0.7}
        >
          <View style={styles.cardContent}>
            <View style={styles.iconWrapper}>
              <Ionicons name="logo-android" size={32} color={Colors.Success} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.platformText}>Android</Text>
              <Text style={styles.downloadCount}>
                {androidDownloads.toLocaleString()} downloads
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.SecondaryText}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 15,
    paddingHorizontal: horizontalMargin,
  },
  downloadContainer: {
    paddingHorizontal: horizontalMargin,
    gap: 12,
  },
  downloadCard: {
    ...commonCardStyle,
    backgroundColor: Colors.White,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    padding: 16,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F4F6FA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  platformText: {
    fontSize: 16,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 4,
  },
  downloadCount: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
  },
});

export default AppDownloader;
