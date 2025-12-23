import React, { useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import { styles } from "./Styles";
import CustomEventHeader from "../../../components/CustomEventHeader";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AdminDashboard from "./components/AdminDashboard";
import OrganizerDashboard from "./components/OrganizerDashboard";
import VendorDashboard from "./components/VendorDashboard";

const DashboardOfferHome = () => {
  const navigation = useNavigation();
  const { selectedEvent } = useSelector((state) => state.api);
  const loginResponse = useSelector((state) => state.auth.user);

  const userRole = loginResponse?.user?.role;

  useEffect(() => {
    if (loginResponse) {
      console.log("Login response:", loginResponse?.user);
    }
  }, [loginResponse]);

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
        {userRole !== "admin" && <AdminDashboard />}
        {userRole === "organizer" && <OrganizerDashboard />}

        {userRole === "vendor" && <VendorDashboard />}
      </ScrollView>
    </View>
  );
};

export default DashboardOfferHome;
