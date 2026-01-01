import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";
import { horizontalMargin } from "../../../config/metrics";

const DashboardOverview = () => {
  const { summary, loading } = useSelector((state) => state.dashboard) || {};

  const dashboardData = useMemo(() => {
    if (!summary) return [];

    const { participants, flights, accommodation, transport } = summary;

    return [
      {
        id: 1,
        title: "Participants",
        count: participants?.total || 0,
        icon: "account-group",
        subMetrics: [
          {
            label: "Confirmed",
            value: participants?.confirmed || 0,
            color: Colors.Success,
          },
          {
            label: "Checked In",
            value: participants?.checkedIn || 0,
            color: Colors.Primary,
          },
          {
            label: "Pending",
            value: participants?.pending || 0,
            color: Colors.Warning,
          },
        ],
      },
      {
        id: 2,
        title: "Flights",
        count: flights?.todayTotal || 0,
        icon: "airplane",
        subMetrics: [
          {
            label: "Arrivals",
            value: flights?.arrivals || 0,
            color: Colors.Success,
          },
          {
            label: "Departures",
            value: flights?.departures || 0,
            color: Colors.Primary,
          },
          {
            label: "Delayed",
            value: flights?.delayed || 0,
            color: Colors.Error,
          },
          {
            label: "Arrived",
            value: flights?.arrived || 0,
            color: Colors.Success,
          },
        ],
      },
      {
        id: 3,
        title: "Accommodation",
        count: accommodation?.total || 0,
        icon: "office-building",
        subMetrics: [
          {
            label: "Checked In",
            value: accommodation?.checkedIn || 0,
            color: Colors.Success,
          },
          {
            label: "Pending Check-in",
            value: accommodation?.pendingCheckIn || 0,
            color: Colors.Warning,
          },
          {
            label: "Checked Out",
            value: accommodation?.checkedOut || 0,
            color: Colors.DarkGray,
          },
        ],
      },
      {
        id: 4,
        title: "Transport",
        count: transport?.todayTotal || 0,
        icon: "car",
        subMetrics: [
          {
            label: "Scheduled",
            value: transport?.scheduled || 0,
            color: Colors.Primary,
          },
          {
            label: "In Progress",
            value: transport?.inProgress || 0,
            color: Colors.Warning,
          },
          {
            label: "Completed",
            value: transport?.completed || 0,
            color: Colors.Success,
          },
        ],
      },
    ];
  }, [summary]);

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

  if (loading && !summary) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={Colors.Primary} />
      </View>
    );
  }

  if (!summary || dashboardData.length === 0) {
    return null;
  }

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
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
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
    fontSize: 24,
    color: Colors.PrimaryText,
    fontFamily: Fonts.FONT_BOLD,
    marginVertical: 8,
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
