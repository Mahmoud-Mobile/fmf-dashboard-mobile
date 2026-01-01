import React, { useMemo } from "react";
import { View, Text, ScrollView, Image, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CustomHeader from "../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import styles from "./Styles";
import moment from "moment";
import { ActionButton, ActionButtonGroup } from "../../components/ActionButton";
import { horizontalMargin } from "../../config/metrics";
import {
  markAccommodationAsCheckedIn,
  markAccommodationAsCheckedOut,
} from "../../redux/actions/api";

const HotelDetails = ({ route }) => {
  const acc = route.params?.hotel || {};
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { selectedEvent } = useSelector((state) => state.api);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const nativeDate = new Date(dateString);
      if (!isNaN(nativeDate.getTime())) {
        return moment(nativeDate).format("MMM DD, YYYY, h:mm A");
      }
      return "";
    } catch (error) {
      return "";
    }
  };

  const actionButtons = useMemo(() => {
    const hotelId = acc.accommodation?.id || " ";
    const isCheckedIn = acc.accommodation?.isCheckedIn || false;
    const isCheckedOut = acc.accommodation?.isCheckedOut || false;

    return [
      {
        icon: "check-circle",
        text: "Check In",
        isSelected: isCheckedIn,
        disabled: isCheckedIn,
        iconId: `check-in-${hotelId}`,
        onPress: async () => {
          try {
            await dispatch(
              markAccommodationAsCheckedIn(
                selectedEvent?.id,
                acc.accommodation?.id
              )
            );
            Alert.alert(
              "Check In Successful",
              "Guest has been checked in successfully!",
              [{ text: "OK", style: "default" }]
            );
          } catch (error) {
            Alert.alert(
              "Check In Failed",
              `Failed to check in: ${error.message || "Unknown error"}`,
              [{ text: "OK", style: "default" }]
            );
          }
        },
      },
      {
        icon: "exit-to-app",
        text: "Check Out",
        isSelected: isCheckedOut,
        disabled: isCheckedOut,
        iconId: `check-out-${hotelId}`,
        onPress: async () => {
          try {
            await dispatch(
              markAccommodationAsCheckedOut(
                selectedEvent?.id,
                acc.accommodation?.id
              )
            );
            Alert.alert(
              "Check Out Successful",
              "Guest has been checked out successfully!",
              [{ text: "OK", style: "default" }]
            );
          } catch (error) {
            Alert.alert(
              "Check Out Failed",
              `Failed to check out: ${error.message || "Unknown error"}`,
              [{ text: "OK", style: "default" }]
            );
          }
        },
      },
    ];
  }, [acc, dispatch, selectedEvent?.id]);

  // Get action button visibility from Redux
  const actionButtonVisibility =
    useSelector((state) => state.ui?.actionButtonVisibility) || {};

  // Filter action buttons based on visibility
  const filteredActionButtons = useMemo(() => {
    if (!actionButtons || !Array.isArray(actionButtons)) return [];
    return actionButtons.filter((button) => {
      if (!button || !button.text) return true;
      const storedValue = actionButtonVisibility[button.text];
      const isVisible =
        storedValue === undefined
          ? true
          : typeof storedValue === "string"
          ? storedValue === "true"
          : Boolean(storedValue);
      return isVisible;
    });
  }, [actionButtons, actionButtonVisibility]);

  const renderActions = () => {
    if (!filteredActionButtons || filteredActionButtons.length === 0) return null;
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
        title={acc.accommodation?.hotelName || "Hotel Details"}
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
                {acc.participant?.photo ? (
                  <Image
                    source={{ uri: acc.participant?.photo }}
                    style={styles.participantPhoto}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.participantIconCircle}>
                    <Text style={styles.participantInitial}>
                      {acc.participant?.firstName?.charAt(0) || ""}
                      {acc.participant?.lastName?.charAt(0) || ""}
                    </Text>
                  </View>
                )}
                <View style={styles.participantInfo}>
                  <Text style={styles.participantName}>
                    {acc.participant?.firstName || ""}{" "}
                    {acc.participant?.lastName || ""}
                  </Text>
                  <Text style={styles.participantMobile}>
                    {acc.participant?.email || " "}
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
                    {acc.accommodation?.hotelName || " "}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Room Number:</Text>
                  <Text style={styles.value}>
                    {acc.accommodation?.roomNumber || " "}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Check In Date:</Text>
                  <Text style={styles.value}>
                    {formatDate(acc.accommodation?.checkInDate)}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Check Out Date:</Text>
                  <Text style={styles.value}>
                    {formatDate(acc.accommodation?.checkOutDate)}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Status:</Text>
                  <Text style={styles.value}>
                    {acc.accommodation?.status || " "}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{ marginBottom: 100, marginHorizontal: horizontalMargin }}
          >
            {renderActions()}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HotelDetails;
