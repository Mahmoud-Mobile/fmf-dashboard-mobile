import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";
import { horizontalMargin, commonCardStyle } from "../../../config/metrics";

const OverviewCards = ({ cards = [], title = "Overview" }) => {
  if (!cards || cards.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.overviewCardsContainer}
      >
        {cards.map((card, index) => (
          <View key={index} style={styles.overviewCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <View style={styles.iconContainer}>
                <Ionicons name={card.icon} size={18} color={Colors.Primary} />
              </View>
            </View>
            <Text style={styles.cardValue}>{card.value}</Text>
            {card.today && (
              <Text style={styles.cardSubtitle}>Today: {card.today}</Text>
            )}
            {card.subtitle && (
              <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 15,
    paddingHorizontal: horizontalMargin,
  },
  overviewCardsContainer: {
    flexDirection: "row",
    paddingHorizontal: horizontalMargin,
    gap: 12,
    marginBottom: 15,
  },
  overviewCard: {
    ...commonCardStyle,
    width: 160,
    backgroundColor: Colors.White,
    borderRadius: 12,
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    flex: 1,
  },
  iconContainer: {
    backgroundColor: "#EFF6FF",
    borderRadius: 6,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  cardValue: {
    fontSize: 16,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
  },
});

export default OverviewCards;
