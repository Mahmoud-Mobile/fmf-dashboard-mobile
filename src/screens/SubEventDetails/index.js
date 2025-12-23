import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CustomHeader from "../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubEventById } from "../../redux/actions/api";
import LoadingModal from "../../components/LoadingModal";
import styles from "./Styles";
import DataTableCard from "./DataTableCard";
import { Colors } from "../../Global/colors";
import { formatDateRange } from "../../config/dateUtils";

const SubEventDetails = ({ route }) => {
  const { subEventID, title, location, eventId } = route.params || {};
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { selectedSubEvent, selectedEvent, loading } = useSelector(
    (state) => state.api
  );

  const eventID = eventId || selectedEvent?.id;

  useEffect(() => {
    if (subEventID && eventID) {
      dispatch(fetchSubEventById(eventID, subEventID));
    }
  }, [subEventID, eventID, dispatch]);
  // console.log(selectedSubEvent);
  const subEvent = selectedSubEvent?.subEvent || {};
  const statistics = selectedSubEvent?.statistics || {};
  const participants = selectedSubEvent?.participants || {};
  const assignments = participants?.assignments || [];

  const getStatusBadgeStyle = (status) => {
    switch (status?.toUpperCase()) {
      case "DRAFT":
        return styles.badgeDraft;
      case "PUBLISHED":
      case "ACTIVE":
        return styles.badgeActive;
      case "COMPLETED":
        return styles.badgeCompleted;
      case "CANCELLED":
        return styles.badgeCancelled;
      default:
        return styles.badgeDraft;
    }
  };

  const getRSVPStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "ACCEPTED":
        return styles.statusAccepted;
      case "DECLINED":
        return styles.statusDeclined;
      case "PENDING":
        return styles.statusPending;
      default:
        return styles.statusPending;
    }
  };

  const participantsTableData = assignments.map((assignment) => {
    const participant = assignment?.participant || {};
    const participantType = participant?.dynamicParticipantType || {};
    return {
      id: assignment.id,
      name:
        `${participant.firstName || ""} ${participant.lastName || ""}`.trim() ||
        "N/A",
      email: participant.email || "N/A",
      phone: participant.phone || "N/A",
      participantType: participantType.name || "N/A",
      rsvpStatus: assignment.rsvpStatus || "PENDING",
      assignmentType: assignment.assignmentType || "N/A",
      isSeated: assignment.isSeated ? "Yes" : "No",
    };
  });

  const participantsColumns = [
    { title: "Name", key: "name" },
    { title: "Email", key: "email" },
    { title: "Type", key: "participantType" },
    { title: "RSVP", key: "rsvpStatus" },
  ];

  const renderRSVPStatus = ({ item, value, index }) => {
    return (
      <View style={[styles.rsvpBadge, getRSVPStatusColor(value)]}>
        <Text style={styles.rsvpBadgeText}>{value || " "}</Text>
      </View>
    );
  };

  const renderInfoItem = (icon, label, value, iconColor = Colors.Gray) => (
    <View style={styles.infoItem}>
      <View style={styles.infoIconContainer}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue} numberOfLines={2}>
          {value || "N/A"}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomHeader
        leftLabel="Back"
        title={title || subEvent.name || " "}
        subtitle={location || subEvent.location}
        onLeftButtonPress={() => navigation.goBack()}
      />
      {loading ? (
        <LoadingModal visible={loading} />
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heroCard}>
            <View style={styles.heroContent}>
              <View style={styles.heroHeader}>
                <View style={styles.heroTitleContainer}>
                  <Text style={styles.heroTitle}>{subEvent.name || " "}</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      getStatusBadgeStyle(subEvent.status),
                    ]}
                  >
                    <Text style={styles.statusBadgeText}>
                      {subEvent.status || " "}
                    </Text>
                  </View>
                </View>
              </View>
              {subEvent.description && (
                <Text style={styles.heroDescription}>
                  {subEvent.description}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="event" size={20} color={Colors.Primary} />
              <Text style={styles.cardTitle}>Event Details</Text>
            </View>
            <View style={styles.cardBody}>
              <View style={styles.infoGrid}>
                {renderInfoItem(
                  "calendar-outline",
                  "Date Range",
                  formatDateRange(subEvent.startDate, subEvent.endDate),
                  Colors.Primary
                )}
                {renderInfoItem(
                  "location-outline",
                  "Location",
                  subEvent.location,
                  Colors.Error
                )}
                {renderInfoItem(
                  "people-outline",
                  "Max Attendees",
                  subEvent.maxAttendees?.toString(),
                  Colors.Success
                )}
                {renderInfoItem(
                  "layers-outline",
                  "Event Type",
                  subEvent.eventType,
                  Colors.Warning
                )}
                {renderInfoItem(
                  "bar-chart-outline",
                  "Event Level",
                  subEvent.eventLevel,
                  Colors.Primary
                )}
                {renderInfoItem(
                  "cube-outline",
                  "Total Pools",
                  subEvent.totalPoolsCount?.toString(),
                  Colors.Gray
                )}
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialIcons
                name="analytics"
                size={20}
                color={Colors.Primary}
              />
              <Text style={styles.cardTitle}>Statistics</Text>
            </View>
            <View style={styles.cardBody}>
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <View
                    style={[styles.statIconContainer, styles.statIconTotal]}
                  >
                    <Ionicons name="people" size={18} color={Colors.White} />
                  </View>
                  <Text style={styles.statNumber}>
                    {statistics.total ?? " "}
                  </Text>
                  <Text style={styles.statLabel}>Total</Text>
                </View>

                <View style={styles.statCard}>
                  <View
                    style={[styles.statIconContainer, styles.statIconAccepted]}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color={Colors.White}
                    />
                  </View>
                  <Text style={[styles.statNumber, styles.statAcceptedText]}>
                    {statistics.accepted ?? " "}
                  </Text>
                  <Text style={styles.statLabel}>Accepted</Text>
                </View>

                <View style={styles.statCard}>
                  <View
                    style={[styles.statIconContainer, styles.statIconDeclined]}
                  >
                    <Ionicons
                      name="close-circle"
                      size={18}
                      color={Colors.White}
                    />
                  </View>
                  <Text style={[styles.statNumber, styles.statDeclinedText]}>
                    {statistics.declined ?? " "}
                  </Text>
                  <Text style={styles.statLabel}>Declined</Text>
                </View>

                <View style={styles.statCard}>
                  <View
                    style={[styles.statIconContainer, styles.statIconPending]}
                  >
                    <Ionicons name="time" size={18} color={Colors.White} />
                  </View>
                  <Text style={[styles.statNumber, styles.statPendingText]}>
                    {statistics.pending ?? " "}
                  </Text>
                  <Text style={styles.statLabel}>Pending</Text>
                </View>
              </View>

              <View style={styles.additionalStats}>
                <View style={styles.additionalStatItem}>
                  <MaterialIcons
                    name="admin-panel-settings"
                    size={18}
                    color={Colors.Primary}
                  />
                  <Text style={[styles.additionalStatLabel, { marginLeft: 8 }]}>
                    Direct Admin:
                  </Text>
                  <Text style={styles.additionalStatValue}>
                    {statistics.directAdmin ?? ""}
                  </Text>
                </View>
                <View style={styles.additionalStatItem}>
                  <MaterialIcons
                    name="mail-outline"
                    size={18}
                    color={Colors.Primary}
                  />
                  <Text style={[styles.additionalStatLabel, { marginLeft: 8 }]}>
                    Invitations:
                  </Text>
                  <Text style={styles.additionalStatValue}>
                    {statistics.invitation ?? ""}
                  </Text>
                </View>
              </View>

              {statistics.byParticipantType &&
                Object.keys(statistics.byParticipantType).length > 0 && (
                  <View style={styles.participantTypeSection}>
                    <Text style={styles.participantTypeTitle}>
                      By Participant Type
                    </Text>
                    <View style={styles.participantTypeList}>
                      {Object.entries(statistics.byParticipantType).map(
                        ([type, count]) => (
                          <View key={type} style={styles.participantTypeItem}>
                            <View style={styles.participantTypeDot} />
                            <Text style={styles.participantTypeName}>
                              {type}
                            </Text>
                            <Text style={styles.participantTypeCount}>
                              {count}
                            </Text>
                          </View>
                        )
                      )}
                    </View>
                  </View>
                )}
            </View>
          </View>

          {assignments.length > 0 && (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <MaterialIcons name="groups" size={20} color={Colors.Primary} />
                <Text style={styles.cardTitle}>
                  Participants ({participants.total ?? 0})
                </Text>
              </View>
              <View style={styles.cardBody}>
                <DataTableCard
                  columns={participantsColumns.map((col) =>
                    col.key === "rsvpStatus"
                      ? { ...col, render: renderRSVPStatus }
                      : col
                  )}
                  data={participantsTableData}
                  containerStyle={styles.tableContainer}
                />
              </View>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default SubEventDetails;
