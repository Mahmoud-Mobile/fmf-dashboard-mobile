import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";

const DashboardOverview = () => {
  const dashboardData = [
    {
      id: 1,
      title: "Arrivals Today",
      count: 24,
      icon: "✈️",
      color: "#3B82F6",
    },
    {
      id: 2,
      title: "Flights Today",
      count: 18,
      icon: "🛫",
      color: "#10B981",
    },
    {
      id: 3,
      title: "Departures",
      count: 12,
      icon: "🛬",
      color: "#F59E0B",
    },
    {
      id: 4,
      title: "Active Trips",
      count: 8,
      icon: "🚗",
      color: "#EF4444",
    },
  ];

  const MetricCard = ({ item }) => (
    <TouchableOpacity style={styles.cardWrapper}>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <View
              style={[
                styles.iconBackground,
                { backgroundColor: `${item.color}15` },
              ]}
            >
              <Text style={styles.icon}>{item.icon}</Text>
            </View>
          </View>

          <View style={styles.countContainer}>
            <Text style={styles.count}>{item.count}</Text>
          </View>

          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>Dashboard Overview</Text>
        <Text style={styles.subtitle}>Real-time operational metrics</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {dashboardData.map((item) => (
          <MetricCard key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.BlackColor,
    fontFamily: Fonts.FONT_BOLD,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gray,
    fontFamily: Fonts.FONT_REGULAR,
    opacity: 0.8,
  },
  scrollContainer: {
    paddingRight: 16,
  },
  cardWrapper: {
    marginRight: 16,
  },
  card: {
    backgroundColor: Colors.WhiteColor,
    borderRadius: 20,
    padding: 22,
    width: 160,
    minHeight: 120,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 1,
    elevation: 4,
    marginVertical: 2,
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  iconBackground: {
    borderRadius: 12,
    padding: 12,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 24,
  },
  countContainer: {
    alignItems: "center",
    marginBottom: 8,
  },
  count: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.BlackColor,
    fontFamily: Fonts.FONT_BOLD,
    textAlign: "center",
  },
  title: {
    fontSize: 13,
    color: Colors.gray,
    fontFamily: Fonts.FONT_MEDIUM,
    fontWeight: "500",
    lineHeight: 16,
    textAlign: "center",
  },
});

export default DashboardOverview;
