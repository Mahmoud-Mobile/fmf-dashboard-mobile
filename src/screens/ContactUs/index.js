import React from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";
import { Colors } from "../../Global/colors";

const ContactUs = () => {
  const navigation = useNavigation();

  const contactMethods = [
    {
      id: 1,
      title: "Email Support",
      value: "mobile@lead-360.co",
      icon: "email",
      action: () => {
        Linking.openURL("mailto:mobile@lead-360.co");
      },
    },
    {
      id: 2,
      title: "Phone Support",
      value: "+966 591 161 089",
      icon: "phone",
      action: () => {
        Linking.openURL("tel:+966591161089");
      },
    },
    {
      id: 3,
      title: "WhatsApp",
      value: "+966 591 161 089",
      icon: "chat",
      action: () => {
        Linking.openURL("https://wa.me/966591161089");
      },
    },
  ];

  const handleContactPress = (action) => {
    if (action) {
      action();
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        leftLabel="Contact Us"
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
              name="contact-support"
              size={32}
              color={Colors.Primary}
            />
          </View>
          <Text style={styles.title}>Get in Touch</Text>
          <Text style={styles.subtitle}>
            We're here to help! Reach out to us through any of the following
            methods
          </Text>
        </View>

        <View style={styles.contactSection}>
          {contactMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={styles.contactCard}
              onPress={() => handleContactPress(method.action)}
              activeOpacity={0.7}
            >
              <View style={styles.contactCardContent}>
                <View style={styles.iconWrapper}>
                  <MaterialIcons
                    name={method.icon}
                    size={24}
                    color={Colors.Primary}
                  />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactTitle}>{method.title}</Text>
                  <Text style={styles.contactValue}>{method.value}</Text>
                </View>
                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color={Colors.gray}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Support Hours</Text>
          <Text style={styles.infoText}>
            Our support team is available during business hours to assist you
            with any questions or issues you may have.
          </Text>
          <View style={styles.hoursContainer}>
            <Text style={styles.hoursText}>
              Saturday - Thursday: 9:00 AM - 5:00 PM
            </Text>
            <Text style={styles.hoursText}>Friday: Closed</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Response Time</Text>
          <Text style={styles.infoText}>
            We aim to respond to all inquiries within 24 hours during business
            days. For urgent matters, please call our support line.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ContactUs;
