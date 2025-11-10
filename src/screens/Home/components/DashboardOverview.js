import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";
import { horizontalMargin } from "../../../config/metrics";

const DashboardOverview = () => {
  const dashboardData = [
    {
      id: 1,
      title: "Total Flights",
      count: 12,
      icon: "airplane",
      subMetrics: [
        { label: "Delayed", value: 4, color: Colors.Error },
        { label: "Arrived", value: 6, color: Colors.Success },
      ],
    },
    {
      id: 2,
      title: "Active Staff",
      count: 20,
      icon: "account-group",
      subMetrics: [
        { label: "Completed Tasks", value: 13, color: Colors.Success },
        { label: "Pending Tasks", value: 7, color: Colors.Error },
      ],
    },
    {
      id: 3,
      title: "Active Trips",
      count: 7,
      icon: "car",
      subMetrics: [
        { label: "completed", value: 3, color: Colors.Success },
        { label: "Ongoing", value: 4, color: Colors.Error },
      ],
    },
    {
      id: 4,
      title: "Hotel Occupancy",
      count: 620,
      icon: "office-building",
      subMetrics: [
        { label: "Check-in", value: 360, color: Colors.Success },
        { label: "Pending", value: 260, color: Colors.Error },
      ],
    },
  ];

  const MetricCard = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={item.icon}
              size={16}
              color={Colors.Primary}
            />
          </View>
        </View>

        <Text style={styles.count}>{item.count}</Text>
        <View style={{ marginTop: 5 }}>
          {item.subMetrics.map((metric, index) => (
            <View key={index} style={styles.subMetric}>
              <View style={[styles.dot, { backgroundColor: metric.color }]} />
              <Text style={styles.subMetricText}>
                {metric.label}: {metric.value}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dashboardData}
        renderItem={({ item }) => <MetricCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  listContent: {
    paddingHorizontal: horizontalMargin,
  },
  separator: {
    width: 12,
  },
  card: {
    backgroundColor: Colors.White,
    borderRadius: 12,
    padding: 16,
    width: 210,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  iconContainer: {
    backgroundColor: "#EFF6FF",
    borderRadius: 6,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 12,
    color: Colors.SecondaryText,
    fontFamily: Fonts.FONT_REGULAR,
  },
  count: {
    fontSize: 36,
    color: Colors.PrimaryText,
    fontFamily: Fonts.FONT_BOLD,
    marginVertical: 16,
  },
  subMetric: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  subMetricText: {
    fontSize: 12,
    color: Colors.Black,
    fontFamily: Fonts.FONT_REGULAR,
  },
});

export default DashboardOverview;
