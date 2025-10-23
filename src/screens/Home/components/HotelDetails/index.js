import React from "react";
import { View, Text, FlatList } from "react-native";
import styles from "./Styles";
import { Colors } from "../../../../Global/colors";

const HotelDetails = () => {
  const hotelDetails = [
    {
      id: "1",
      hotelName: "Marriott",
      guestName: "Ahmed Al-Rashid",
      status: "Checked In",
    },
    {
      id: "2",
      hotelName: "Hilton",
      guestName: "Sarah Johnson",
      status: "Checked Out",
    },
    {
      id: "3",
      hotelName: "Hyatt",
      guestName: "Mohammed Hassan",
      status: "Checked In",
    },
    {
      id: "4",
      hotelName: "Sheraton",
      guestName: "Fatima Al-Zahra",
      status: "Pending",
    },
    {
      id: "5",
      hotelName: "Ritz",
      guestName: "Omar Abdullah",
      status: "Checked In",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Checked In":
        return Colors.Success;
      case "Checked Out":
        return Colors.DarkGray;
      case "Pending":
        return Colors.Warning || "#F59E0B";
      default:
        return Colors.DarkGray;
    }
  };

  const renderHotelItem = ({ item }) => (
    <View style={styles.hotelRow}>
      <View style={styles.hotelNameContainer}>
        <Text style={styles.hotelName}>{item.hotelName}</Text>
      </View>
      <View style={styles.guestNameContainer}>
        <Text style={styles.guestName}>{item.guestName}</Text>
      </View>
      <View style={styles.statusContainer}>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.tableHeader}>
      <View style={styles.headerHotelContainer}>
        <Text style={styles.headerText}>Hotel</Text>
      </View>
      <View style={styles.headerGuestContainer}>
        <Text style={styles.headerText}>Guest</Text>
      </View>
      <View style={styles.headerStatusContainer}>
        <Text style={styles.headerText}>Status</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Hotel Details</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{hotelDetails.length}</Text>
        </View>
      </View>

      <View style={styles.tableContainer}>
        {renderHeader()}
        <FlatList
          data={hotelDetails}
          renderItem={renderHotelItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

export default HotelDetails;
