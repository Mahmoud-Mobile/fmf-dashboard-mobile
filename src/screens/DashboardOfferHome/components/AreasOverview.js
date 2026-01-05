import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";
import { horizontalMargin, commonCardStyle } from "../../../config/metrics";

const AreasOverview = ({ areas = [] }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Areas Overview</Text>
      <View style={styles.areasContainer}>
        {areas.map((area, index) => (
          <View
            key={index}
            style={[
              styles.areaItem,
              index < areas.length - 1 && styles.areaItemBorder,
            ]}
          >
            <Text style={styles.areaName}>{area.name}</Text>
            <View style={styles.areaRight}>
              <Text style={styles.areaCount}>{area.checkedIn}</Text>
              <Text style={styles.areaLabel}>checked-in</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 15,
    paddingHorizontal: horizontalMargin,
  },
  areasContainer: {
    ...commonCardStyle,
    backgroundColor: Colors.White,
    borderRadius: 12,
    marginHorizontal: horizontalMargin,
    overflow: "hidden",
  },
  areaItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: horizontalMargin,
    paddingVertical: 16,
  },
  areaItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
  },
  areaName: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
  },
  areaRight: {
    alignItems: "flex-satrt",
  },
  areaCount: {
    fontSize: 16,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.Primary,
    marginBottom: 2,
  },
  areaLabel: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
  },
});

export default AreasOverview;
