import React from "react";
import { TouchableOpacity, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ImagesWithProps } from "../../../../config/images";
import { formatDateRange } from "../../../../config/dateUtils";
import styles from "./Styles";

const CustomCheckInCard = ({ item, onPress, onPreview, onCheckIn, width }) => {
  const handlePreviewPress = (e) => {
    e.stopPropagation();
    onPreview?.(item?.id || item);
  };

  const handleCheckInPress = (e) => {
    e.stopPropagation();
    onCheckIn?.(item?.id || item);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      // onPress={() => onPress?.(item)}
      style={[styles.cardContainer, width && { width }]}
    >
      <View style={styles.flexWrap}>
        <View style={{ width: "100%" }}>
          <View style={styles.flexRow}>
            <ImagesWithProps source="FMF_Icon" />
            <Text style={styles.eventTitle}>{item?.title}</Text>
          </View>

          <View style={styles.detailItem}>
            <Ionicons
              name="location-outline"
              size={16}
              color="#646464"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.detailText}>{item?.location}</Text>
          </View>
        </View>
        <View>
          <View style={styles.detailItem}>
            <Ionicons
              name="calendar-outline"
              size={16}
              color="#646464"
              style={{ marginRight: 4, marginTop: 2 }}
            />
            <Text style={styles.detailText}>
              {formatDateRange(item?.availableFrom, item?.availableUntil)}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons
              name="seat-outline"
              size={16}
              color="#646464"
              style={{ marginRight: 4, marginTop: 2 }}
            />
            <Text style={styles.detailText}>{item?.capacity}</Text>
          </View>
        </View>
        <View style={[styles.flexRow, { marginTop: 20 }]}>
          <Pressable style={styles.previewButton} onPress={handlePreviewPress}>
            <Text style={styles.previewButtonText}>Preview</Text>
          </Pressable>

          <Pressable style={styles.checkInButton} onPress={handleCheckInPress}>
            <Text style={styles.checkInButtonText}>Check-In</Text>
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomCheckInCard;
