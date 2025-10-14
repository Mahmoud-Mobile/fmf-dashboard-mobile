import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";
import { useNavigation } from "@react-navigation/native";
const FlightToday = () => {
  const navigation = useNavigation();
  const flightData = [
    {
      id: 1,
      flightNumber: "FMF001",
      destination: "Dubai International",
      code: "DXB",
      time: "14:30",
      status: "On Time",
      gate: "Gate A12",
      type: "Arrival",
      statusColor: "#10B981",
      terminal: "Terminal 1",
      airline: "Emirates",
      icon: "✈️",
    },
    {
      id: 2,
      flightNumber: "FMF002",
      destination: "London Heathrow",
      code: "LHR",
      time: "16:45",
      status: "Delayed",
      gate: "Gate B8",
      type: "Departure",
      statusColor: "#F59E0B",
      terminal: "Terminal 2",
      airline: "British Airways",
      icon: "🛫",
    },
    {
      id: 3,
      flightNumber: "FMF003",
      destination: "New York JFK",
      code: "JFK",
      time: "18:20",
      status: "On Time",
      gate: "Gate C15",
      type: "Arrival",
      statusColor: "#10B981",
      terminal: "Terminal 3",
      airline: "Delta",
      icon: "🛬",
    },
    {
      id: 4,
      flightNumber: "FMF004",
      destination: "Paris Charles de Gaulle",
      code: "CDG",
      time: "20:15",
      status: "Boarding",
      gate: "Gate D22",
      type: "Departure",
      statusColor: "#8B5CF6",
      terminal: "Terminal 1",
      airline: "Air France",
      icon: "✈️",
    },
  ];

  const FlightCard = ({ flight }) => (
    <TouchableOpacity style={styles.flightCardWrapper}>
      <View style={styles.flightCard}>
        <View style={styles.flightHeader}>
          <View style={styles.flightIconContainer}>
            <Text style={styles.flightIcon}>{flight.icon}</Text>
          </View>
          <View style={styles.flightInfo}>
            <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
            <Text style={styles.airline}>{flight.airline}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>{flight.time}</Text>
          </View>
        </View>

        <View style={styles.destinationRow}>
          <Text style={styles.destination}>{flight.destination}</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.code}>{flight.code}</Text>
          </View>
        </View>

        <View style={styles.statusRow}>
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: flight.statusColor },
              ]}
            />
            <Text style={styles.statusText}>{flight.status}</Text>
          </View>
          <View
            style={[
              styles.typeBadge,
              {
                backgroundColor:
                  flight.type === "Arrival" ? "#10B981" : "#F59E0B",
              },
            ]}
          >
            <Text style={styles.typeText}>{flight.type}</Text>
          </View>
        </View>

        <View style={styles.detailsRow}>
          <Text style={styles.gateText}>{flight.gate}</Text>
          <Text style={styles.terminalText}>{flight.terminal}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.sectionTitle}>Live Flights</Text>
          <Text style={styles.subtitle}>Real-time flight tracking</Text>
        </View>
        <TouchableOpacity
          style={styles.seeAllButton}
          onPress={() => navigation.navigate("Flights")}
        >
          <Text style={styles.seeAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {flightData.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.Black,
    fontFamily: Fonts.FONT_BOLD,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gray,
    fontFamily: Fonts.FONT_REGULAR,
    opacity: 0.8,
  },
  seeAllButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.Primary,
    shadowColor: Colors.Primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  seeAllText: {
    fontSize: 12,
    color: Colors.White,
    fontFamily: Fonts.FONT_MEDIUM,
    fontWeight: "600",
  },
  scrollContainer: {
    paddingRight: 16,
  },
  flightCardWrapper: {
    marginRight: 16,
  },
  flightCard: {
    backgroundColor: Colors.White,
    borderRadius: 20,
    padding: 22,
    width: 280,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 1,
    elevation: 4,
    marginVertical: 2,
  },
  flightHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  flightIconContainer: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 8,
    marginRight: 12,
  },
  flightIcon: {
    fontSize: 20,
  },
  flightInfo: {
    flex: 1,
  },
  flightNumber: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.Black,
    fontFamily: Fonts.FONT_BOLD,
    marginBottom: 2,
  },
  airline: {
    fontSize: 12,
    color: Colors.gray,
    fontFamily: Fonts.FONT_REGULAR,
  },
  timeContainer: {
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  time: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.Black,
    fontFamily: Fonts.FONT_MEDIUM,
  },
  destinationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  destination: {
    fontSize: 14,
    color: Colors.Black,
    fontFamily: Fonts.FONT_MEDIUM,
    fontWeight: "500",
    flex: 1,
    marginRight: 12,
  },
  codeContainer: {
    backgroundColor: "#F3F4F6",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  code: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.Black,
    fontFamily: Fonts.FONT_MEDIUM,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.Black,
    fontFamily: Fonts.FONT_MEDIUM,
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "white",
    fontFamily: Fonts.FONT_MEDIUM,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gateText: {
    fontSize: 12,
    color: Colors.gray,
    fontFamily: Fonts.FONT_REGULAR,
  },
  terminalText: {
    fontSize: 12,
    color: Colors.gray,
    fontFamily: Fonts.FONT_REGULAR,
  },
});

export default FlightToday;
