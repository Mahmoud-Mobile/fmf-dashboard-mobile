import React from "react";
import { View, Dimensions, ScrollView, Text } from "react-native";
import styles from "./Styles";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import EventHeader from "./components/EventHeader";
import DataTableCard from "../../components/DataTableCard";
import ChartCard from "../../components/ChartCard";
import { Colors } from "../../Global/colors";
import dummyData from "../../data/dummyData.json";
import DashboardOverview from "./components/DashboardOverview";

const Home = () => {
  const navigation = useNavigation();
  const { selectedEvent } = useSelector((state) => state.api) || {};

  const { width } = Dimensions.get("window");
  const isTablet = width >= 768;

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

  const renderResponsiveCards = (cards, tabletColumns = 2) => {
    if (isTablet) {
      const widthPercentage = tabletColumns === 2 ? "48%" : "32%";
      return (
        <View style={styles.responsiveGridContainer}>
          {cards.map((card, index) => (
            <View
              key={index}
              style={{ width: widthPercentage, marginBottom: 10 }}
            >
              {card}
            </View>
          ))}
        </View>
      );
    } else {
      return (
        <View style={{}}>
          {cards.map((card, index) => (
            <View key={index} style={{ width: "100%" }}>
              {card}
            </View>
          ))}
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <EventHeader />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <DashboardOverview />

        <View style={styles.content}>
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
          {renderResponsiveCards(
            [
              <DataTableCard
                key="arrival-guests"
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
              />,
              <DataTableCard
                key="return-guests"
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
              />,
            ],
            2
          )}
          {renderResponsiveCards(
            [
              <DataTableCard
                key="flights"
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
              />,
              <DataTableCard
                key="hotel-occupancy"
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
              />,
            ],
            2
          )}
          {renderResponsiveCards(
            [
              <DataTableCard
                key="hotel-details"
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
              />,
              <DataTableCard
                key="trip-list"
                title="Trip List"
                columns={[
                  { title: "Car Name", key: "carName" },
                  { title: "Driver", key: "driver" },
                ]}
                data={tripListData}
              />,
            ],
            2
          )}
          {renderResponsiveCards(
            [
              <DataTableCard
                key="trips-summary"
                title="Trips Summary"
                columns={[
                  { title: "Guest Name", key: "guestName" },
                  { title: "Driver", key: "driver" },
                ]}
                data={tripsSummaryData}
              />,
            ],
            2
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
