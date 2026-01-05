import React, { useEffect } from "react";
import { View, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Styles";
import GradientHeader from "../../components/GradientHeader";
import ParticipantInfoCard from "./components/ParticipantInfoCard";
import FlightsCard from "./components/FlightsCard";
import HotelsCard from "./components/HotelsCard";
import TripsCard from "./components/TripsCard";
import EventsCheckInCard from "./components/EventsCheckInCard";
import MeetingsCard from "./components/MeetingsCard";
import { fetchParticipantById } from "../../redux/actions/api";

const Ambassador = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { selectedEvent, selectedParticipant } = useSelector(
    (state) => state.api
  );
  const { participantId, eventId: routeEventId, userId } = route.params || {};
  const eventId = routeEventId || selectedEvent?.id;

  useEffect(() => {
    if (eventId && participantId) {
      dispatch(fetchParticipantById(eventId, participantId));
    }
  }, [eventId, participantId, dispatch]);

  const participant = selectedParticipant?.participant;
  const flight = selectedParticipant?.logistics?.flight;
  const accommodation = selectedParticipant?.logistics?.accommodation;

  // console.log("Participant data:", participant);
  // console.log("Flight data:", flight);
  // console.log("Accommodation data:", accommodation);

  return (
    <View style={styles.container}>
      <GradientHeader
        title="Ambassador"
        subtitle="Participant Dashboard"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <ParticipantInfoCard participant={participant} />
        <FlightsCard flight={flight} />
        <HotelsCard accommodation={accommodation} />
        <TripsCard />
        <EventsCheckInCard />
        <MeetingsCard />
      </ScrollView>
    </View>
  );
};

export default Ambassador;
