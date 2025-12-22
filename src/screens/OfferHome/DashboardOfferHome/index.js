import React from "react";
import { View, ScrollView } from "react-native";
import { styles } from "./Styles";
import CustomEventHeader from "../../../components/CustomEventHeader";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import OverviewCards from "./components/OverviewCards";
import VendorPerformance from "./components/VendorPerformance";

const DashboardOfferHome = () => {
  const navigation = useNavigation();
  const { selectedEvent } = useSelector((state) => state.api);

  return (
    <View style={styles.container}>
      <CustomEventHeader
        event={selectedEvent}
        onLeftButtonPress={() => navigation.goBack()}
        onRightButtonPress={() => navigation.navigate("NotificationScreen")}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <OverviewCards />
        <VendorPerformance />
      </ScrollView>
    </View>
  );
};

export default DashboardOfferHome;
