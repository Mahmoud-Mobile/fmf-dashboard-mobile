import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";
import { horizontalMargin, commonCardStyle } from "../../../config/metrics";

const EventSummaryKPIs = ({ eventSummaryKPIs }) => {
  if (!eventSummaryKPIs) return null;

  const {
    totalAttendees,
    totalSpecialGuests,
    costSaving,
    exhibitorTransactions,
    daily,
    lastUpdated,
  } = eventSummaryKPIs;

  const formatCurrency = (value) => {
    if (typeof value === "number") {
      return `SAR ${value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
    return value || "SAR 0";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  const kpiCards = [
    {
      title: "Total Attendees",
      value: totalAttendees?.toLocaleString() || "0",
      icon: "people-outline",
      color: Colors.Primary,
    },
    {
      title: "Special Guests",
      value: totalSpecialGuests?.toLocaleString() || "0",
      icon: "star-outline",
      color: Colors.Warning,
    },
    {
      title: "Cost Saving",
      value: formatCurrency(costSaving),
      icon: "cash-outline",
      color: Colors.Success,
    },
    {
      title: "Exhibitor Transactions",
      value: exhibitorTransactions?.toLocaleString() || "0",
      icon: "receipt-outline",
      color: Colors.Primary,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Event Summary KPIs</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsContainer}
      >
        {kpiCards.map((card, index) => (
          <View key={index} style={styles.kpiCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: `${card.color}15` },
                ]}
              >
                <Ionicons name={card.icon} size={18} color={card.color} />
              </View>
            </View>
            <Text style={styles.cardValue}>{card.value}</Text>
          </View>
        ))}
      </ScrollView>

      {daily && daily.length > 0 && (
        <View style={styles.dailySection}>
          <Text style={styles.dailyTitle}>Daily Breakdown</Text>
          <View style={styles.dailyContainer}>
            {daily.map((day, index) => (
              <View
                key={index}
                style={[
                  styles.dailyItem,
                  index === daily.length - 1 && styles.dailyItemLast,
                ]}
              >
                <Text style={styles.dailyDate}>{formatDate(day.date)}</Text>
                <View style={styles.dailyStats}>
                  <View style={styles.dailyStatRow}>
                    <Text style={styles.dailyStatLabel}>Attendees:</Text>
                    <Text style={styles.dailyStatValue}>
                      {day.attendees || 0}
                    </Text>
                  </View>
                  <View style={styles.dailyStatRow}>
                    <Text style={styles.dailyStatLabel}>Special Guests:</Text>
                    <Text style={styles.dailyStatValue}>
                      {day.specialGuests || 0}
                    </Text>
                  </View>
                  <View style={styles.dailyStatRow}>
                    <Text style={styles.dailyStatLabel}>Cost Saving:</Text>
                    <Text style={styles.dailyStatValue}>
                      {formatCurrency(day.costSaving)}
                    </Text>
                  </View>
                  <View style={styles.dailyStatRow}>
                    <Text style={styles.dailyStatLabel}>Transactions:</Text>
                    <Text style={styles.dailyStatValue}>
                      {day.transactions || 0}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {lastUpdated && (
        <Text style={styles.lastUpdated}>
          Last updated: {formatDate(lastUpdated)}
        </Text>
      )}
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
  cardsContainer: {
    flexDirection: "row",
    paddingHorizontal: horizontalMargin,
    gap: 12,
    marginBottom: 20,
  },
  kpiCard: {
    ...commonCardStyle,
    width: 180,
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
    borderRadius: 6,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  cardValue: {
    fontSize: 14,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
  },
  dailySection: {
    paddingHorizontal: horizontalMargin,
    marginTop: 10,
  },
  dailyTitle: {
    fontSize: 14,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 12,
  },
  dailyContainer: {
    ...commonCardStyle,
    backgroundColor: Colors.White,
    borderRadius: 12,
    padding: 16,
  },
  dailyItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
  },
  dailyItemLast: {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  dailyDate: {
    fontSize: 14,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 8,
  },
  dailyStats: {
    gap: 6,
  },
  dailyStatRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dailyStatLabel: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
  },
  dailyStatValue: {
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.PrimaryText,
  },
  lastUpdated: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    textAlign: "right",
    paddingHorizontal: horizontalMargin,
    marginTop: 8,
  },
});

export default EventSummaryKPIs;
