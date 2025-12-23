import React from "react";
import { View, Text } from "react-native";
import AreasOverview from "../AreasOverview";
import OverviewCards from "../OverviewCards.js";
import { styles } from "./Styles";
import dummyData from "../../../../../data/dummyData.json";

const OrganizerDashboard = () => {
  const { organizerDashboard } = dummyData;
  const overviewCards = organizerDashboard.overviewCards;
  const recentCheckIns = organizerDashboard.recentCheckIns;
  const areas = organizerDashboard.areas;

  return (
    <View style={styles.container}>
      <OverviewCards cards={overviewCards} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Check-Ins</Text>
        <View style={styles.recentCheckInsContainer}>
          {recentCheckIns.map((checkIn, index) => (
            <View
              key={index}
              style={[
                styles.checkInItem,
                index < recentCheckIns.length - 1 && styles.checkInItemBorder,
              ]}
            >
              <View style={styles.checkInLeft}>
                <Text style={styles.checkInName}>{checkIn.name}</Text>
                <Text style={styles.checkInLocation}>{checkIn.location}</Text>
              </View>
              <View style={styles.checkInRight}>
                <Text style={styles.checkInTime}>{checkIn.time}</Text>
                <Text style={styles.checkInCompanions}>
                  {checkIn.companions}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <AreasOverview areas={areas} />
    </View>
  );
};

export default OrganizerDashboard;
