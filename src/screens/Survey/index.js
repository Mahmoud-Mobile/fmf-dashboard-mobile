import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../../components/CustomHeader";
import CustomPressable from "../../components/CustomPressable";
import { Colors } from "../../Global/colors";
import styles from "./Styles";

const Survey = () => {
  const navigation = useNavigation();

  const [surveyData, setSurveyData] = useState({
    overallExperience: "",
    eventOrganization: "",
    venueQuality: "",
    speakerQuality: "",
    networkingOpportunities: "",
    appUsability: "",
    recommendations: "",
    additionalComments: "",
  });

  const ratingOptions = [
    { value: "excellent", label: "Excellent" },
    { value: "good", label: "Good" },
    { value: "average", label: "Average" },
    { value: "poor", label: "Poor" },
  ];

  const handleRatingChange = (field, value) => {
    setSurveyData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTextChange = (field, value) => {
    setSurveyData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Check if required fields are filled
    const requiredFields = [
      "overallExperience",
      "eventOrganization",
      "venueQuality",
      "speakerQuality",
      "networkingOpportunities",
      "appUsability",
    ];

    const missingFields = requiredFields.filter((field) => !surveyData[field]);

    if (missingFields.length > 0) {
      Alert.alert(
        "Incomplete Survey",
        "Please complete all required rating questions before submitting."
      );
      return;
    }

    // Here you would typically send the data to your API
    console.log("Survey Data:", surveyData);
    Alert.alert(
      "Thank You!",
      "Your feedback has been submitted successfully. We appreciate your input!",
      [
        {
          text: "OK",
          onPress: () => {
            // Reset form or navigate back
            setSurveyData({
              overallExperience: "",
              eventOrganization: "",
              venueQuality: "",
              speakerQuality: "",
              networkingOpportunities: "",
              appUsability: "",
              recommendations: "",
              additionalComments: "",
            });
          },
        },
      ]
    );
  };

  const renderRatingQuestion = (title, field, required = true) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionTitle}>
        {title} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <View style={styles.ratingContainer}>
        {ratingOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.ratingButton,
              surveyData[field] === option.value && styles.ratingButtonSelected,
            ]}
            onPress={() => handleRatingChange(field, option.value)}
          >
            <Text
              style={[
                styles.ratingButtonText,
                surveyData[field] === option.value &&
                  styles.ratingButtonTextSelected,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomHeader
        leftLabel="Survey"
        onLeftButtonPress={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Event Feedback Survey</Text>
            <Text style={styles.subtitle}>
              Help us improve by sharing your experience
            </Text>
          </View>

          {renderRatingQuestion(
            "Overall Event Experience",
            "overallExperience"
          )}
          {renderRatingQuestion("Event Organization", "eventOrganization")}
          {renderRatingQuestion("Venue Quality", "venueQuality")}
          {renderRatingQuestion("Speaker Quality", "speakerQuality")}
          {renderRatingQuestion(
            "Networking Opportunities",
            "networkingOpportunities"
          )}
          {renderRatingQuestion("App Usability", "appUsability")}

          <View style={styles.questionContainer}>
            <Text style={styles.questionTitle}>
              Recommendations for Improvement
            </Text>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="What would you like to see improved?"
                value={surveyData.recommendations}
                onChangeText={(text) =>
                  handleTextChange("recommendations", text)
                }
                multiline
                numberOfLines={4}
                style={styles.textInput}
                placeholderTextColor={Colors.SecondaryText}
              />
            </View>
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.questionTitle}>Additional Comments</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="Any other thoughts or suggestions?"
                value={surveyData.additionalComments}
                onChangeText={(text) =>
                  handleTextChange("additionalComments", text)
                }
                multiline
                numberOfLines={4}
                style={styles.textInput}
                placeholderTextColor={Colors.SecondaryText}
              />
            </View>
          </View>

          <View style={styles.submitContainer}>
            <CustomPressable
              title="Submit Survey"
              onPress={handleSubmit}
              style={styles.submitButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Survey;
