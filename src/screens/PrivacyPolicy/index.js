import React from "react";
import { View, ScrollView, Text } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import styles from "./Styles";

const PrivacyPolicy = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <CustomHeader
        leftLabel="Privacy Policy"
        onLeftButtonPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          Event Operations Management App – Privacy Policy
        </Text>

        <Text style={styles.lastUpdated}>Last Updated: 20 November 2025</Text>

        <Text style={styles.description}>
          This Privacy Policy describes how this Event Operations Management App
          ("we", "us", "our") handles information. This is an admin-only
          application for managing event operations. By using the App, you agree
          to the practices outlined in this policy.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Account Access</Text>
          <Text style={styles.sectionText}>
            This application is designed for administrators only. Account
            creation is not available through this mobile app. All admin
            accounts are created and managed through the web dashboard.
            Administrators can only log in using credentials that have been set
            up via the web dashboard.
          </Text>
          <Text style={styles.sectionText}>
            Event access and permissions are managed through the web dashboard.
            Each event's access is configured and assigned through the web
            interface, and administrators can then access those events through
            this mobile app after logging in.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Information Collection</Text>
          <Text style={styles.sectionText}>
            This app does not collect personal information from users. The app
            is used solely for administrative purposes to manage event
            operations including:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Viewing and managing flight information
            </Text>
            <Text style={styles.bulletPoint}>
              • Managing hotel bookings and occupancy
            </Text>
            <Text style={styles.bulletPoint}>
              • Coordinating trips and transportation
            </Text>
            <Text style={styles.bulletPoint}>
              • Processing check-ins via QR code scanning
            </Text>
            <Text style={styles.bulletPoint}>
              • Viewing dashboard analytics and reports
            </Text>
            <Text style={styles.bulletPoint}>
              • Managing designated cars and resources
            </Text>
          </View>
          <Text style={styles.sectionText}>
            All event data and guest information is managed through the web
            dashboard. This mobile app serves as a tool for administrators to
            access and manage that data, but does not collect additional
            personal information.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Login Credentials</Text>
          <Text style={styles.sectionText}>
            Admin login credentials are stored securely on your device for
            authentication purposes only. These credentials are used solely to
            verify your identity and grant access to the administrative
            functions. Credentials are encrypted and stored according to
            industry-standard security practices.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Data Access</Text>
          <Text style={styles.sectionText}>
            This app accesses event data that is stored and managed on secure
            servers. The app displays and allows management of:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Event information configured in the web dashboard
            </Text>
            <Text style={styles.bulletPoint}>
              • Guest data for check-in and management purposes
            </Text>
            <Text style={styles.bulletPoint}>
              • Flight, hotel, and trip logistics data
            </Text>
            <Text style={styles.bulletPoint}>
              • Real-time analytics and reporting data
            </Text>
          </View>
          <Text style={styles.sectionText}>
            All data displayed in this app originates from the web dashboard
            system. The app does not store or collect this data independently.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Data Security</Text>
          <Text style={styles.sectionText}>
            We implement industry-standard security practices to protect
            administrative access and data:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Encryption of data in transit between the app and servers
            </Text>
            <Text style={styles.bulletPoint}>
              • Secure authentication and authorization
            </Text>
            <Text style={styles.bulletPoint}>
              • Secure storage of login credentials on device
            </Text>
            <Text style={styles.bulletPoint}>
              • Strict access controls based on admin permissions
            </Text>
            <Text style={styles.bulletPoint}>
              • Continuous monitoring and security audits
            </Text>
          </View>
          <Text style={styles.sectionText}>
            Despite these measures, no system can guarantee absolute security.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Event Data Management</Text>
          <Text style={styles.sectionText}>
            All event data, including guest information, flight details, hotel
            bookings, and trip information, is managed through the web
            dashboard. This mobile app provides a mobile interface to access and
            manage that data, but does not independently store or retain event
            data. Data retention policies are managed through the web dashboard
            system.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Third-Party Services</Text>
          <Text style={styles.sectionText}>
            The App may integrate with third-party services for functionality
            such as:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>• QR code scanning libraries</Text>
            <Text style={styles.bulletPoint}>
              • Communication services (if chat features are used)
            </Text>
            <Text style={styles.bulletPoint}>
              • Analytics and performance monitoring tools
            </Text>
          </View>
          <Text style={styles.sectionText}>
            Their privacy practices are separate and independent. We recommend
            reviewing their privacy policies if you have concerns.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Changes to This Policy</Text>
          <Text style={styles.sectionText}>
            We may update this Privacy Policy as needed. Continued use of the
            App after updates indicates acceptance of the revised policy. We
            recommend reviewing this policy periodically.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. Contact Us</Text>
          <Text style={styles.sectionText}>
            For any questions or requests regarding this Privacy Policy, please
            contact us through the Contact Us section in the app or reach out to
            our support team using the contact information provided in the app.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;
