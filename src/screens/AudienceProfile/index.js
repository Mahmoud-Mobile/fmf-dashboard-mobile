import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import CustomHeader from "../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../Global/colors";
import styles from "./Styles";

const AudienceProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userInfo = route.params?.userInfo || {};

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Audience Profile"
        onLeftButtonPress={() => navigation.goBack()}
        top={50}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          {userInfo?.image ? (
            <Image
              source={{ uri: userInfo.image }}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <MaterialIcons name="person" size={60} color={Colors.gray} />
            </View>
          )}
          <Text style={styles.profileName}>
            {userInfo?.name || "User Name"}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <MaterialIcons name="email" size={24} color={Colors.Primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>
                {userInfo?.email || "Not provided"}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <MaterialIcons name="phone" size={24} color={Colors.Primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Mobile</Text>
              <Text style={styles.infoValue}>
                {userInfo?.mobile || "Not provided"}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <MaterialIcons
                name="location-on"
                size={24}
                color={Colors.Primary}
              />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Address</Text>
              <Text style={styles.infoValue}>
                {userInfo?.address || "Not provided"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AudienceProfile;
