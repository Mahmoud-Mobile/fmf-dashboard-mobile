import React, { useEffect, useState, useRef } from "react";
import { View, ScrollView } from "react-native";
import { Storage } from "expo-storage";
import { styles } from "./Styles";
import CustomEventHeader from "../../components/CustomEventHeader";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import AdminDashboard from "./components/AdminDashboard";
import EventSummaryKPIs from "./components/EventSummaryKPIs";
import AppDownloader from "./components/AppDownloader";
import { logExhibitorDashboardEndpoint } from "../../redux/actions/api";
import { fetchEventSummaryKPIs } from "../../redux/actions/dashboardActions";

const DashboardOfferHome = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { selectedEvent } = useSelector((state) => state.api);
  const exhibitorId = useSelector((state) => state.auth.exhibitorId);
  const exhibitor = useSelector((state) => state.auth.exhibitor);
  const exhibitorDashboard = useSelector(
    (state) => state.api.exhibitorDashboard
  );
  const eventSummaryKPIs = useSelector(
    (state) => state.dashboard.eventSummaryKPIs
  );
  const [currentEnvironment, setCurrentEnvironment] = useState("fmf");
  const hasCalledApi = useRef(false);

  useEffect(() => {
    const loadEnvironment = async () => {
      try {
        const selectedCategory = await Storage.getItem({
          key: "selected-category",
        });
        setCurrentEnvironment(selectedCategory || "fmf");
      } catch (error) {
        setCurrentEnvironment("fmf");
      }
    };
    loadEnvironment();
  }, []);

  useEffect(() => {
    if (
      !hasCalledApi.current &&
      selectedEvent?.id &&
      currentEnvironment === "offerHome"
    ) {
      const eventId = selectedEvent.id;
      const currentExhibitorId =
        exhibitorId?.[0] || exhibitor?.id || exhibitorId;

      if (currentExhibitorId) {
        hasCalledApi.current = true;
        dispatch(logExhibitorDashboardEndpoint(eventId, currentExhibitorId));
      }
    }
  }, [selectedEvent?.id, exhibitorId, exhibitor, currentEnvironment, dispatch]);

  useEffect(() => {
    if (selectedEvent?.id && currentEnvironment === "offerHome") {
      dispatch(fetchEventSummaryKPIs(selectedEvent.id));
    }
  }, [selectedEvent?.id, currentEnvironment, dispatch]);

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
        {/* {console.log(JSON.stringify(exhibitorDashboard, null, 2))}
        {console.log(JSON.stringify(eventSummaryKPIs, null, 2))} */}
        <AdminDashboard exhibitorDashboard={exhibitorDashboard} />
        <EventSummaryKPIs eventSummaryKPIs={eventSummaryKPIs} />
        <AppDownloader />
      </ScrollView>
    </View>
  );
};

export default DashboardOfferHome;
