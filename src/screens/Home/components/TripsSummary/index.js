import React from "react";
import { View, Text, FlatList } from "react-native";
import styles from "./Styles";

const TripsSummary = () => {
  const tripsSummary = [
    { id: "1", guestName: "Ahmed Al-Rashid", driver: "Mohammed Hassan" },
    { id: "2", guestName: "Sarah Johnson", driver: "Omar Abdullah" },
    { id: "3", guestName: "Fatima Al-Zahra", driver: "Khalid Al-Rashid" },
    { id: "4", guestName: "Yusuf Ahmed", driver: "Ahmed Hassan" },
    { id: "5", guestName: "Aisha Mohammed", driver: "Mohammed Ali" },
  ];

  const renderTripItem = ({ item }) => (
    <View style={styles.tripRow}>
      <View style={styles.guestNameContainer}>
        <Text style={styles.guestName}>{item.guestName}</Text>
      </View>
      <View style={styles.driverContainer}>
        <Text style={styles.driver}>{item.driver}</Text>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.tableHeader}>
      <View style={styles.headerGuestContainer}>
        <Text style={styles.headerText}>Guest Name</Text>
      </View>
      <View style={styles.headerDriverContainer}>
        <Text style={styles.headerText}>Driver</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Trips Summary</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{tripsSummary.length}</Text>
        </View>
      </View>

      <View style={styles.tableContainer}>
        {renderHeader()}
        <FlatList
          data={tripsSummary}
          renderItem={renderTripItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

export default TripsSummary;
