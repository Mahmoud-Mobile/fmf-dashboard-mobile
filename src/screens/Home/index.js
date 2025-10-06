import React, { useState } from "react";
import { ScrollView, View, RefreshControl, Animated } from "react-native";
import styles from "./Styles";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingModal from "../../components/LoadingModal";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import { Colors } from "../../Global/colors";
import { LinearGradient } from "expo-linear-gradient";
import HomeHeader from "./components/HomeHeader";
import DashboardOverview from "./components/DashboardOverview";
import FlightToday from "./components/FlightToday";
import SwipeCategories from "./components/SwipeCategories";

const Home = () => {
  const navigation = useNavigation();

  const [onRefresh, setOnRefresh] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);

  const Call_RefreshControl = () => {
    setOnRefresh(false);
  };
  return (
    <LinearGradient
      colors={["#E5E5E5", Colors.WhiteColor, Colors.WhiteColor]}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <HomeHeader />
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={onRefresh}
              onRefresh={Call_RefreshControl}
            />
          }
          style={styles.scrollView}
        >
          <DashboardOverview />
          <FlightToday />
          <SwipeCategories />
        </ScrollView>
        <FloatingChatIcon />
        {showIndicator ? <LoadingModal visible={showIndicator} /> : <></>}
      </View>
    </LinearGradient>
  );
};

export default Home;
