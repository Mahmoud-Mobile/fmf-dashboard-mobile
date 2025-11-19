import React, { useEffect, useMemo } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import CustomHeader from "../../components/CustomHeader";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";
import { fetchProfile } from "../../redux/actions/api";
import styles from "./Styles";

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.api);
  const authUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    // Fetch profile data if not already loaded
    if (!profile || Object.keys(profile).length === 0) {
      dispatch(fetchProfile());
    }
  }, [dispatch]);

  // Get user info from auth or profile
  const userInfo = useMemo(() => {
    const user = authUser?.user ?? authUser ?? profile?.user ?? profile ?? {};
    return {
      firstName: user.firstName || user.first_name || "",
      lastName: user.lastName || user.last_name || "",
      email: user.email || "",
      mobile: user.mobile || user.phone || user.phoneNumber || "",
      address: user.address || "",
      role: user.role || user.userRole || user.title || "",
      profileImage: user.profileImage || user.profile_image || user.avatar || null,
    };
  }, [authUser, profile]);

  const displayName = [userInfo.firstName, userInfo.lastName]
    .filter(Boolean)
    .join(" ") || "User";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "U";

  if (loading) {
    return (
      <View style={styles.container}>
        <CustomHeader
          title="Profile"
          onLeftButtonPress={() => navigation.goBack()}
          top={50}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.Primary} />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Profile"
        onLeftButtonPress={() => navigation.goBack()}
        top={50}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          {userInfo.profileImage ? (
            <Image
              source={{ uri: userInfo.profileImage }}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.initialsText}>{initials}</Text>
            </View>
          )}
          <Text style={styles.profileName}>{displayName}</Text>
          {userInfo.role && (
            <Text style={styles.profileRole}>{userInfo.role}</Text>
          )}
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <MaterialIcons name="email" size={24} color={Colors.Primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>
                {userInfo.email || "Not provided"}
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
                {userInfo.mobile || "Not provided"}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <MaterialIcons name="location-on" size={24} color={Colors.Primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Address</Text>
              <Text style={styles.infoValue}>
                {userInfo.address || "Not provided"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
