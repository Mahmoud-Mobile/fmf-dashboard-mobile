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
        <Text style={styles.title}>WMF Client Mobile App – Privacy Policy</Text>

        <Text style={styles.lastUpdated}>Last Updated: 20 November 2025</Text>

        <Text style={styles.description}>
          This Privacy Policy describes how the WMF Client Mobile App ("we",
          "us", "our") collects, uses, and protects your personal information.
          By using the App, you agree to the practices outlined in this policy.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Information We Collect</Text>
          <Text style={styles.sectionText}>
            We may collect the following categories of information:
          </Text>

          <Text style={styles.subsectionTitle}>1.1 Personal Information</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>• Full name</Text>
            <Text style={styles.bulletPoint}>• Email address</Text>
            <Text style={styles.bulletPoint}>• Mobile number</Text>
            <Text style={styles.bulletPoint}>• Nationality</Text>
            <Text style={styles.bulletPoint}>
              • Organization name and job title
            </Text>
            <Text style={styles.bulletPoint}>
              • Identification details (e.g., passport/ID number for access
              verification)
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>1.2 Event Information</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>• Registration details</Text>
            <Text style={styles.bulletPoint}>
              • RSVP and attendance information
            </Text>
            <Text style={styles.bulletPoint}>• Session selections</Text>
            <Text style={styles.bulletPoint}>• Badge data and QR codes</Text>
            <Text style={styles.bulletPoint}>
              • Activity log from event scanning points
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>
            1.3 Device & Technical Data
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Device type, operating system, and version
            </Text>
            <Text style={styles.bulletPoint}>• IP address</Text>
            <Text style={styles.bulletPoint}>• Mobile identifiers</Text>
            <Text style={styles.bulletPoint}>
              • App performance and crash logs
            </Text>
            <Text style={styles.bulletPoint}>• Usage analytics</Text>
          </View>

          <Text style={styles.subsectionTitle}>
            1.4 Precise Location Information
          </Text>
          <Text style={styles.sectionText}>
            If you allow location permissions, the App may collect precise
            (GPS-level) location to:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>• Enable event navigation</Text>
            <Text style={styles.bulletPoint}>
              • Show nearby services (e.g., entrances, facilities,
              transportation points)
            </Text>
            <Text style={styles.bulletPoint}>
              • Facilitate transportation features (e.g., taxi/Uber
              integrations)
            </Text>
            <Text style={styles.bulletPoint}>
              • Enhance security and ensure authorized access to restricted
              areas
            </Text>
          </View>
          <Text style={styles.sectionText}>
            You can disable location access from your device settings at any
            time. Disabling location may affect certain features of the App.
          </Text>

          <Text style={styles.subsectionTitle}>
            1.5 In-App Chat & Communication
          </Text>
          <Text style={styles.sectionText}>
            If the App provides chat features, we may collect:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>• Messages sent or received</Text>
            <Text style={styles.bulletPoint}>
              • Attachments or shared files
            </Text>
            <Text style={styles.bulletPoint}>• Chat timestamps</Text>
            <Text style={styles.bulletPoint}>
              • Messages sent to the helpdesk
            </Text>
          </View>
          <Text style={styles.sectionText}>
            We do not read or monitor private chats, unless required for:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>• Technical troubleshooting</Text>
            <Text style={styles.bulletPoint}>
              • Investigating misuse or violations
            </Text>
            <Text style={styles.bulletPoint}>• Legal compliance</Text>
          </View>
          <Text style={styles.sectionText}>
            Chat data may be encrypted depending on the system setup.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            2. How We Use Your Information
          </Text>
          <Text style={styles.sectionText}>We use your information to:</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Process and manage event registrations
            </Text>
            <Text style={styles.bulletPoint}>
              • Generate your digital badge and QR code
            </Text>
            <Text style={styles.bulletPoint}>
              • Provide real-time event information and updates
            </Text>
            <Text style={styles.bulletPoint}>
              • Enable navigation using precise location
            </Text>
            <Text style={styles.bulletPoint}>
              • Facilitate in-app chat features
            </Text>
            <Text style={styles.bulletPoint}>
              • Send notifications via mobile alerts, email, SMS, and WhatsApp
            </Text>
            <Text style={styles.bulletPoint}>
              • Manage logistics (transport, hotel, access-level permissions)
            </Text>
            <Text style={styles.bulletPoint}>
              • Improve app performance, stability, and user experience
            </Text>
            <Text style={styles.bulletPoint}>
              • Ensure security and detect unauthorized access
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Sharing of Information</Text>
          <Text style={styles.sectionText}>
            We may share your information only when necessary:
          </Text>

          <Text style={styles.subsectionTitle}>
            3.1 With Event Organizers and Authorized Partners
          </Text>
          <Text style={styles.sectionText}>For:</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>• Registration management</Text>
            <Text style={styles.bulletPoint}>• Logistics and operations</Text>
            <Text style={styles.bulletPoint}>
              • Security and access control
            </Text>
            <Text style={styles.bulletPoint}>• Technical hosting</Text>
            <Text style={styles.bulletPoint}>
              • Transportation coordination
            </Text>
            <Text style={styles.bulletPoint}>• Communication services</Text>
          </View>

          <Text style={styles.subsectionTitle}>
            3.2 With Communication Providers
          </Text>
          <Text style={styles.sectionText}>To deliver:</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>• Email notifications</Text>
            <Text style={styles.bulletPoint}>• WhatsApp messages</Text>
            <Text style={styles.bulletPoint}>• SMS alerts</Text>
          </View>

          <Text style={styles.subsectionTitle}>3.3 In-App Chat Systems</Text>
          <Text style={styles.sectionText}>
            Messages may be processed by secure third-party communication
            providers under confidentiality agreements.
          </Text>

          <Text style={styles.subsectionTitle}>
            3.4 Legal and Regulatory Requirements
          </Text>
          <Text style={styles.sectionText}>
            We may disclose information to comply with:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>• Laws</Text>
            <Text style={styles.bulletPoint}>• Court orders</Text>
            <Text style={styles.bulletPoint}>
              • Government or regulatory requests
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Data Security</Text>
          <Text style={styles.sectionText}>
            We implement industry-standard security practices such as:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Encryption of data in transit
            </Text>
            <Text style={styles.bulletPoint}>
              • Secure hosting environments
            </Text>
            <Text style={styles.bulletPoint}>• Strict access controls</Text>
            <Text style={styles.bulletPoint}>
              • Continuous monitoring and periodic audits
            </Text>
          </View>
          <Text style={styles.sectionText}>
            Despite these measures, no system can guarantee absolute security.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Data Retention</Text>
          <Text style={styles.sectionText}>
            We retain personal data only as long as necessary to:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>• Deliver event services</Text>
            <Text style={styles.bulletPoint}>• Meet legal requirements</Text>
            <Text style={styles.bulletPoint}>• Resolve disputes</Text>
          </View>
          <Text style={styles.sectionText}>
            Chat data retention varies based on technical configuration.
            Location data is not stored permanently unless required for service
            delivery. Data is securely deleted or anonymized after the retention
            period.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Your Rights</Text>
          <Text style={styles.sectionText}>
            Depending on applicable laws, you may request to:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>• Access your personal data</Text>
            <Text style={styles.bulletPoint}>
              • Correct or update inaccurate information
            </Text>
            <Text style={styles.bulletPoint}>
              • Request deletion (where allowed)
            </Text>
            <Text style={styles.bulletPoint}>
              • Withdraw consent for optional features (such as location access)
            </Text>
            <Text style={styles.bulletPoint}>• Obtain a copy of your data</Text>
          </View>
          <Text style={styles.sectionText}>
            Contact us using the details below to exercise your rights.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Children's Privacy</Text>
          <Text style={styles.sectionText}>
            The App is not intended for children under 16. We do not knowingly
            collect data from children without parental consent.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Third-Party Services</Text>
          <Text style={styles.sectionText}>
            The App may provide links or integrations with:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>• Map/navigation platforms</Text>
            <Text style={styles.bulletPoint}>• Transportation services</Text>
            <Text style={styles.bulletPoint}>
              • Email/SMS/WhatsApp communication providers
            </Text>
            <Text style={styles.bulletPoint}>• Chat frameworks</Text>
          </View>
          <Text style={styles.sectionText}>
            Their privacy practices are separate and independent.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. International Transfers</Text>
          <Text style={styles.sectionText}>
            Your data may be transferred to and processed in other countries. We
            ensure such transfers comply with relevant data protection laws.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Changes to This Policy</Text>
          <Text style={styles.sectionText}>
            We may update this Privacy Policy as needed. Continued use of the
            App after updates indicates acceptance of the revised policy.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. Contact Us</Text>
          <Text style={styles.sectionText}>
            For any questions or requests regarding this Privacy Policy:
          </Text>
          <Text style={styles.contactInfo}>WMF Support Team</Text>
          <Text style={styles.contactInfo}>
            Email: support@futuremineralsforum.com.sa
          </Text>
          <Text style={styles.contactInfo}>Phone: +966 560 807 342</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;
