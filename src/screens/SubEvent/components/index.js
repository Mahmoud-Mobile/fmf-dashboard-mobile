import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
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

const CustomEventCard = ({ item, onPress, width }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress?.(item)}
      style={[styles.cardContainer, width ? { width } : null]}
    >
      <View style={styles.flexWrap}>
        <View style={styles.leftColumn}>
          <View style={styles.flexRow}>
            <View style={styles.iconContainer}>
              <ImagesWithProps
                source="Calendar_Icon"
                color={Colors.Primary}
                size={16}
              />
            </View>
            <Text style={styles.eventTitle}>{item?.name}</Text>
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
          <View style={styles.detailItem}>
            <Ionicons
              name="calendar-outline"
              size={16}
              color={Colors.Gray}
              style={{ marginRight: 4 }}
            />
            <Text style={styles.detailText}>
              {formatDateRange(item?.startDate, item?.endDate)}
            </Text>
          </View>
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.metaLabel}>
            <Text style={styles.metaLabelBold}>Type: </Text>
            <Text style={styles.metaValue}>{item?.eventType}</Text>
          </Text>
          <Text style={styles.metaLabel}>
            <Text style={styles.metaLabelBold}>Level: </Text>
            <Text style={styles.metaValue}>{item?.eventLevel}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>{item?.status}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomEventCard;
