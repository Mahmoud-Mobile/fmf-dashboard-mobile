import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../../Global/colors";
import { Fonts } from "../../../../Global/fonts";
import { StyleSheet } from "react-native";
import { horizontalMargin, calcWidth } from "../../../../config/metrics";

const OverviewCards = () => {
  const cards = [
    {
      title: "Total Purchases",
      value: "1,456",
      today: "456",
      yesterday: "1,000",
      icon: "calendar-outline",
      todayColor: Colors.Success,
      yesterdayColor: Colors.Error,
    },
    {
      title: "Total Visits",
      value: "3,247",
      today: "1,247",
      yesterday: "2,000",
      icon: "people-outline",
      todayColor: Colors.Success,
      yesterdayColor: Colors.Error,
    },
    {
      title: "Total Sales",
      value: "SAR 2.5 M",
      today: "350k",
      yesterday: "220k",
      icon: "cash-outline",
      todayColor: Colors.Success,
      yesterdayColor: Colors.Error,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Overview</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsContainer}
        style={styles.scrollView}
      >
        {cards.map((card, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <View style={styles.iconContainer}>
                <Ionicons name={card.icon} size={18} color={Colors.Primary} />
              </View>
            </View>
            <Text style={styles.cardValue}>{card.value}</Text>
            <View style={styles.cardBreakdown}>
              <View style={styles.breakdownItem}>
                <View
                  style={[styles.dot, { backgroundColor: card.todayColor }]}
                />
                <Text style={styles.breakdownLabel}>Today: </Text>
                <Text style={styles.breakdownValue}>{card.today}</Text>
              </View>
              <View style={styles.breakdownItem}>
                <View
                  style={[styles.dot, { backgroundColor: card.yesterdayColor }]}
                />
                <Text style={styles.breakdownLabel}>Yesterday: </Text>
                <Text style={styles.breakdownValue}>{card.yesterday}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 15,
    paddingHorizontal: horizontalMargin,
  },
  scrollView: {
    paddingLeft: horizontalMargin,
  },
  cardsContainer: {
    flexDirection: "row",
    paddingRight: horizontalMargin,
    gap: 12,
  },
  card: {
    width: 250,
    backgroundColor: Colors.White,
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
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
    marginBottom: 12,
  },
  cardBreakdown: {
    gap: 6,
  },
  breakdownItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  breakdownLabel: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
  },
  breakdownValue: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
  },
});

export default OverviewCards;
