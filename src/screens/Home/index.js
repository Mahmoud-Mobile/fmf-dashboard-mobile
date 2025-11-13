import React, { useMemo } from "react";
import { View, Dimensions, ScrollView, Text } from "react-native";
import styles from "./Styles";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import DataTableCard from "../../components/DataTableCard";
import ChartCard from "../../components/ChartCard";
import SectionVisibilityToggle from "../../components/SectionVisibilityToggle";
import { Colors } from "../../Global/colors";
import dummyData from "../../data/dummyData.json";
import DashboardOverview from "./components/DashboardOverview";
import { toggleSectionVisibility } from "../../redux/reducers/uiReducer";
import CustomEventHeader from "../../components/CustomEventHeader";

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

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { selectedEvent } = useSelector((state) => state.api) || {};

  const storedSectionVisibility =
    useSelector((state) => state.ui?.sectionVisibility) || {};

  const { width } = Dimensions.get("window");
  const isTablet = width >= 768;

  const visibleSections = useMemo(() => {
    return SECTION_CONFIG.reduce((acc, section) => {
      const storedValue = storedSectionVisibility?.[section.id];
      acc[section.id] = storedValue === undefined ? true : storedValue;
      return acc;
    }, {});
  }, [storedSectionVisibility]);

  const handleItemPress = (item, screenName) => {
    if (screenName && navigation) {
      navigation.navigate(screenName, { item });
    }
  };

  const handleToggleSectionVisibility = (sectionId) => {
    dispatch(toggleSectionVisibility(sectionId));
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
            onItemPress={handleItemPress}
            navigationName="FlightDetails"
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
      </ScrollView>
      <SectionVisibilityToggle
        sections={SECTION_CONFIG}
        visibleSections={visibleSections}
        onToggleSection={handleToggleSectionVisibility}
        label="Show / Hide Sections"
      />
    </View>
  );
};

export default Home;
