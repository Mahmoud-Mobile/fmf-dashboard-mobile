import React, { useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import CustomEventHeader from "../../components/CustomEventHeader";
import LoadingModal from "../../components/LoadingModal";
import { styles } from "./Styles";
import { Colors } from "../../Global/colors";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { fetchResources } from "../../redux/actions/api";

const SelectYourArea = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { selectedEvent, resources, loading } = useSelector(
    (state) => state.api
  );

  useFocusEffect(
    useCallback(() => {
      if (selectedEvent?.id) {
        dispatch(
          fetchResources(selectedEvent.id, {
            type: "AREA",
            page: 1,
            limit: 100,
          })
        );
      }
    }, [selectedEvent?.id, dispatch])
  );

  const areas = resources?.resources || [];

  const handleAreaPress = (area) => {
    navigation.navigate("CheckIn_Area", {
      area: area,
    });
  };

  return (
    <View style={styles.container}>
      <LoadingModal visible={loading} />
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
                  <EvilIcons
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
