import React from "react";
import { View, Text, FlatList } from "react-native";
import styles from "./Styles";

const TripList = () => {
  const tripList = [
    { id: "1", carName: "Toyota Camry", driver: "Ahmed Hassan" },
    { id: "2", carName: "Honda Accord", driver: "Mohammed Ali" },
    { id: "3", carName: "BMW X5", driver: "Omar Abdullah" },
    { id: "4", carName: "Mercedes E-Class", driver: "Khalid Al-Rashid" },
    { id: "5", carName: "Audi A6", driver: "Yusuf Ahmed" },
  ];

  const renderTripItem = ({ item }) => (
    <View style={styles.tripRow}>
      <View style={styles.carNameContainer}>
        <Text style={styles.carName}>{item.carName}</Text>
      </View>
      <View style={styles.driverContainer}>
        <Text style={styles.driver}>{item.driver}</Text>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.tableHeader}>
      <View style={styles.headerCarContainer}>
        <Text style={styles.headerText}>Car Name</Text>
      </View>
      <View style={styles.headerDriverContainer}>
        <Text style={styles.headerText}>Driver</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Trip List</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{tripList.length}</Text>
        </View>
      </View>

      <View style={styles.tableContainer}>
        {renderHeader()}
        <FlatList
          data={tripList}
          renderItem={renderTripItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

export default TripList;
