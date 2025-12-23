import React, { useEffect } from "react";
import { View, ScrollView } from "react-native";
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
  const rolePermission = useSelector((state) => state.auth.user?.user);

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
        {rolePermission == "admin" && <AdminDashboard />}
        {rolePermission == "organizer" && <OrganizerDashboard />}

        {rolePermission !== "vendor" && <VendorDashboard />}
      </ScrollView>
    </View>
  );
};

export default DashboardOfferHome;
