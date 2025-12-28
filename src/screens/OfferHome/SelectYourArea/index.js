import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import CustomEventHeader from "../../../components/CustomEventHeader";
import { styles } from "./Styles";
import { Colors } from "../../../Global/colors";

const SelectYourArea = () => {
  const navigation = useNavigation();
  const { selectedEvent } = useSelector((state) => state.api);

  const areas = [
    { id: 1, name: "Area 1" },
    { id: 2, name: "Area 2" },
    { id: 3, name: "Area 3" },
    { id: 4, name: "Area 4" },
    { id: 5, name: "Area 5" },
  ];

  const handleAreaPress = (area) => {
    const alertButtons = [
      {
        text: "Camera Scanner",
        onPress: () => {
          navigation.navigate("CameraQRScannerOfferHome", {
            eventId: selectedEvent?.id,
            areaId: area?.id,
          });
        },
      },
    ];

    if (Platform.OS !== "ios") {
      alertButtons.push({
        text: "Zebra Scanner",
        onPress: () => {
          navigation.navigate("ZebraQROfferHome", {
            eventId: selectedEvent?.id,
            areaId: area?.id,
            manualMode: false,
          });
        },
      });
    }

    alertButtons.push(
      {
        text: "Check guest code manually",
        onPress: () => {
          navigation.navigate("ZebraQROfferHome", {
            eventId: selectedEvent?.id,
            areaId: area?.id,
            manualMode: true,
          });
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      }
    );

    Alert.alert(
      "Choose Scanner Type",
      "How would you like to scan the QR code?",
      alertButtons,
      { cancelable: true }
    );
  };

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
        <View style={styles.card}>
          <Text style={styles.title}>Select Your Area</Text>
          <Text style={styles.subtitle}>
            Choose the location you're managing today
          </Text>

          <View style={styles.separator} />

          {areas.map((area, index) => {
            const isLastItem = index === areas.length - 1;
            return (
              <TouchableOpacity
                key={area.id}
                style={[styles.areaItem, isLastItem && styles.areaItemLast]}
                onPress={() => handleAreaPress(area)}
                activeOpacity={0.7}
              >
                <View style={styles.areaContent}>
                  <Ionicons
                    name="location"
                    size={20}
                    color={Colors.Gray}
                    style={styles.locationIcon}
                  />
                  <Text style={styles.areaName}>{area.name}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default SelectYourArea;
