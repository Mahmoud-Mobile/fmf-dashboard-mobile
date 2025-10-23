import React from "react";
import { View, Text, FlatList } from "react-native";
import styles from "./Styles";

const ReturnGuests = () => {
  const returnGuests = [
    {
      id: "1",
      name: "Aisha Mohammed",
      flightNo: "EK006",
      date: "2024-01-20",
      time: "09:15",
    },
    {
      id: "2",
      name: "Khalid Al-Mansouri",
      flightNo: "QR007",
      date: "2024-01-21",
      time: "10:30",
    },
    {
      id: "3",
      name: "Nour Al-Din",
      flightNo: "SV008",
      date: "2024-01-22",
      time: "11:45",
    },
    {
      id: "4",
      name: "Yusuf Ahmed",
      flightNo: "MS009",
      date: "2024-01-23",
      time: "12:20",
    },
    {
      id: "5",
      name: "Zainab Hassan",
      flightNo: "KU010",
      date: "2024-01-24",
      time: "13:10",
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
        <Text style={styles.title}>Return Guests</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{returnGuests.length}</Text>
        </View>
      </View>

      <View style={styles.tableContainer}>
        {renderHeader()}
        <FlatList
          data={returnGuests}
          renderItem={renderGuestItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

export default ReturnGuests;
