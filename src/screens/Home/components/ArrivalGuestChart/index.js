import React from "react";
import { View, Text, Dimensions } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { isMobile } from "../../../../constant/deviceUtils";
import styles from "./Styles";

const ArrivalGuestChart = () => {
  const { width } = Dimensions.get("window");
  const isTablet = width >= 768;

  const pieData = [
    {
      value: 45,
      color: "#880CB9",
      text: "45",
      label: "Arrival",
    },
    {
      value: 30,
      color: "#368BBA",
      text: "30",
      label: "Waiting",
    },
    {
      value: 25,
      color: "#10B981",
      text: "25",
      label: "Upcoming",
    },
    {
      value: 20,
      color: "#F59E0B",
      text: "20",
      label: "Delayed",
    },
    {
      value: 15,
      color: "#EF4444",
      text: "15",
      label: "Cancelled",
    },
  ];

  const renderLegend = () => {
    const isMobileDevice = isMobile();

    if (isMobileDevice) {
      // Mobile: Show 2 items per row in grid
      return (
        <View style={styles.legendContainer}>
          <View style={styles.gridContainer}>
            {pieData.map((item, index) => (
              <View key={index} style={styles.gridItem}>
                <View
                  style={[styles.legendColor, { backgroundColor: item.color }]}
                />
                <Text style={styles.legendText}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
      );
    } else {
      // Tablet: Show 3 in first row, 2 in second row
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
                <Text style={styles.legendValue}>{item.label}</Text>
              </View>
            ))}
          </View>

          {remainingItems.length > 0 && (
            <View style={styles.secondRow}>
              {remainingItems.map((item, index) => (
                <View key={index + 3} style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendColor,
                      { backgroundColor: item.color },
                    ]}
                  />
                  <Text style={styles.legendText}>{item.label}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Arrival Guests</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>100</Text>
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

export default ArrivalGuestChart;
