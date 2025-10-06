import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Fonts } from "../../Global/fonts";
import GuestCard from "../../components/GuestCard";
import { fetchGuests } from "../../redux/actions/api";
import LoadingModal from "../../components/LoadingModal";
import { useNavigation } from "@react-navigation/native";
import SearchComponent from "../../components/SearchComponent";

const { width } = Dimensions.get("window");
const isTablet = width > 768;

const MinistryFlights = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { guests, loading, error } = useSelector((state) => state.api);
  const [searchQuery, setSearchQuery] = React.useState("");

  useEffect(() => {
    // Fetch guests data when component mounts
    dispatch(fetchGuests());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
    }
  }, [error]);

  const handleGuestPress = (guest) => {
    console.log("Guest pressed:", guest);
    // Navigate to guest details screen
    navigation.navigate("GuestDetails", { guest });
  };

  const renderGuestCardRow = ({ item }) => {
    if (isTablet) {
      // For tablets, show 2 cards per row
      return (
        <View style={styles.cardRow}>
          {item.map((guest, index) => (
            <GuestCard
              key={guest.id || index}
              guest={guest}
              onPress={handleGuestPress}
            />
          ))}
        </View>
      );
    } else {
      // For phones, show 1 card per row
      return <GuestCard guest={item} onPress={handleGuestPress} />;
    }
  };

  const filterGuests = () => {
    return guests.filter((guest) => {
      // First filter by ministry/government status
      const orgType = guest.organizationType?.toLowerCase() || "";
      const type = guest.type?.toLowerCase() || "";
      const position = guest.position?.toLowerCase() || "";

      const isMinistryGuest =
        orgType.includes("ministries") ||
        orgType.includes("government") ||
        type.includes("official") ||
        type.includes("ministry") ||
        position.includes("minister") ||
        position.includes("government");

      // Then filter by search query
      if (!searchQuery.trim()) return isMinistryGuest;

      const query = searchQuery.toLowerCase();
      const name = `${guest.firstName} ${guest.familyName}`.toLowerCase();
      const email = guest.email?.toLowerCase() || "";
      const flightNumber = guest.arrivalFlightNumber?.toLowerCase() || "";

      return (
        isMinistryGuest &&
        (name.includes(query) ||
          email.includes(query) ||
          flightNumber.includes(query))
      );
    });
  };

  const prepareDataForRender = () => {
    const filteredGuests = filterGuests();

    if (isTablet) {
      // Group guests into pairs for tablet display
      const rows = [];
      for (let i = 0; i < filteredGuests.length; i += 2) {
        const row = filteredGuests.slice(i, i + 2);
        rows.push(row);
      }
      return rows;
    } else {
      // For phones, return filtered guests directly
      return filteredGuests;
    }
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No ministry guests found</Text>
      <Text style={styles.emptySubtext}>
        Pull to refresh to load guests data
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchComponent
          placeholder="Search by name, email, or flight number..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={prepareDataForRender()}
        renderItem={renderGuestCardRow}
        keyExtractor={(item, index) => {
          if (isTablet) {
            return `row-${index}`;
          } else {
            return item.id?.toString() || index.toString();
          }
        }}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
        refreshing={loading}
        onRefresh={() => dispatch(fetchGuests())}
      />

      <LoadingModal visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  searchContainer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  listContainer: {
    padding: 8,
    flexGrow: 1,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: Fonts.FONT_MEDIUM,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: "#9CA3AF",
    textAlign: "center",
  },
});

export default MinistryFlights;
