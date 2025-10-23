import React from "react";
import { View, Text, FlatList } from "react-native";
import styles from "./Styles";

const ArrivalGuests = () => {
  const arrivalGuests = [
    {
      id: "1",
      name: "Ahmed Al-Rashid",
      flightNo: "EK001",
      date: "2024-01-15",
      time: "14:30",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      flightNo: "QR002",
      date: "2024-01-16",
      time: "15:45",
    },
    {
      id: "3",
      name: "Mohammed Hassan",
      flightNo: "SV003",
      date: "2024-01-17",
      time: "16:20",
    },
    {
      id: "4",
      name: "Fatima Al-Zahra",
      flightNo: "MS004",
      date: "2024-01-18",
      time: "17:10",
    },
    {
      id: "5",
      name: "Omar Abdullah",
      flightNo: "KU005",
      date: "2024-01-19",
      time: "18:00",
    },
  ];

  const renderGuestItem = ({ item }) => (
    <View style={styles.guestRow}>
      <View style={styles.guestNumberContainer}>
        <Text style={styles.guestNumber}>{item.flightNo}</Text>
      </View>
      <View style={styles.guestNameContainer}>
        <Text style={styles.guestName}>{item.name}</Text>
      </View>
      <View style={styles.guestDateContainer}>
        <Text style={styles.guestDate}>{item.date}</Text>
        <Text style={styles.guestTime}>{item.time}</Text>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.tableHeader}>
      <View style={styles.headerNumberContainer}>
        <Text style={styles.headerText}>Flight No</Text>
      </View>
      <View style={styles.headerNameContainer}>
        <Text style={styles.headerText}>Name</Text>
      </View>
      <View style={styles.headerDateContainer}>
        <Text style={styles.headerText}>Date & Time</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Arrival Guests</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{arrivalGuests.length}</Text>
        </View>
      </View>

      <View style={styles.tableContainer}>
        {renderHeader()}
        <FlatList
          data={arrivalGuests}
          renderItem={renderGuestItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

export default ArrivalGuests;
