import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../../Global/colors";
import { commonCardStyle } from "../../../config/metrics";
import styles from "./CardStyles";
import AddMeetingModal from "./AddMeetingModal";
import {
  addMeeting,
  updateMeeting,
  setSelectedMeeting,
} from "../../../redux/reducers/meetingsReducer";
import moment from "moment";

const MeetingsCard = () => {
  const dispatch = useDispatch();
  const meetings = useSelector((state) => state.meetings?.meetings || []);
  const selectedMeeting = useSelector(
    (state) => state.meetings?.selectedMeeting
  );
  const [modalVisible, setModalVisible] = useState(false);

  // Group meetings by date
  const groupedMeetings = useMemo(() => {
    const grouped = {};
    meetings.forEach((meeting) => {
      const dateKey = meeting.date;
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(meeting);
    });
    return grouped;
  }, [meetings]);

  const handleAddMeeting = () => {
    dispatch(setSelectedMeeting(null));
    setModalVisible(true);
  };

  const handleEditMeeting = (meeting) => {
    dispatch(setSelectedMeeting(meeting));
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    dispatch(setSelectedMeeting(null));
  };

  const handleSubmit = (meetingData) => {
    if (selectedMeeting) {
      dispatch(updateMeeting(meetingData));
    } else {
      dispatch(addMeeting(meetingData));
    }
  };

  const formatDateTitle = (dateString) => {
    const date = moment(dateString);
    const today = moment();
    const tomorrow = moment().add(1, "day");

    if (date.isSame(today, "day")) {
      return "Today's Meetings";
    } else if (date.isSame(tomorrow, "day")) {
      return "Tomorrow's Meetings";
    } else {
      return date.format("MMM DD, YYYY");
    }
  };

  return (
    <>
      <View style={[commonCardStyle, styles.card, styles.marginTop]}>
        <View style={styles.cardHeaderWithAction}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="event" size={16} color={Colors.Primary} />
            </View>
            <Text style={styles.cardTitle}>Meetings</Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddMeeting}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonText}>+ Add New Meeting</Text>
          </TouchableOpacity>
        </View>

        {meetings.length === 0 ? (
          <View style={styles.meetingsSection}>
            <Text style={[styles.meetingSectionTitle, { opacity: 0.5 }]}>
              No meetings scheduled
            </Text>
          </View>
        ) : (
          Object.keys(groupedMeetings)
            .sort()
            .map((dateKey) => (
              <View key={dateKey} style={styles.meetingsSection}>
                <Text style={styles.meetingSectionTitle}>
                  {formatDateTitle(dateKey)}
                </Text>
                {groupedMeetings[dateKey].map((meeting) => (
                  <TouchableOpacity
                    key={meeting.id}
                    style={styles.meetingItem}
                    onPress={() => handleEditMeeting(meeting)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={styles.meetingTime}>
                          {meeting.time} - {meeting.title}
                        </Text>
                        {meeting.description ? (
                          <Text style={styles.meetingDescription}>
                            {meeting.description}
                          </Text>
                        ) : null}
                      </View>
                      <MaterialIcons
                        name="edit"
                        size={16}
                        color={Colors.Primary}
                        style={{ marginLeft: 8, marginTop: 2 }}
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))
        )}
      </View>

      <AddMeetingModal
        visible={modalVisible}
        onClose={handleModalClose}
        onSubmit={handleSubmit}
        selectedMeeting={selectedMeeting}
      />
    </>
  );
};

export default MeetingsCard;
