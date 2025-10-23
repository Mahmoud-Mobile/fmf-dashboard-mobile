import React from "react";
import { View, Text, Dimensions } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import styles from "./Styles";

const GenderChart = () => {
  const { width } = Dimensions.get("window");
  const isTablet = width >= 768;

  const pieData = [
    {
      value: 55,
      color: "#880CB9",
      text: "55",
      label: "Male",
    },
    {
      value: 45,
      color: "#368BBA",
      text: "45",
      label: "Female",
    },
  ];

  const renderLegend = () => (
    <View style={styles.legendContainer}>
      {pieData.map((item, index) => (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: item.color }]} />
          <Text style={styles.legendValue}>{item.label}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Gender Distribution</Text>
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

export default GenderChart;
