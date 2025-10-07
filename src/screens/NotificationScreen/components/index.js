import React from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";
import { Ionicons } from "@expo/vector-icons";

export function NotificationItem({
  iconName = "notifications-outline",
  title,
  desc,
  time,
}) {
  const formatted = moment(time).fromNow();
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.icon,
          styles.iconFallback,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <Ionicons name={iconName} size={22} color={Colors.Secondary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title]}>{title}</Text>
        <Text style={styles.desc} numberOfLines={2}>
          {desc}
        </Text>
        <Text style={styles.time}>{formatted}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: Colors.White,
    borderRadius: 12,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: Colors.LightGray,
  },
  iconFallback: {
    borderWidth: 1,
    borderColor: Colors.LightGray,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.Secondary,
  },
  desc: {
    marginTop: 4,
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Gray,
  },
  time: {
    marginTop: 6,
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.Gray,
  },
});
