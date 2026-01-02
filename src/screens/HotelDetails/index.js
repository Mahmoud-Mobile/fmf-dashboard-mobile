import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";
import CustomHeader from "../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import styles from "./Styles";
import { ActionButton, ActionButtonGroup } from "../../components/ActionButton";
import { horizontalMargin } from "../../config/metrics";
import { useHotelActionButtons } from "./utils/useHotelActionButtons";
import { formatDate, getParticipantName } from "./utils/hotelDetailsUtils";

const HotelDetails = ({ route }) => {
  const hotel = route.params?.hotel || {};
  const navigation = useNavigation();
  const { selectedEvent } = useSelector((state) => state.api);

  const filteredActionButtons = useHotelActionButtons(
    hotel,
    selectedEvent,
    navigation
  );

  const renderActions = () => {
    if (!filteredActionButtons || filteredActionButtons.length === 0)
      return null;
    if (filteredActionButtons.length === 1) {
      const button = filteredActionButtons[0];
      return <ActionButton {...button} endPosition />;
    }
    return <ActionButtonGroup buttons={filteredActionButtons} />;
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        leftLabel="Hotels"
        title={hotel.accommodation?.hotelName || "Hotel Details"}
        onLeftButtonPress={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.flexOne}>
              <Text style={styles.sectionTitle}>Guest Information</Text>
              <View style={styles.participantContainer}>
                {hotel.participant?.photo ? (
                  <Image
                    source={{ uri: hotel.participant?.photo }}
                    style={styles.participantPhoto}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.participantIconCircle}>
                    <Text style={styles.participantInitial}>
                      {hotel.participant?.firstName?.charAt(0) || ""}
                      {hotel.participant?.lastName?.charAt(0) || ""}
                    </Text>
                  </View>
                )}
                <View style={styles.participantInfo}>
                  <Text style={styles.participantName}>
                    {getParticipantName(hotel.participant)}
                  </Text>
                  <Text style={styles.participantMobile}>
                    {hotel.participant?.email || " "}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.column, { marginRight: 8, marginTop: 16 }]}>
                <Text style={styles.sectionTitle}>Hotel Details</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Hotel Name:</Text>
                  <Text style={styles.value}>
                    {hotel.accommodation?.hotelName || " "}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Room Number:</Text>
                  <Text style={styles.value}>
                    {hotel.accommodation?.roomNumber || " "}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Check In Date:</Text>
                  <Text style={styles.value}>
                    {formatDate(hotel.accommodation?.checkInDate)}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Check Out Date:</Text>
                  <Text style={styles.value}>
                    {formatDate(hotel.accommodation?.checkOutDate)}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Status:</Text>
                  <Text style={styles.value}>
                    {hotel.accommodation?.status || " "}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{ marginBottom: 50, marginHorizontal: horizontalMargin }}
          >
            {renderActions()}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HotelDetails;
