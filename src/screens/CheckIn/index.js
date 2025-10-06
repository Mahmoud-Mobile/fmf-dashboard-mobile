import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Alert,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../Global/colors";
import { getGridColumns } from "../../constant";
import navigationService from "../../Global/navRef";
import CustomHeader from "../../components/CustomHeader";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import InputWithIcon from "./components/InputWithIcon";
import EventCard from "./components/EventCard";
import { styles } from "./Styles";
import { SafeAreaView } from "react-native-safe-area-context";

const mockEvents = [
  {
    id: "1",
    title: "Riyadh Season",
    subtitle: "Riyadh Season Opening Ceremony",
    location: "Saudi Arabia",
    date: "2024-10-24",
    isCheckedIn: false,
  },
  {
    id: "2",
    title: "Riyadh Season",
    subtitle: "Riyadh Season Opening Ceremony",
    location: "Saudi Arabia",
    date: "2024-10-24",
    isCheckedIn: true,
  },
  {
    id: "3",
    title: "Riyadh Season",
    subtitle: "Riyadh Season Opening Ceremony",
    location: "Saudi Arabia",
    date: "2024-10-24",
    isCheckedIn: false,
  },
  {
    id: "4",
    title: "Riyadh Season",
    subtitle: "Riyadh Season Opening Ceremony",
    location: "Saudi Arabia",
    date: "2024-10-24",
    isCheckedIn: false,
  },
];

const CheckInScreen = () => {
  const [events, setEvents] = useState(mockEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const numColumns = getGridColumns();

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleCheckIn = (id) => {
    Alert.alert(
      "Choose Scanner Type",
      "How would you like to scan the QR code?",
      [
        {
          text: "Camera Scanner",
          onPress: () => {
            console.log("Navigating to CameraQRScanner");
            if (navigationService.navigation) {
              navigationService.navigation.navigate("CameraQRScanner");
            } else {
              console.log("Navigation service not available");
              Alert.alert(
                "Navigation Error",
                "Navigation service not available"
              );
            }
          },
        },
        {
          text: "Zebra Scanner",
          onPress: () => {
            console.log("Navigating to ZebraQR");
            if (navigationService.navigation) {
              navigationService.navigation.navigate("ZebraQR");
            } else {
              console.log("Navigation service not available");
              Alert.alert(
                "Navigation Error",
                "Navigation service not available"
              );
            }
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const handlePreview = (id) => {
    const event = events.find((e) => e.id === id);
    if (event) {
      console.log("Navigating to PreviewSeats with event:", event);
      // Navigate to PreviewSeats screen with event data
      if (navigationService.navigation) {
        navigationService.navigation.navigate("PreviewSeats", {
          eventTitle: event.title,
          eventSubtitle: event.subtitle,
          location: event.location,
          date: event.date,
        });
      } else {
        console.log("Navigation service not available");
        Alert.alert("Navigation Error", "Navigation service not available");
      }
    }
  };

  const renderEventCard = ({ item }) => (
    <EventCard
      event={item}
      onCheckIn={handleCheckIn}
      onPreview={handlePreview}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={{ top: "additive" }}>
      <CustomHeader title="Check In" center={true} top={0} />

      <View style={styles.searchContainer}>
        <InputWithIcon
          onChangeText={setSearchTerm}
          icon="search"
          placeholder="Search events by title, subtitle, or location"
        />
      </View>

      {filteredEvents.length > 0 ? (
        <FlatList
          data={filteredEvents}
          renderItem={renderEventCard}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          key={numColumns}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              tintColor={Colors.Primary}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="event-busy" size={96} color={Colors.gray} />
          <Text style={styles.emptyText}>
            {searchTerm
              ? "No events found matching your search"
              : "No events available"}
          </Text>
        </View>
      )}
      <FloatingChatIcon />
    </SafeAreaView>
  );
};

export default CheckInScreen;
