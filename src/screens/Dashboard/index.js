import React, { useMemo, useRef, useEffect } from "react";
import {
  View,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Alert } from "react-native";
import styles from "./Styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import DataTableCard from "../../components/DataTableCard";
import ChartCard from "../../components/ChartCard";
import { Colors } from "../../Global/colors";
import dummyData from "../../data/dummyData.json";
import DashboardOverview from "./components/DashboardOverview";
import {
  toggleSectionVisibility,
  toggleTabVisibility,
} from "../../redux/reducers/uiReducer";
import CustomEventHeader from "../../components/CustomEventHeader";
import BottomSheet from "../../components/BottomSheet";

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
  const bottomSheetRef = useRef(null);

  const storedSectionVisibility =
    useSelector((state) => state.ui?.sectionVisibility) || {};
  const storedTabVisibility =
    useSelector((state) => state.ui?.tabVisibility) || {};

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

  const handleToggleSectionVisibility = (sectionId) => {
    dispatch(toggleSectionVisibility(sectionId));
  };

  const TABS_CONFIG = [
    { id: "Dashboard", label: "Dashboard", locked: true },
    { id: "Flights", label: "Flights" },
    { id: "CheckIn", label: "Check In" },
    { id: "Trips", label: "Trips" },
    { id: "DesignatedCars", label: "Designated Cars" },
    { id: "Hotels", label: "Hotels" },
    { id: "More", label: "More", locked: true },
  ];

  // Default visible tabs on first app open (no persisted state yet)
  const DEFAULT_TAB_VISIBILITY = {
    Dashboard: true,
    More: true,
    Flights: true,
    CheckIn: true,
    Trips: true,
    DesignatedCars: false,
    Hotels: false,
  };

  const resolvedTabVisibility = useMemo(() => {
    return TABS_CONFIG.reduce((acc, tab) => {
      const storedValue = storedTabVisibility?.[tab.id];
      // Convert string "true"/"false" to boolean if needed (from persisted state)
      const boolValue =
        storedValue === undefined
          ? DEFAULT_TAB_VISIBILITY[tab.id] ?? true
          : typeof storedValue === "string"
          ? storedValue === "true"
          : Boolean(storedValue);
      acc[tab.id] = boolValue;
      return acc;
    }, {});
  }, [storedTabVisibility]);

  // Keep latest visibility snapshot to avoid stale closures during rapid toggles
  const latestTabVisibilityRef = useRef(resolvedTabVisibility);
  useEffect(() => {
    latestTabVisibilityRef.current = resolvedTabVisibility;
  }, [resolvedTabVisibility]);

  const handleToggleTabVisibility = (tabId) => {
    const MAX_VISIBLE_TABS = 5;
    const snapshot = latestTabVisibilityRef.current || {};
    const currentIsVisible = !!snapshot[tabId];
    const currentVisibleCount = Object.values(snapshot).filter(Boolean).length;

    // If attempting to enable another tab beyond the max, show alert and do nothing
    if (!currentIsVisible && currentVisibleCount >= MAX_VISIBLE_TABS) {
      Alert.alert(
        "Limit reached",
        `You can select up to ${MAX_VISIBLE_TABS} tabs.`
      );
      return;
    }

    dispatch(toggleTabVisibility(tabId));
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
            onPress={() => {}}
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
          onPress={() => bottomSheetRef.current?.open()}
          style={styles.visibleBtn}
        >
          <View style={styles.visibleContent}>
            <MaterialIcons name="tune" size={18} color={Colors.White} />
            <Text style={styles.visibleText}>Customize View</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <BottomSheet ref={bottomSheetRef} title="Visibility Settings">
        <View style={styles.bottomSheetContent}>
          <View>
            <Text style={styles.bottomSheetTitle}>Sections</Text>
            {SECTION_CONFIG.map((section) => (
              <View
                key={section.id}
                style={[styles.visibilityRow, styles.sectionRow]}
              >
                <Text style={styles.visibilityLabel}>{section.label}</Text>
                <Switch
                  value={visibleSections[section.id]}
                  onValueChange={() =>
                    handleToggleSectionVisibility(section.id)
                  }
                  trackColor={{
                    false: Colors.LightGray,
                    true: Colors.Primary,
                  }}
                  thumbColor={Colors.White}
                />
              </View>
            ))}
          </View>
          <View>
            <Text style={styles.bottomSheetTitle}>Tabs</Text>
            {TABS_CONFIG.map((tab) => (
              <View key={tab.id} style={[styles.visibilityRow, styles.tabRow]}>
                <Text style={styles.visibilityLabel}>{tab.label}</Text>
                <Switch
                  value={tab.locked ? true : resolvedTabVisibility[tab.id]}
                  onValueChange={() =>
                    !tab.locked && handleToggleTabVisibility(tab.id)
                  }
                  disabled={!!tab.locked}
                  trackColor={{
                    false: Colors.LightGray,
                    true: Colors.Primary,
                  }}
                  thumbColor={Colors.White}
                />
              </View>
            ))}
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default Dashboard;
