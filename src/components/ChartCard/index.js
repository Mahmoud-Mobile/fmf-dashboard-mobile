import React from "react";
import { View, Text, Dimensions } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import styles from "./Styles";
const ChartCard = ({
  title,
  data = [],
  colors = ["#5A57DD", "#FFAC4A", "#FAA0D6", "#C97AF2", "#A7E2F0"],
}) => {
  const { width } = Dimensions.get("window");
  const isTablet = width >= 768;

  const pieData = data.map((item, index) => ({
    value: item.value,
    color: item.color || colors[index % colors.length],
    text: String(item.value),
    label: item.label,
  }));

  const renderLegend = () => {
    return (
      <View style={styles.legendContainer}>
        {pieData.map((item, index) => (
          <View key={index} style={styles.gridItem}>
            <View
              style={[styles.legendColor, { backgroundColor: item.color }]}
            />
            <Text style={styles.legendText}>{item.label}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        isTablet
          ? { width: "31.33%", marginRight: "2%" }
          : { width: "48%", marginRight: "2%" },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chartContainer}>
        <View style={{ alignSelf: "center" }}>
          <PieChart
            data={pieData}
            radius={60}
            innerRadius={20}
            showText={false}
            textColor="#ffff"
            textSize={20}
            fontWeight="bold"
          />
        </View>

        <View style={styles.countBadge}>{renderLegend()}</View>
      </View>
    </View>
  );
};

export default ChartCard;
