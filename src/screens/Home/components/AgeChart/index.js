import React from "react";
import { View, Text, Dimensions } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import styles from "./Styles";

const AgeChart = () => {
  const { width } = Dimensions.get("window");
  const isTablet = width >= 768;

  const pieData = [
    {
      value: 45,
      color: "#880CB9",
      text: "45",
      label: "18-25",
    },
    {
      value: 60,
      color: "#368BBA",
      text: "60",
      label: "26-35",
    },
    {
      value: 35,
      color: "#10B981",
      text: "35",
      label: "36-45",
    },
    {
      value: 25,
      color: "#F59E0B",
      text: "25",
      label: "46-55",
    },
    {
      value: 15,
      color: "#EF4444",
      text: "15",
      label: "56-65",
    },
    {
      value: 8,
      color: "#8B5CF6",
      text: "8",
      label: "65+",
    },
  ];

  const renderLegend = () => (
    <View style={styles.legendContainer}>
      {pieData.map((item, index) => (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: item.color }]} />
          <Text style={styles.legendText}>{item.label}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Age Distribution</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>188</Text>
        </View>
      </View>

      <View
        style={isTablet ? styles.chartContainer : styles.chartContainerMobile}
      >
        <View style={styles.chartSection}>
          <PieChart
            data={pieData}
            radius={40}
            innerRadius={20}
            showText
            textColor="#000000"
            textSize={10}
            showTextBackground
            textBackgroundColor="#ffffff"
            textBackgroundRadius={6}
            showValuesAsLabels
            showGradient
            gradientCenterColor="#ffffff"
          />
        </View>
        <View
          style={isTablet ? styles.legendSection : styles.legendSectionMobile}
        >
          {renderLegend()}
        </View>
      </View>
    </View>
  );
};

export default AgeChart;
