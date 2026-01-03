import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import CustomHeader from "../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import ParticipantInfoCard from "../../components/ParticipantInfoCard";
import styles from "./Styles";
import { ActionButton, ActionButtonGroup } from "../../components/ActionButton";
import { horizontalMargin } from "../../config/metrics";
import { useHotelActionButtons } from "./utils/useHotelActionButtons";
import { formatDate } from "./utils/hotelDetailsUtils";

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
        title={hotel.accommodation?.hotel?.name || "Hotel Details"}
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
              <ParticipantInfoCard
                participant={hotel.participant}
                fields={[
                  {
                    key: "phone",
                    icon: "phone",
                    iconType: "MaterialIcons",
                    label: "Phone",
                    value: hotel.participant?.phone,
                  },
                  {
                    key: "email",
                    icon: "email",
                    iconType: "MaterialIcons",
                    label: "Email",
                    value: hotel.participant?.email,
                  },
                  {
                    key: "participantCode",
                    icon: "badge",
                    iconType: "MaterialIcons",
                    label: "Participant Code",
                    value: hotel.participant?.participantCode,
                  },
                  {
                    key: "qrCode",
                    icon: "qr-code",
                    iconType: "MaterialIcons",
                    label: "QR Code",
                    value: hotel.participant?.qrCode,
                  },
                  {
                    key: "nationality",
                    icon: "flag",
                    iconType: "Ionicons",
                    label: "Nationality",
                    value: hotel.participant?.nationality
                      ? `${hotel.participant.nationality.name} (${hotel.participant.nationality.code})`
                      : null,
                  },
                  {
                    key: "participantType",
                    icon: "person",
                    iconType: "MaterialIcons",
                    label: "Participant Type",
                    value: hotel.participant?.participantType?.name,
                  },
                  {
                    key: "position",
                    icon: "work",
                    iconType: "MaterialIcons",
                    label: "Position",
                    value: hotel.participant?.position,
                  },
                  {
                    key: "organization",
                    icon: "business",
                    iconType: "MaterialIcons",
                    label: "Organization",
                    value: hotel.participant?.organization,
                  },
                  {
                    key: "status",
                    icon: "info",
                    iconType: "MaterialIcons",
                    label: "Status",
                    value: hotel.participant?.status,
                  },
                ]}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.column, { marginRight: 8, marginTop: 16 }]}>
                <Text style={styles.sectionTitle}>Hotel Information</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Hotel Name:</Text>
                  <Text style={styles.value}>
                    {hotel.accommodation?.hotel?.name || " "}
                  </Text>
                </View>
                {hotel.accommodation?.hotel?.starRating && (
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Star Rating:</Text>
                    <Text style={styles.value}>
                      {hotel.accommodation.hotel.starRating} ★
                    </Text>
                  </View>
                )}
                {hotel.accommodation?.hotel?.address && (
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Address:</Text>
                    <Text style={styles.value}>
                      {hotel.accommodation.hotel.address}
                    </Text>
                  </View>
                )}
                {hotel.accommodation?.hotel?.city && (
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>City:</Text>
                    <Text style={styles.value}>
                      {hotel.accommodation.hotel.city}
                    </Text>
                  </View>
                )}
                {hotel.accommodation?.hotel?.phone && (
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Hotel Phone:</Text>
                    <Text style={styles.value}>
                      {hotel.accommodation.hotel.phone}
                    </Text>
                  </View>
                )}
                {hotel.accommodation?.hotel?.managementType && (
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Management Type:</Text>
                    <Text style={styles.value}>
                      {hotel.accommodation.hotel.managementType}
                    </Text>
                  </View>
                )}
              </View>

              <View style={[styles.column, { marginTop: 16 }]}>
                <Text style={styles.sectionTitle}>Room Information</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Room Number:</Text>
                  <Text style={styles.value}>
                    {hotel.accommodation?.room?.roomNumber || " "}
                  </Text>
                </View>
                {hotel.accommodation?.room?.capacity && (
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Capacity:</Text>
                    <Text style={styles.value}>
                      {hotel.accommodation.room.capacity} guests
                    </Text>
                  </View>
                )}
                {hotel.accommodation?.room?.isAccessible !== undefined && (
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Accessible:</Text>
                    <Text style={styles.value}>
                      {hotel.accommodation.room.isAccessible ? "Yes" : "No"}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.column, { marginRight: 8, marginTop: 16 }]}>
                <Text style={styles.sectionTitle}>Accommodation Details</Text>
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
                {hotel.accommodation?.actualCheckIn && (
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Actual Check In:</Text>
                    <Text style={styles.value}>
                      {formatDate(hotel.accommodation.actualCheckIn)}
                    </Text>
                  </View>
                )}
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Status:</Text>
                  <Text style={styles.value}>
                    {hotel.accommodation?.status
                      ? typeof hotel.accommodation.status === "object" &&
                        hotel.accommodation.status?.name
                        ? hotel.accommodation.status.name
                        : hotel.accommodation.status
                      : " "}
                  </Text>
                </View>
                {hotel.accommodation?.isCheckedIn !== undefined && (
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Checked In:</Text>
                    <Text style={styles.value}>
                      {hotel.accommodation.isCheckedIn ? "Yes" : "No"}
                    </Text>
                  </View>
                )}
                {hotel.accommodation?.isCheckedOut !== undefined && (
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Checked Out:</Text>
                    <Text style={styles.value}>
                      {hotel.accommodation.isCheckedOut ? "Yes" : "No"}
                    </Text>
                  </View>
                )}
                {hotel.accommodation?.bookedBy && (
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Booked By:</Text>
                    <Text style={styles.value}>
                      {hotel.accommodation.bookedBy}
                    </Text>
                  </View>
                )}
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
