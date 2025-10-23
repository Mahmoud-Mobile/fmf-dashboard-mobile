import React from "react";
import { View, Text, FlatList } from "react-native";
import styles from "./Styles";

const HotelOccupancy = () => {
  const hotelOccupancy = [
    { id: "1", hotelName: "Marriott Hotel", count: "85 from 100" },
    { id: "2", hotelName: "Hilton Resort", count: "92 from 100" },
    { id: "3", hotelName: "Hyatt Palace", count: "78 from 100" },
    { id: "4", hotelName: "Sheraton Grand", count: "88 from 100" },
    { id: "5", hotelName: "Ritz Carlton", count: "95 from 100" },
  ];

  const renderHotelItem = ({ item }) => (
    <View style={styles.hotelRow}>
      <View style={styles.hotelNameContainer}>
        <Text style={styles.hotelName}>{item.hotelName}</Text>
      </View>
      <View style={styles.countContainer}>
        <Text style={styles.count}>{item.count}</Text>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.tableHeader}>
      <View style={styles.headerHotelContainer}>
        <Text style={styles.headerText}>Hotel Name</Text>
      </View>
      <View style={styles.headerCountContainer}>
        <Text style={styles.headerText}>Count</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Hotel Occupancy</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{hotelOccupancy.length}</Text>
        </View>
      </View>

      <View style={styles.tableContainer}>
        {renderHeader()}
        <FlatList
          data={hotelOccupancy}
          renderItem={renderHotelItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

export default HotelOccupancy;
