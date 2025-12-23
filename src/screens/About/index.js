import React from "react";
import { View, ScrollView, Text } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";
import { Colors } from "../../Global/colors";

const About = () => {
  const navigation = useNavigation();

  const features = [
    {
      id: 1,
      title: "Flight Management",
      description:
        "Track guest arrivals, monitor flight status, view plane landing information, and manage flight details in real-time.",
      icon: "flight",
    },
    {
      id: 2,
      title: "Hotel Operations",
      description:
        "Manage hotel bookings, track occupancy rates, check guests into rooms, and view detailed hotel information.",
      icon: "hotel",
    },
    {
      id: 3,
      title: "Trip Management",
      description:
        "Organize and manage guest trips, view trip schedules, assign guests to trips, and track trip status.",
      icon: "directions-car",
    },
    {
      id: 4,
      title: "Check-In System",
      description:
        "Efficient QR code scanning for guest check-ins at events, sub-events, and resources with real-time verification.",
      icon: "qr-code-scanner",
    },
    {
      id: 5,
      title: "Designated Cars",
      description:
        "Manage designated vehicle assignments, track car availability, and coordinate transportation for guests.",
      icon: "car-rental",
    },
    {
      id: 6,
      title: "Dashboard & Analytics",
      description:
        "Comprehensive dashboard with real-time analytics, guest arrival tracking, event overview, and data visualization.",
      icon: "dashboard",
    },
    {
      id: 7,
      title: "Event Management",
      description:
        "Handle multiple events, manage sub-events, organize resources, and coordinate all aspects of event operations.",
      icon: "event",
    },
    {
      id: 8,
      title: "Communication",
      description:
        "In-app chat functionality, push notifications, and real-time updates to keep your team connected and informed.",
      icon: "chat",
    },
  ];

  return (
    <View style={styles.container}>
      <CustomHeader
        leftLabel="About"
        onLeftButtonPress={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.headerContainer}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="info" size={32} color={Colors.Primary} />
          </View>
          <Text style={styles.title}>Event Operations Management App</Text>
          <Text style={styles.subtitle}>
            A comprehensive platform for managing all aspects of event
            operations
          </Text>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            This application is a powerful event operations management system
            designed to streamline and coordinate all aspects of large-scale
            events. From guest arrivals and hotel management to transportation
            and real-time analytics, this app provides everything you need to
            manage events efficiently and effectively.
          </Text>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          {features.map((feature) => (
            <View key={feature.id} style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <MaterialIcons
                  name={feature.icon}
                  size={24}
                  color={Colors.Primary}
                />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Purpose</Text>
          <Text style={styles.infoText}>
            This app enables event organizers and operations teams to handle
            complex event logistics, track guest movements, manage resources,
            and maintain real-time visibility into all event operations. Whether
            you're managing flight arrivals, hotel check-ins, transportation, or
            event analytics, this platform provides the tools you need for
            seamless event management.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default About;
