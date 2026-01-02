import React from "react";
import { View, ScrollView, StatusBar, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import styles from "./Styles";
import { Colors } from "../../Global/colors";
import ParticipantInfoCard from "./components/ParticipantInfoCard";
import FlightsCard from "./components/FlightsCard";
import HotelsCard from "./components/HotelsCard";
import TripsCard from "./components/TripsCard";
import EventsCheckInCard from "./components/EventsCheckInCard";
import MeetingsCard from "./components/MeetingsCard";

const Ambassador = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.Primary} />
      <LinearGradient
        colors={Colors.PrimaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <SafeAreaView edges={["top"]} style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={18} color={Colors.White} />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Ambassador</Text>
              <Text style={styles.headerSubtitle}>Participant Dashboard</Text>
            </View>
            <View style={styles.headerRight} />
          </View>
        </SafeAreaView>
      </LinearGradient>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <ParticipantInfoCard />
        <FlightsCard />
        <HotelsCard />
        <TripsCard />
        <EventsCheckInCard />
        <MeetingsCard />
      </ScrollView>
    </View>
  );
};

export default Ambassador;
