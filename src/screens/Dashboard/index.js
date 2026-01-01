import React, { useMemo, useEffect } from "react";
import {
  View,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import styles from "./Styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import DataTableCard from "../../components/DataTableCard";
import ChartCard from "../../components/ChartCard";
import { Colors } from "../../Global/colors";
import dummyData from "../../data/dummyData.json";
import DashboardOverview from "./components/DashboardOverview";
import CustomEventHeader from "../../components/CustomEventHeader";
import { fetchDashboardSummary } from "../../redux/actions/dashboardActions";

const SECTION_CONFIG = [
  { id: "dashboardOverview", label: "Dashboard Overview" },
  { id: "eventAnalytics", label: "Event Analytics" },
  { id: "arrivalGuests", label: "Arrival Guests" },
  { id: "returnGuests", label: "Return Guests" },
  { id: "flights", label: "Flights" },
  { id: "hotelOccupancy", label: "Hotel Occupancy" },
  { id: "hotelDetails", label: "Hotel Details" },
  { id: "tripList", label: "Trip List" },
  { id: "tripsSummary", label: "Trips Summary" },
];

const Dashboard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { selectedEvent } = useSelector((state) => state.api) || {};

  const storedSectionVisibility =
    useSelector((state) => state.ui?.sectionVisibility) || {};

  // Fetch dashboard summary when component mounts or event changes
  useEffect(() => {
    if (selectedEvent?.id) {
      dispatch(fetchDashboardSummary(selectedEvent.id));
    }
  }, [selectedEvent?.id, dispatch]);

  const { width } = Dimensions.get("window");
  const isTablet = width >= 768;

  const visibleSections = useMemo(() => {
    return SECTION_CONFIG.reduce((acc, section) => {
      const storedValue = storedSectionVisibility?.[section.id];
      // Convert string "true"/"false" to boolean if needed (from persisted state)
      const boolValue =
        storedValue === undefined
          ? true
          : typeof storedValue === "string"
          ? storedValue === "true"
          : Boolean(storedValue);
      acc[section.id] = boolValue;
      return acc;
    }, {});
  }, [storedSectionVisibility]);

  const handleItemPress = (item, screenName) => {
    if (screenName && navigation) {
      navigation.navigate(screenName, { item });
    }
  };

  const {
    returnGuestsData,
    arrivalGuestsData,
    flightsData,
    hotelOccupancyData,
    hotelDetailsData,
    tripListData,
    tripsSummaryData,
    arrivalGuestsChartData,
    returnGuestsChartData,
    ageDistributionChartData,
    continentChartData,
    genderDistributionChartData,
  } = dummyData;

  const renderResponsiveCards = () => {
    const cards = [
      visibleSections.arrivalGuests && {
        key: "arrival-guests",
        element: (
          <DataTableCard
            title="Arrival Guests"
            columns={[
              {
                title: "Flight No",
                key: "flightNo",
              },
              { title: "Name", key: "name" },
              {
                title: "Date & Time",
                key: "dateTime",
                render: ({ item }) => (
                  <View style={{}}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>
                ),
              },
            ]}
            data={arrivalGuestsData}
            onPress={() => navigation.navigate("MyTabs", { screen: "Flights" })}
          />
        ),
      },
      visibleSections.returnGuests && {
        key: "return-guests",
        element: (
          <DataTableCard
            title="Return Guests"
            columns={[
              {
                title: "Flight No",
                key: "flightNo",
              },
              { title: "Name", key: "name" },
              {
                title: "Date & Time",
                key: "dateTime",
                render: ({ item }) => (
                  <View style={{}}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>
                ),
              },
            ]}
            data={returnGuestsData}
            onPress={() => navigation.navigate("MyTabs", { screen: "Flights" })}
          />
        ),
      },
      visibleSections.flights && {
        key: "flights",
        element: (
          <DataTableCard
            title="Flights"
            columns={[
              {
                title: "Flight No",
                key: "flightNo",
              },
              { title: "Airline", key: "airline" },
              { title: "Destination", key: "destination" },
              {
                title: "Date & Time",
                key: "dateTime",
                render: ({ item }) => (
                  <View style={{}}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>
                ),
              },
            ]}
            data={flightsData}
            onPress={() => navigation.navigate("MyTabs", { screen: "Flights" })}
          />
        ),
      },
      visibleSections.hotelOccupancy && {
        key: "hotel-occupancy",
        element: (
          <DataTableCard
            title="Hotel Occupancy"
            columns={[
              { title: "Hotel Name", key: "hotelName" },
              {
                title: "Count",
                key: "count",
                render: ({ item }) => (
                  <View style={{}}>
                    <Text style={styles.countBadgeText}>{item.count}</Text>
                  </View>
                ),
              },
            ]}
            data={hotelOccupancyData}
            onPress={() => {}}
          />
        ),
      },
      visibleSections.hotelDetails && {
        key: "hotel-details",
        element: (
          <DataTableCard
            title="Hotel Details"
            columns={[
              { title: "Hotel", key: "hotel" },
              { title: "Guest", key: "guest" },
              {
                title: "Status",
                key: "status",
                render: ({ item }) => {
                  const getStatusColor = (status) => {
                    switch (status) {
                      case "Checked In":
                        return Colors.Success;
                      case "Checked Out":
                        return Colors.DarkGray;
                      case "Pending":
                        return Colors.Warning;
                      default:
                        return Colors.DarkGray;
                    }
                  };
                  return (
                    <Text
                      style={[
                        styles.statusText,
                        { color: getStatusColor(item.status) },
                      ]}
                    >
                      {item.status}
                    </Text>
                  );
                },
              },
            ]}
            data={hotelDetailsData}
            onPress={() => {
              navigation.navigate("Hotels");
            }}
          />
        ),
      },
      visibleSections.tripList && {
        key: "trip-list",
        element: (
          <DataTableCard
            title="Trip List"
            columns={[
              { title: "Car Name", key: "carName" },
              { title: "Driver", key: "driver" },
            ]}
            data={tripListData}
            onPress={() => navigation.navigate("MyTabs", { screen: "Trips" })}
          />
        ),
      },
      visibleSections.tripsSummary && {
        key: "trips-summary",
        element: (
          <DataTableCard
            title="Trips Summary"
            columns={[
              { title: "Guest Name", key: "guestName" },
              { title: "Driver", key: "driver" },
            ]}
            data={tripsSummaryData}
            onPress={() => navigation.navigate("MyTabs", { screen: "Trips" })}
          />
        ),
      },
    ].filter(Boolean);

    if (!cards.length) {
      return null;
    }

    const cardWidth = isTablet ? "48%" : "100%";
    const containerStyle = [
      styles.responsiveGridContainer,
      !isTablet && { justifyContent: "flex-start" },
    ];

    return (
      <View style={containerStyle}>
        {cards.map(({ key, element }) => (
          <View key={key} style={{ width: cardWidth, marginBottom: 10 }}>
            {element}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomEventHeader
        event={selectedEvent}
        onLeftButtonPress={() => navigation.goBack()}
        onRightButtonPress={() => navigation.navigate("NotificationScreen")}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {visibleSections.dashboardOverview && <DashboardOverview />}

        <View style={styles.content}>
          {visibleSections.eventAnalytics && (
            <>
              <Text style={styles.sectionTitle}>Event Analytics</Text>
              <View style={styles.chartCardsContainer}>
                <ChartCard
                  key="arrival-guests-chart"
                  title="Arrival Guests"
                  data={arrivalGuestsChartData}
                />
                <ChartCard
                  key="return-guests-chart"
                  title="Return Guests"
                  data={returnGuestsChartData}
                />
                <ChartCard
                  key="age-distribution-chart"
                  title="Age Distribution"
                  data={ageDistributionChartData}
                />
                <ChartCard
                  key="continent-chart"
                  title="Continent"
                  data={continentChartData}
                />
                <ChartCard
                  key="gender-distribution-chart"
                  title="Gender Distribution"
                  data={genderDistributionChartData}
                />
              </View>
            </>
          )}
          {renderResponsiveCards()}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("VisibilitySettings")}
          style={styles.visibleBtn}
        >
          <View style={styles.visibleContent}>
            <MaterialIcons name="tune" size={18} color={Colors.White} />
            <Text style={styles.visibleText}>Customize View</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
