import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";
import Collapsible from "react-native-collapsible";
import { Colors } from "../../Global/colors";

const FAQ = () => {
  const navigation = useNavigation();
  const [expandedSections, setExpandedSections] = useState({});

  const faqData = [
    {
      id: "environment-selection",
      question: "How do I select my environment?",
      answer:
        "On the login screen, you'll see an Environment dropdown. Select either 'FMF' or 'Offer Home' based on which environment you need to access. Your selection will be saved and used for all API connections. If you need to change environments, you can do so from the login screen before signing in.",
      icon: "settings",
    },
    {
      id: "flight-arrival",
      question: "How do I track guest arrivals for flights?",
      answer:
        "Navigate to the Flights section from the main menu. You can view all incoming flights and track guest arrivals in real-time. The dashboard shows arrival status, flight details, and guest information. Use the QR scanner to check in guests as they arrive.",
      icon: "flight",
    },
    {
      id: "plane-landed",
      question: "How do I know when a plane has landed?",
      answer:
        "The Flights section automatically updates when a plane lands. You'll see real-time status updates including landing time, gate information, and the number of guests on board. Notifications are also sent when planes land so you can prepare for guest arrivals.",
      icon: "flight-land",
    },
    {
      id: "trip-management",
      question: "How do I manage trips for guests?",
      answer:
        "Go to the Trips section to view and manage all guest trips. You can see trip details, schedules, assigned guests, and trip status. Use the trip details screen to view comprehensive information including departure times, destinations, and guest lists.",
      icon: "directions-car",
    },
    {
      id: "hotel-checkin",
      question: "How do I check guests into hotels?",
      answer:
        "Navigate to the Hotels section to view all hotel bookings and occupancy. You can check guests into their assigned rooms using the QR scanner or manually through the hotel details screen. The system tracks room assignments and occupancy in real-time.",
      icon: "hotel",
    },
    {
      id: "guest-tracking",
      question: "How can I track a specific guest's journey?",
      answer:
        "Use the search functionality in the Dashboard or Flights section to find a guest by name or booking reference. You can view their complete journey including flight details, hotel assignments, trip schedules, and check-in status all in one place.",
      icon: "person-search",
    },
    {
      id: "qr-scanner",
      question: "How do I use the QR code scanner for check-ins?",
      answer:
        "Navigate to the Check In section or use the QR scanner from the main menu. Grant camera permissions when prompted, then point your device's camera at the guest's QR code. The system will automatically verify and check in the guest, updating their status across flights, hotels, and trips.",
      icon: "qr-code-scanner",
    },
  ];

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        leftLabel="FAQ"
        onLeftButtonPress={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.headerContainer}>
          <View style={styles.iconContainer}>
            <MaterialIcons
              name="help-outline"
              size={32}
              color={Colors.Primary}
            />
          </View>
          <Text style={styles.title}>Frequently Asked Questions</Text>
          <Text style={styles.subtitle}>
            Find answers to common questions about using the app
          </Text>
        </View>

        {faqData.map((item, index) => {
          const isExpanded = expandedSections[item.id];
          return (
            <View key={item.id} style={styles.card}>
              <TouchableOpacity
                style={[
                  styles.questionContainer,
                  isExpanded && styles.questionContainerExpanded,
                ]}
                onPress={() => toggleSection(item.id)}
                activeOpacity={0.8}
              >
                <View style={styles.questionContent}>
                  <View style={styles.iconWrapper}>
                    <MaterialIcons
                      name={item.icon}
                      size={24}
                      color={Colors.Primary}
                    />
                  </View>
                  <Text style={styles.question}>{item.question}</Text>
                </View>
                <View
                  style={[
                    styles.chevronContainer,
                    isExpanded && styles.chevronContainerExpanded,
                  ]}
                >
                  <MaterialIcons
                    name={isExpanded ? "expand-less" : "expand-more"}
                    size={28}
                    color={Colors.Primary}
                  />
                </View>
              </TouchableOpacity>
              <Collapsible collapsed={!isExpanded}>
                <View style={styles.answerContainer}>
                  <View style={styles.answerLine} />
                  <Text style={styles.answer}>{item.answer}</Text>
                </View>
              </Collapsible>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FAQ;
