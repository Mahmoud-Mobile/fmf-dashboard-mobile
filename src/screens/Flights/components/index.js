import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  ActionButtonGroup,
  ActionButton,
} from "../../../components/ActionButton";
import ImageSinglePreview from "../../../components/ImageSinglePreview";
import { formatDateTime } from "../../../config/dateUtils";
import styles from "./Styles";

const FlightCard = ({
  airlineName,
  flightNumber,
  airportCode,
  airportName,

  date,
  time,
  returnDate,
  returnTime,
  participantType = null,

  userName = "-",
  userMobile = "-",
  userPhoto = null,
  firstName = "",
  lastName = "",

  actionButtons,

  onPress,
  width,
}) => {
  const [previewVisible, setPreviewVisible] = useState(false);

  const userInitials = useMemo(() => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
    if (firstInitial && lastInitial) {
      return `${firstInitial}${lastInitial}`;
    }
    return userName ? userName.charAt(0).toUpperCase() : "";
  }, [firstName, lastName, userName]);

  const handleImagePress = () => {
    if (userPhoto) {
      setPreviewVisible(true);
    }
  };

  const arrivalDateTime = useMemo(() => {
    return formatDateTime(date, time);
  }, [date, time]);

  const returnDateTime = useMemo(() => {
    if (returnDate && returnTime) {
      return formatDateTime(returnDate, returnTime);
    }
    return null;
  }, [returnDate, returnTime]);

  const renderActions = () => {
    if (!actionButtons || actionButtons.length === 0) return null;
    if (actionButtons.length === 1) {
      const button = actionButtons[0];
      return <ActionButton {...button} />;
    }

    return <ActionButtonGroup buttons={actionButtons} />;
  };

  return (
    <TouchableOpacity
      style={[styles.container, width && { width }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.cardContent}>
        <View style={{}}>
          <View style={styles.flexRow}>
            {userPhoto ? (
              <TouchableOpacity onPress={handleImagePress} activeOpacity={0.8}>
                <Image
                  source={{ uri: userPhoto }}
                  style={styles.userPhoto}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.userIconCircle}>
                <Text style={styles.userInitial}>{userInitials}</Text>
              </View>
            )}
            <View style={{ gap: 4 }}>
              <Text style={styles.userName}>{userName || " "}</Text>
              <Text style={styles.userMobile}>{userMobile || " "}</Text>
            </View>
          </View>
          <Text style={styles.flightTitle}>{flightNumber || "-"}</Text>
          <Text style={styles.flightText}>
            Airline Name: {airlineName || "-"}
          </Text>
        </View>
        <View style={styles.detailsColumn}>
          <View style={styles.detailRow}>
            <MaterialIcons name="flight" size={14} color="#6B7280" />
            <Text style={styles.detailText}>
              {airportName ? `${airportName} (${airportCode || ""})` : "-"}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <MaterialIcons name="event" size={14} color="#6B7280" />
            <Text style={styles.detailText}>{arrivalDateTime}</Text>
          </View>
          {returnDateTime && (
            <View style={styles.detailRow}>
              <MaterialIcons name="flight-land" size={14} color="#6B7280" />
              <Text style={styles.detailText}>Return: {returnDateTime}</Text>
            </View>
          )}
        </View>
      </View>
      {participantType && (
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{participantType}</Text>
        </View>
      )}
      {renderActions()}
      <ImageSinglePreview
        visible={previewVisible}
        source={userPhoto ? { uri: userPhoto } : null}
        onClose={() => setPreviewVisible(false)}
      />
    </TouchableOpacity>
  );
};

export default React.memo(FlightCard);
