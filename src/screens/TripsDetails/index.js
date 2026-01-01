import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-native-modal";
import CustomHeader from "../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import styles from "./Styles";
import moment from "moment";
import { ActionButton, ActionButtonGroup } from "../../components/ActionButton";
import { horizontalMargin } from "../../config/metrics";
import { Colors } from "../../Global/colors";
import {
  markTripParticipantAsNoShow,
  markTripParticipantAsPickedUp,
  fetchTripsParticipants,
} from "../../redux/actions/api";
import { setIconDisabled } from "../../redux/reducers/uiReducer";

const TripsDetails = ({ route }) => {
  const { trip } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { selectedEvent } = useSelector((state) => state.api);

  const [showNoShowModal, setShowNoShowModal] = useState(false);
  const [noShowReason, setNoShowReason] = useState("");

  // Handle both old and new data structures
  const participant = trip?.participant || {};
  const tripData = trip?.trip || trip || {};

  const firstName = participant?.firstName || "";
  const lastName = participant?.lastName || "";
  const userName = [firstName, lastName].filter(Boolean).join(" ") || "N/A";
  const userMobile = participant?.phone || "N/A";
  const userEmail = participant?.email || "";
  const userPhoto = participant?.profilePicture || null;

  const pickupLocation = tripData?.pickupLocation || "N/A";
  const dropoffLocation = tripData?.dropoffLocation || "N/A";

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const nativeDate = new Date(dateString);
      if (!isNaN(nativeDate.getTime())) {
        return moment(nativeDate).format("MMM DD, YYYY HH:mm");
      }
      return "N/A";
    } catch (error) {
      return "N/A";
    }
  };

  const handleNoShowSubmit = async () => {
    const tripId = tripData?.id || "";
    const participantId = participant?.id || "";

    if (!tripId || !participantId) {
      Alert.alert("Error", "Missing trip or participant information");
      return;
    }

    try {
      await dispatch(
        markTripParticipantAsNoShow(
          selectedEvent?.id,
          tripId,
          participantId,
          noShowReason
        )
      );
      // Clear the disabled icon state
      dispatch(
        setIconDisabled({
          iconId: `no-show-${tripId}-${participantId}`,
          disabled: false,
        })
      );
      // Refetch data
      if (selectedEvent?.id) {
        dispatch(
          fetchTripsParticipants(selectedEvent.id, {
            page: 1,
            limit: 1000,
          })
        );
      }
      setShowNoShowModal(false);
      setNoShowReason("");
      Alert.alert("Success", "Participant marked as no show");
    } catch (error) {
      Alert.alert(
        "Mark No Show Failed",
        `Failed to mark as no show: ${error.message || "Unknown error"}`
      );
    }
  };

  const handleNoShowModalClose = () => {
    setShowNoShowModal(false);
    setNoShowReason("");
  };

  const actionButtons = useMemo(() => {
    const tripId = tripData?.id || "";
    const participantId = participant?.id || "";

    const isPickedUp = tripData?.isPickedUp || false;
    const isNoShow = tripData?.isNoShow || false;
    const isCompleted = tripData?.status === "COMPLETED" || false;

    return [
      {
        icon: "person",
        text: "Mark Picked Up",
        isSelected: isPickedUp,
        disabled: isPickedUp || isNoShow || isCompleted,
        iconId: `picked-up-${tripId}-${participantId}`,
        onPress: async () => {
          try {
            await dispatch(
              markTripParticipantAsPickedUp(
                selectedEvent?.id,
                tripId,
                participantId
              )
            );
            // Clear the disabled icon state
            dispatch(
              setIconDisabled({
                iconId: `picked-up-${tripId}-${participantId}`,
                disabled: false,
              })
            );
            // Refetch data
            if (selectedEvent?.id) {
              dispatch(
                fetchTripsParticipants(selectedEvent.id, {
                  page: 1,
                  limit: 1000,
                })
              );
            }
            Alert.alert("Success", "Participant marked as picked up");
          } catch (error) {
            Alert.alert(
              "Mark Picked Up Failed",
              `Failed to mark as picked up: ${error.message || "Unknown error"}`
            );
          }
        },
      },
      {
        icon: "cancel",
        text: "Mark No Show",
        isSelected: isNoShow,
        disabled: isNoShow || isPickedUp || isCompleted,
        iconId: `no-show-${tripId}-${participantId}`,
        onPress: () => {
          setNoShowReason("");
          setShowNoShowModal(true);
        },
      },
    ];
  }, [tripData, participant, dispatch, selectedEvent?.id]);

  const renderActions = () => {
    if (!actionButtons || actionButtons.length === 0) return null;
    if (actionButtons.length === 1) {
      const button = actionButtons[0];
      return <ActionButton {...button} endPosition />;
    }

    return <ActionButtonGroup buttons={actionButtons} />;
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        leftLabel="Trips"
        title={tripData?.tripType || "Trip Details"}
        subtitle={tripData?.status || "N/A"}
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
              <Text style={styles.sectionTitle}>Participant Information</Text>
              <View style={styles.participantContainer}>
                {userPhoto ? (
                  <Image
                    source={{
                      uri: userPhoto,
                    }}
                    style={styles.participantPhoto}
                    resizeMode="cover"
                  />
                ) : (
                  <View
                    style={[
                      styles.participantPhoto,
                      {
                        backgroundColor: Colors.Primary,
                        justifyContent: "center",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Text style={{ color: Colors.White, fontSize: 24 }}>
                      {userName.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                )}
                <View style={styles.participantInfo}>
                  <Text style={styles.participantName}>{userName}</Text>
                  <Text style={styles.participantMobile}>{userMobile}</Text>
                  {userEmail && (
                    <Text style={[styles.participantMobile, { marginTop: 4 }]}>
                      {userEmail}
                    </Text>
                  )}
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.column, { marginRight: 8, marginTop: 16 }]}>
                <Text style={styles.sectionTitle}>Trip Details</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Pickup Location:</Text>
                  <Text style={styles.value}>{pickupLocation}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Drop-off Location:</Text>
                  <Text style={styles.value}>{dropoffLocation}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Scheduled Pickup:</Text>
                  <Text style={styles.value}>
                    {formatDate(tripData.scheduledPickup)}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Trip Type:</Text>
                  <Text style={styles.value}>{tripData.tripType || "N/A"}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Status:</Text>
                  <Text style={[styles.value, styles.statusYes]}>
                    {tripData.status || "N/A"}
                  </Text>
                </View>
              </View>

              <View style={[styles.column, { marginTop: 16 }]}>
                <Text style={styles.sectionTitle}>Trip Status</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Picked Up:</Text>
                  <Text
                    style={[
                      styles.value,
                      tripData?.isPickedUp ? styles.statusYes : styles.statusNo,
                    ]}
                  >
                    {tripData?.isPickedUp ? "Yes" : "No"}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>No Show:</Text>
                  <Text
                    style={[
                      styles.value,
                      tripData?.isNoShow ? styles.statusYes : styles.statusNo,
                    ]}
                  >
                    {tripData?.isNoShow ? "Yes" : "No"}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Trip ID:</Text>
                  <Text style={styles.value}>{tripData?.id || "N/A"}</Text>
                </View>
              </View>
            </View>

            {/* <View style={styles.row}>
              <View style={[styles.column, { marginRight: 8 }]}>
                <Text style={styles.sectionTitle}>Trip Status</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Vehicle Ready:</Text>
                  <Text
                    style={[
                      styles.value,
                      tripData.isVehicleReady
                        ? styles.statusYes
                        : styles.statusNo,
                    ]}
                  >
                    {tripData.isVehicleReady ? "Yes" : "No"}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Guest Picked Up:</Text>
                  <Text
                    style={[
                      styles.value,
                      tripData.isGuestPickedUp
                        ? styles.statusYes
                        : styles.statusNo,
                    ]}
                  >
                    {tripData.isGuestPickedUp ? "Yes" : "No"}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Trip Completed:</Text>
                  <Text
                    style={[
                      styles.value,
                      tripData.isTripCompleted
                        ? styles.statusYes
                        : styles.statusNo,
                    ]}
                  >
                    {tripData.isTripCompleted ? "Yes" : "No"}
                  </Text>
                </View>
              </View>
            </View> */}
          </View>
          <View
            style={{ marginBottom: 100, marginHorizontal: horizontalMargin }}
          >
            {renderActions()}
          </View>
        </View>
      </ScrollView>

      <Modal
        isVisible={showNoShowModal}
        onBackdropPress={handleNoShowModalClose}
        onBackButtonPress={handleNoShowModalClose}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View
          style={{
            backgroundColor: Colors.White,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            paddingBottom: 40,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 15,
              color: Colors.Black,
            }}
          >
            Mark as No Show
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginBottom: 10,
              color: Colors.Gray,
            }}
          >
            Please enter the reason for no show:
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: Colors.Gray,
              borderRadius: 8,
              padding: 12,
              minHeight: 100,
              textAlignVertical: "top",
              marginBottom: 20,
            }}
            placeholder="Enter reason..."
            placeholderTextColor="#828282"
            value={noShowReason}
            onChangeText={setNoShowReason}
            multiline
            numberOfLines={4}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: Colors.Gray || "#E0E0E0",
                padding: 15,
                borderRadius: 8,
                marginRight: 10,
                alignItems: "center",
              }}
              onPress={handleNoShowModalClose}
            >
              <Text style={{ color: Colors.White, fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: Colors.Primary,
                padding: 15,
                borderRadius: 8,
                alignItems: "center",
              }}
              onPress={handleNoShowSubmit}
            >
              <Text style={{ color: Colors.White, fontSize: 16 }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TripsDetails;
