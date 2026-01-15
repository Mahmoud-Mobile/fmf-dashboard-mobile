import React, {
  useCallback,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Colors } from "../../../Global/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../Styles";
import { modalStyles } from "./SeatDetailsModalStyles";

const SeatDetailsModal = forwardRef(({ seatInfo, onClose }, ref) => {
  const bottomSheetRef = useRef(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      if (bottomSheetRef.current) {
        try {
          bottomSheetRef.current.snapToIndex(0);
        } catch (error) {
          console.log("Error opening seat details modal:", error);
        }
      }
    },
    close: () => {
      if (bottomSheetRef.current) {
        try {
          bottomSheetRef.current.close();
        } catch (error) {
          console.log("Error closing seat details modal:", error);
        }
      }
    },
  }));

  const handleSheetChanges = useCallback((index) => {}, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );

  const handleClose = () => {
    bottomSheetRef.current?.close();
    if (onClose) {
      onClose();
    }
  };

  const getSeatStatusColor = (status) => {
    switch (status) {
      case "AVAILABLE":
        return Colors.Success;
      case "OCCUPIED":
        return Colors.Error;
      case "ASSIGNED":
        return Colors.Primary;
      default:
        return Colors.gray;
    }
  };

  const getSeatStatusLabel = (status) => {
    switch (status) {
      case "AVAILABLE":
        return "Available";
      case "OCCUPIED":
        return "Occupied";
      case "ASSIGNED":
        return "Assigned";
      default:
        return status || " ";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (error) {
      return dateString;
    }
  };

  const assignments = seatInfo?.assignments || [];
  const hasAssignments = assignments.length > 0;
  // console.log(seatInfo?.assignments);
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={["70%", "90%"]}
      enablePanDownToClose={true}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
      enableContentPanningGesture={!!seatInfo}
    >
      <BottomSheetView style={styles.modalContentContainer}>
        {seatInfo ? (
          <>
            {/* Modern Header */}
            <View
              style={[
                modalStyles.headerContainer,
                {
                  backgroundColor: getSeatStatusColor(seatInfo?.status) + "15",
                },
              ]}
            >
              <View style={modalStyles.headerContent}>
                <View style={modalStyles.headerTextContainer}>
                  <Text style={modalStyles.headerLabel}>Seat Information</Text>
                  {seatInfo.seatIdentifier && (
                    <Text style={modalStyles.headerTitle}>
                      {seatInfo.seatIdentifier}
                    </Text>
                  )}
                  {seatInfo.status && (
                    <View style={modalStyles.statusContainer}>
                      <View
                        style={[
                          modalStyles.statusDot,
                          {
                            backgroundColor: getSeatStatusColor(
                              seatInfo.status
                            ),
                          },
                        ]}
                      />
                      <Text
                        style={[
                          modalStyles.statusText,
                          {
                            color: getSeatStatusColor(seatInfo.status),
                          },
                        ]}
                      >
                        {getSeatStatusLabel(seatInfo.status)}
                      </Text>
                    </View>
                  )}
                </View>
                <TouchableOpacity
                  onPress={handleClose}
                  activeOpacity={0.7}
                  style={modalStyles.closeButton}
                >
                  <MaterialIcons
                    name="close"
                    size={16}
                    color={Colors.PrimaryText}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView
              style={styles.modalScrollView}
              contentContainerStyle={[styles.modalScrollContent]}
              showsVerticalScrollIndicator={false}
            >
              {hasAssignments && (
                <View style={modalStyles.guestSection}>
                  <Text style={modalStyles.guestSectionTitle}>
                    Guest Information
                  </Text>
                  {assignments.map((assignment, index) => {
                    const participant = assignment?.participant || {};
                    const participantName = `${participant.firstName || ""} ${
                      participant.lastName || ""
                    }`.trim();

                    return (
                      <View
                        key={assignment.id || index}
                        style={modalStyles.guestCard}
                      >
                        {/* Participant Header */}
                        {participantName && (
                          <View style={modalStyles.participantHeader}>
                            <View style={modalStyles.participantIconContainer}>
                              <MaterialIcons
                                name="person"
                                size={18}
                                color={Colors.Primary}
                              />
                            </View>
                            <View style={{ flex: 1 }}>
                              <Text style={modalStyles.participantName}>
                                {participantName}
                              </Text>
                            </View>
                          </View>
                        )}

                        {/* Contact Information */}
                        <View style={modalStyles.contactSection}>
                          <Text style={modalStyles.sectionLabel}>Contact</Text>
                          {participant.email && (
                            <View style={modalStyles.contactItem}>
                              <MaterialIcons
                                name="email"
                                size={14}
                                color={Colors.Primary}
                                style={{ marginRight: 8 }}
                              />
                              <Text style={modalStyles.contactText}>
                                {participant.email}
                              </Text>
                            </View>
                          )}

                          {participant.phone && (
                            <View style={modalStyles.contactItem}>
                              <MaterialIcons
                                name="phone"
                                size={14}
                                color={Colors.Primary}
                                style={{ marginRight: 8 }}
                              />
                              <Text style={modalStyles.contactText}>
                                {participant.phone}
                              </Text>
                            </View>
                          )}
                        </View>

                        {/* Additional Participant Fields */}
                        {Object.keys(participant).some(
                          (key) =>
                            ![
                              "firstName",
                              "lastName",
                              "email",
                              "phone",
                            ].includes(key) &&
                            !key.toLowerCase().includes("id") &&
                            participant[key] &&
                            typeof participant[key] !== "object"
                        ) && (
                          <View style={modalStyles.additionalInfoSection}>
                            <Text style={modalStyles.sectionLabel}>
                              Additional Information
                            </Text>
                            {Object.keys(participant).map((key) => {
                              if (
                                [
                                  "firstName",
                                  "lastName",
                                  "email",
                                  "phone",
                                ].includes(key) ||
                                key.toLowerCase().includes("id")
                              ) {
                                return null;
                              }

                              const value = participant[key];
                              if (!value || typeof value === "object") {
                                return null;
                              }

                              return (
                                <View key={key} style={modalStyles.infoRow}>
                                  <Text style={modalStyles.infoLabel}>
                                    {key.charAt(0).toUpperCase() +
                                      key
                                        .slice(1)
                                        .replace(/([A-Z])/g, " $1")
                                        .trim()}
                                  </Text>
                                  <Text style={modalStyles.infoValue}>
                                    {String(value)}
                                  </Text>
                                </View>
                              );
                            })}
                          </View>
                        )}

                        {/* Assignment Information */}
                        <View style={modalStyles.assignmentSection}>
                          <Text style={modalStyles.sectionLabel}>
                            Assignment Details
                          </Text>

                          {assignment.checkedInAt && (
                            <View style={modalStyles.checkedInContainer}>
                              <MaterialIcons
                                name="check-circle"
                                size={14}
                                color={Colors.Success}
                                style={{ marginRight: 8 }}
                              />
                              <View style={{ flex: 1 }}>
                                <Text style={modalStyles.checkedInLabel}>
                                  Checked In At
                                </Text>
                                <Text style={modalStyles.checkedInValue}>
                                  {formatDate(assignment.checkedInAt)}
                                </Text>
                              </View>
                            </View>
                          )}

                          {/* Show all assignment fields */}
                          {Object.keys(assignment).map((key) => {
                            if (
                              [
                                "checkedIn",
                                "checkedInAt",
                                "participant",
                                "seat",
                              ].includes(key) ||
                              key.toLowerCase().includes("id")
                            ) {
                              return null;
                            }

                            const value = assignment[key];
                            if (
                              !value ||
                              typeof value === "object" ||
                              value === ""
                            ) {
                              return null;
                            }

                            return (
                              <View key={key} style={modalStyles.infoRow}>
                                <Text style={modalStyles.infoLabel}>
                                  {key.charAt(0).toUpperCase() +
                                    key
                                      .slice(1)
                                      .replace(/([A-Z])/g, " $1")
                                      .trim()}
                                </Text>
                                <Text style={modalStyles.infoValue}>
                                  {typeof value === "boolean"
                                    ? value
                                      ? "Yes"
                                      : "No"
                                    : String(value)}
                                </Text>
                              </View>
                            );
                          })}
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}

              {!hasAssignments && (
                <View style={modalStyles.emptyStateContainer}>
                  <View style={modalStyles.emptyStateIconContainer}>
                    <MaterialIcons
                      name="person-off"
                      size={24}
                      color={Colors.gray}
                    />
                  </View>
                  <Text style={modalStyles.emptyStateText}>
                    No guest assigned to this seat
                  </Text>
                </View>
              )}
            </ScrollView>

            <View style={modalStyles.footerContainer}>
              <TouchableOpacity
                onPress={handleClose}
                activeOpacity={0.7}
                style={modalStyles.closeButtonContainer}
              >
                <Text style={modalStyles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : null}
      </BottomSheetView>
    </BottomSheet>
  );
});

SeatDetailsModal.displayName = "SeatDetailsModal";

export default SeatDetailsModal;
