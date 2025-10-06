import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  Animated,
  FlatList,
  ImageBackground,
} from "react-native";
import styles from "./Styles";
import { useNavigation } from "@react-navigation/native";
import CustomList from "./components";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import * as SecureStore from "expo-secure-store";
import { fetchProfile } from "../../redux/actions/api";
import LoadingModal from "../../components/LoadingModal";

const More = () => {
  const navigation = useNavigation();
  const [scrollY] = useState(new Animated.Value(0));
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.api);

  // useEffect(() => {
  //   dispatch(fetchProfile());
  // }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await SecureStore.getItemAsync("userInfo");
        const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;

        console.log(parsedUserInfo);
      } catch (error) {
        console.error("Error retrieving user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    await dispatch(logout());
    navigation.navigate("Login");
  };

  const list = [
    // Removed navigation items for deleted screens
    // Only keeping logout functionality
    {
      id: 1,
      title: "logout",
      icon: "Logout_Icon",
      navigation: null,
    },
  ];

  return (
    <View style={styles.container} edges={{ top: "additive" }}>
      {loading ? (
        <LoadingModal visible={loading} />
      ) : (
        <>
          <ImageBackground style={styles.backgroundImage}>
            <View style={styles.headerView}>
              <Image
                style={styles.imageView}
                source={{ uri: "https://picsum.photos/200" }}
              />
              <View style={{ marginHorizontal: 20 }}>
                <Text style={styles.nameText}>{profile?.fname}</Text>
                <Text style={styles.mobileText}>00290228447</Text>
              </View>
            </View>
          </ImageBackground>
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
