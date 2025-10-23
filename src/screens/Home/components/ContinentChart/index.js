import React from "react";
import { View, Text, Dimensions } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import styles from "./Styles";

const ContinentChart = () => {
  const { width } = Dimensions.get("window");
  const isTablet = width >= 768;

  const pieData = [
    {
      value: 45,
      color: "#880CB9",
      text: "45",
      label: "Asia",
    },
    {
      value: 35,
      color: "#368BBA",
      text: "35",
      label: "Europe",
    },
    {
      value: 25,
      color: "#10B981",
      text: "25",
      label: "Africa",
    },
    {
      value: 20,
      color: "#F59E0B",
      text: "20",
      label: "Americas",
    },
    {
      value: 15,
      color: "#EF4444",
      text: "15",
      label: "Oceania",
    },
  ];

  const renderLegend = () => {
    const firstThreeItems = pieData.slice(0, 3);
    const remainingItems = pieData.slice(3);

    return (
      <View style={styles.legendContainer}>
        <View style={styles.firstRow}>
          {firstThreeItems.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: item.color }]}
              />
              <Text style={styles.legendText}>{item.label}</Text>
            </View>
          ))}
        </View>

        {remainingItems.length > 0 && (
          <View style={styles.gridContainer}>
            {remainingItems.map((item, index) => (
              <View key={index + 3} style={styles.gridItem}>
                <View
                  style={[styles.legendColor, { backgroundColor: item.color }]}
                />
                <Text style={styles.legendText}>{item.label}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Continent</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>140</Text>
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

export default ContinentChart;
