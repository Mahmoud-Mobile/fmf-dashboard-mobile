import React, { useState, useEffect } from "react";
import { Text, View, Animated, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./Styles";
import { useNavigation } from "@react-navigation/native";
import CustomList from "./components";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import LoadingModal from "../../components/LoadingModal";
import * as SecureStore from "expo-secure-store";

const More = () => {
  const navigation = useNavigation();
  const [scrollY] = useState(new Animated.Value(0));
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.api);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const storedUserInfo = await SecureStore.getItemAsync("userInfo");
        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo));
        }
      } catch (error) {
        console.log("Error loading user info:", error);
      }
    };
    loadUserInfo();
  }, []);

  const handleLogout = async () => {
    await dispatch(logout());
    navigation.navigate("Login");
  };

  const list = [
    {
      id: 1,
      title: "Profile",
      icon: "User_Icon",
      iconColor: "#374151",
      navigation: "Profile",
    },
    {
      id: 2,
      title: "Survey",
      icon: "CheckIn_Icon",
      iconColor: "#374151",
      navigation: "Survey",
    },
    {
      id: 3,
      title: "Privacy Policy",
      icon: "Location_Icon",
      iconColor: "#374151",
      navigation: "PrivacyPolicy",
    },
    {
      id: 4,
      title: "About",
      icon: "Calendar_Icon",
      iconColor: "#374151",
      navigation: "About",
    },
    {
      id: 5,
      title: "logout",
      icon: "Logout_Icon",
      iconColor: "#EF4444",
      navigation: null,
    },
  ];

  return (
    <View style={styles.container} edges={{ top: "additive" }}>
      {loading ? (
        <LoadingModal visible={loading} />
      ) : (
        <>
          <LinearGradient
            colors={["#880CB9", "#368BBA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.backgroundImage}
          >
            <View style={styles.headerView}>
              <View style={{ marginHorizontal: 20 }}>
                <Text style={styles.nameText}>
                  {userInfo?.user?.firstName ?? ""}{" "}
                  {userInfo?.user?.lastName ?? ""}
                </Text>
                <Text style={styles.mobileText}>
                  {userInfo?.user?.role ?? ""}
                </Text>
              </View>
            </View>
          </LinearGradient>
          <View style={styles.borderList}>
            <FlatList
              data={list}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <CustomList
                  item={item}
                  Logout={() => {
                    handleLogout();
                  }}
                  totalItems={list.length}
                  index={index}
                />
              )}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
              )}
              scrollEventThrottle={16}
            />
          </View>
        </>
      )}
      <FloatingChatIcon />
    </View>
  );
};

export default More;
