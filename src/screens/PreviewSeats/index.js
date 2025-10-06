import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../Global/colors";
import CustomHeader from "../../components/CustomHeader";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import navigationService from "../../Global/navRef";
import { styles } from "./Styles";

const SeatingPlanPreview = ({ route }) => {
  const {
    eventTitle = "",
    eventSubtitle = "",
    location = "",
    date = "",
  } = route?.params || {};
  const [scrollY] = useState(new Animated.Value(0));
  const renderLegendItem = (
    color,
    label,
    count,
    isOccupied = false,
    showIcon = true
  ) => (
    <View style={styles.legendItem}>
      {showIcon ? (
        <View style={[styles.legendCircle, { backgroundColor: color }]}>
          {isOccupied && <Text style={styles.occupiedX}>✕</Text>}
        </View>
      ) : null}
      <Text style={styles.legendText}>
        {label} {count !== undefined ? `(${count})` : ""}
      </Text>
    </View>
  );

  const renderSeat = (type, isOccupied = false) => {
    const getSeatColor = () => {
      if (isOccupied) return Colors.gray;

      switch (type) {
        case "premier":
          return "#C3A25D";
        case "premier-speaker":
          return "#3F7754";
        case "official":
          return "#305581";
        case "speaker":
          return "#A75656";
        case "vip":
          return "#A37FB2";
        default:
          return "#4B5563";
      }
    };

    return (
      <View
        style={[
          styles.seat,
          { backgroundColor: getSeatColor() },
          isOccupied && styles.occupiedSeat,
        ]}
      >
        {isOccupied && <Text style={styles.occupiedX}>✕</Text>}
      </View>
    );
  };

  const handleBack = () => {
    navigationService.navigation?.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={{ top: "additive" }}>
      <CustomHeader
        title="Seating Plan Preview"
        center={false}
        top={0}
        scrollY={scrollY}
        onLeftButtonPress={handleBack}
      />

      {/* Event Info */}
      <View style={styles.eventInfo}>
        <View style={styles.eventHeader}>
          <View style={styles.eventTitleSection}>
            <Text style={styles.eventTitle}>{eventTitle}</Text>
            <Text style={styles.eventSubtitle}>{eventSubtitle}</Text>
          </View>
          <View style={styles.eventDetailsSection}>
            <Text style={styles.eventDate}>Event Date: {date}</Text>
            <Text style={styles.eventLocation}>{location}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendGrid}>
            {renderLegendItem("#C3A25D", "Premier")}
            {renderLegendItem("#3F7754", "Premier + Speaker")}
            {renderLegendItem("#305581", "Official")}
            {renderLegendItem("#A75656", "Speaker")}
            {renderLegendItem("#A37FB2", "VIP")}
          </View>
        </View>

        {/* Legend for counts and status */}
        <View style={styles.legend}>
          <View style={styles.legendGridCounts}>
            {renderLegendItem("#4B5563", "Table", 5, false, false)}
            {renderLegendItem("#4B5563", "Chair", 5, false, false)}
            {renderLegendItem("#4B5563", "Available Table", 100)}
            {renderLegendItem("#4B5563", "Available Chair", 100)}
            {renderLegendItem("#D1D5DB", "Occupied Chair", 4, true)}
          </View>
        </View>

        {/* Seating Plan */}
        <View style={styles.seatingPlan}>
          <Text style={styles.seatingTitle}>Seating Arrangement</Text>
          {/* Main Seating Area */}
          <View style={styles.mainSeatingArea}>
            <View style={styles.frontRow}>
              {renderSeat("official")}
              {renderSeat("premier-speaker")}
              {renderSeat("vip")}
              {renderSeat("premier")}
              {renderSeat("speaker")}
            </View>

            {Array.from({ length: 8 }, (_, rowIndex) => (
              <View key={rowIndex} style={styles.seatingRow}>
                {Array.from({ length: 12 }, (_, seatIndex) => {
                  const isOccupied =
                    rowIndex === 3 && seatIndex >= 2 && seatIndex <= 5;
                  return (
                    <View key={seatIndex}>
                      {renderSeat("regular", isOccupied)}
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <FloatingChatIcon />
    </SafeAreaView>
  );
};

export default SeatingPlanPreview;
