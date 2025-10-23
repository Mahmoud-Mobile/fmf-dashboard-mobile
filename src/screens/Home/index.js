import React, { useState } from "react";
import {
  ScrollView,
  View,
  RefreshControl,
  Animated,
  Text,
  Dimensions,
} from "react-native";
import styles from "./Styles";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import LoadingModal from "../../components/LoadingModal";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import { Colors } from "../../Global/colors";
import { LinearGradient } from "expo-linear-gradient";
import EventHeader from "./components/EventHeader";
import DashboardOverview from "./components/DashboardOverview";
import FlightToday from "./components/FlightToday";
import SwipeCategories from "./components/SwipeCategories";

import ArrivalGuests from "./components/ArrivalGuests";
import ReturnGuests from "./components/ReturnGuests";
import Flight from "./components/Flight";
import ArrivalGuestChart from "./components/ArrivalGuestChart";
import ReturnGuestChart from "./components/ReturnGuestChart";
import HotelOccupancy from "./components/HotelOccupancy";
import HotelDetails from "./components/HotelDetails";
import TripList from "./components/TripList";
import TripsSummary from "./components/TripsSummary";
import AgeChart from "./components/AgeChart";
import GenderChart from "./components/GenderChart";
import ContinentChart from "./components/ContinentChart";

const Home = () => {
  const navigation = useNavigation();
  const { selectedEvent } = useSelector((state) => state.api) || {};

  const [onRefresh, setOnRefresh] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);

  const Call_RefreshControl = () => {
    setOnRefresh(false);
  };

  const { width } = Dimensions.get("window");
  const isTablet = width >= 768;

  const renderRow = (children) => {
    if (isTablet) {
      return (
        <View style={styles.rowContainer}>
          {React.Children.map(children, (child, index) => (
            <View key={index} style={styles.tabletCardWrapper}>
              {child}
            </View>
          ))}
        </View>
      );
    } else {
      return (
        <View style={styles.mobileContainer}>
          {React.Children.map(children, (child, index) => (
            <View key={index} style={styles.mobileCardWrapper}>
              {child}
            </View>
          ))}
        </View>
      );
    }
  };

  const renderGrid = (children) => {
    return (
      <View style={styles.gridContainer}>
        {React.Children.map(children, (child, index) => (
          <View
            key={index}
            style={isTablet ? styles.gridItemTablet : styles.gridItem}
          >
            {child}
          </View>
        ))}
      </View>
    );
  };
  return (
    <LinearGradient
      colors={["#E5E5E5", Colors.White, Colors.White]}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <EventHeader />
        {/* <DashboardOverview />
        <FlightToday /> */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={onRefresh}
              onRefresh={Call_RefreshControl}
            />
          }
        >
          <View style={styles.content}>
            <SwipeCategories />

            {renderRow([<ArrivalGuests />, <ReturnGuests />, <Flight />])}

            <View style={styles.sectionTitle}>
              <Text style={styles.sectionTitleText}>Event Analytics</Text>
            </View>
            {renderGrid([
              <ArrivalGuestChart />,
              <ReturnGuestChart />,
              <AgeChart />,
              <GenderChart />,
              <ContinentChart />,
            ])}

            <View style={styles.sectionTitle}>
              <Text style={styles.sectionTitleText}>Hotel Information</Text>
            </View>
            {renderRow([<HotelOccupancy />, <HotelDetails />])}

            <View style={styles.sectionTitle}>
              <Text style={styles.sectionTitleText}>Trips Information</Text>
            </View>
            {renderRow([<TripList />, <TripsSummary />])}
          </View>
        </ScrollView>

        <FloatingChatIcon />
        {showIndicator ? <LoadingModal visible={showIndicator} /> : <></>}
      </View>
    </LinearGradient>
  );
};

export default Home;
