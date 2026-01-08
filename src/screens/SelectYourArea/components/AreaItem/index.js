import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../../../Global/colors";
import { styles } from "./Styles";

const AreaItem = ({ area, onPress, isLastItem }) => {
  const isActive = area?.isActive || false;
  const capacity = area?.capacity || 0;
  const currentCount = area?.currentAccessCount || 0;
  const location = area?.location || "N/A";

  return (
    <TouchableOpacity
      style={[styles.areaItem, isLastItem && styles.areaItemLast]}
      onPress={() => onPress(area)}
      activeOpacity={0.7}
    >
      <View style={styles.areaContent}>
        <View style={styles.iconContainer}>
          <EvilIcons name="location" size={24} color={Colors.Primary} />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.areaName} numberOfLines={1}>
              {area.name}
            </Text>
            <View
              style={[
                styles.statusBadge,
                isActive
                  ? styles.statusBadgeActive
                  : styles.statusBadgeInactive,
              ]}
            >
              <View
                style={[
                  styles.statusDot,
                  isActive ? styles.statusDotActive : styles.statusDotInactive,
                ]}
              />
              <Text
                style={[
                  styles.statusText,
                  isActive
                    ? styles.statusTextActive
                    : styles.statusTextInactive,
                ]}
              >
                {isActive ? "Active" : "Inactive"}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <EvilIcons name="location" size={14} color={Colors.Gray} />
            <Text style={styles.locationText} numberOfLines={1}>
              {location}
            </Text>
          </View>

          <View style={styles.capacityRow}>
            <View style={styles.capacityItem}>
              <MaterialIcons name="people" size={16} color={Colors.Gray} />
              <Text style={styles.capacityText}>
                {currentCount.toLocaleString()} / {capacity.toLocaleString()}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.checkInButton}
              onPress={() => onPress(area)}
              activeOpacity={0.8}
            >
              <Text style={styles.checkInButtonText}>Check In</Text>
            </TouchableOpacity>
          </View>
        </View>

        <MaterialIcons
          name="chevron-right"
          size={24}
          color={Colors.LightGray}
          style={styles.chevronIcon}
        />
      </View>
    </TouchableOpacity>
  );
};

export default AreaItem;
