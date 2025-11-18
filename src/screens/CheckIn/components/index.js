import React from "react";
import { TouchableOpacity, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

import { Colors } from "../../../Global/colors";
import { ImagesWithProps } from "../../../config/images";
import styles from "./Styles";

const formatDateRange = (startDate, endDate) => {
  if (!startDate && !endDate) {
    return "Date TBD";
  }

  const start = startDate ? moment(startDate) : null;
  const end = endDate ? moment(endDate) : null;

  if (start && end) {
    if (start.isSame(end, "day")) {
      return start.format("DD MMMM, YYYY");
    }

    if (start.year() !== end.year()) {
      return `${start.format("DD MMMM, YYYY")} - ${end.format(
        "DD MMMM, YYYY"
      )}`;
    }

    return `${start.format("DD MMMM")} - ${end.format("DD MMMM, YYYY")}`;
  }

  if (start) {
    return start.format("DD MMMM, YYYY");
  }

  return end.format("DD MMMM, YYYY");
};

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
      activeOpacity={0.85}
      onPress={() => onPress?.(item)}
      style={[styles.cardContainer, width && { width }]}
    >
      <View style={styles.flexWrap}>
        <View style={{ width: "40%" }}>
          <View style={styles.flexRow}>
            <ImagesWithProps source="FMF_Icon" />
            <Text style={styles.eventTitle}>{item?.title}</Text>
          </View>

          <View style={styles.detailItem}>
            <Ionicons
              name="location-outline"
              size={16}
              color={Colors.Gray}
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
              color={Colors.Gray}
              style={{ marginRight: 4, marginTop: 2 }}
            />
            <Text style={styles.detailText}>
              {formatDateRange(item?.startDate, item?.endDate)}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons
              name="people-outline"
              size={16}
              color={Colors.Gray}
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
