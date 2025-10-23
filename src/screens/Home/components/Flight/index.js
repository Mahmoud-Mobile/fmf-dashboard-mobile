import React from "react";
import { View, Text, FlatList } from "react-native";
import styles from "./Styles";

const Flight = () => {
  const flights = [
    {
      id: "1",
      flightNumber: "EK123",
      destination: "Dubai",
      date: "2024-01-15",
    },
    { id: "2", flightNumber: "QR456", destination: "Doha", date: "2024-01-16" },
    {
      id: "3",
      flightNumber: "SV789",
      destination: "Riyadh",
      date: "2024-01-17",
    },
    {
      id: "4",
      flightNumber: "MS012",
      destination: "Cairo",
      date: "2024-01-18",
    },
    {
      id: "5",
      flightNumber: "KU345",
      destination: "Kuwait",
      date: "2024-01-19",
    },
  ];

  const renderFlightItem = ({ item }) => (
    <View style={styles.flightRow}>
      <View style={styles.flightNumberContainer}>
        <Text style={styles.flightNumber}>{item.flightNumber}</Text>
      </View>
      <View style={styles.destinationContainer}>
        <Text style={styles.destination}>{item.destination}</Text>
      </View>
      <View style={styles.flightDateContainer}>
        <Text style={styles.flightDate}>{item.date}</Text>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.tableHeader}>
      <View style={styles.headerFlightContainer}>
        <Text style={styles.headerText}>Flight</Text>
      </View>
      <View style={styles.headerDestinationContainer}>
        <Text style={styles.headerText}>Destination</Text>
      </View>
      <View style={styles.headerDateContainer}>
        <Text style={styles.headerText}>Date</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Flights</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{flights.length}</Text>
        </View>
      </View>

      <View style={styles.tableContainer}>
        {renderHeader()}
        <FlatList
          data={flights}
          renderItem={renderFlightItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

export default Flight;
