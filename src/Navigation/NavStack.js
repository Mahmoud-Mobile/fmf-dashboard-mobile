import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import SubEvent from "../screens/SubEvent";
import MyTabs from "../Navigation/MyTabs";
import NoInternetScreen from "../screens/NoInternetScreen";
import FlightDetails from "../screens/FlightDetails";
import PreviewSeats from "../screens/PreviewSeats";
import ShowSeats from "../screens/ShowSeats";
import CameraQRScanner from "../screens/CameraQRScanner";
import ZebraQR from "../screens/ZebraQR";
import Chat from "../screens/Chat";
import DesignatedCars from "../screens/DesignatedCars";
import Hotels from "../screens/Hotels";
import NotificationScreen from "../screens/NotificationScreen";
import Profile from "../screens/Profile";
import AudienceProfile from "../screens/AudienceProfile";
import Survey from "../screens/Survey";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import About from "../screens/About";
import { Colors } from "../Global/colors";
import { Fonts } from "../Global/fonts";
import NetInfo from "@react-native-community/netinfo";
import * as SecureStore from "expo-secure-store";
import { logout } from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";

const Stack = createStackNavigator();

const NavStack = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        navigation.navigate("NoInternet");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const checkToken = async () => {
    const token = await SecureStore.getItemAsync("accessToken");
    return !!token; // Returns true if token exists
  };

  useEffect(() => {
    const verifyLogin = async () => {
      const loggedIn = await checkToken();
      setIsLoggedIn(loggedIn);
      if (!loggedIn) {
        dispatch(logout());
      }
      setIsLoading(false); // Set loading to false once checking is done
    };

    verifyLogin();
  }, [dispatch]);

  // Wait until loading is complete before rendering the navigator
  if (isLoading) {
    return null; // You can return a loading indicator if needed
  }

  return (
    <Stack.Navigator
      initialRouteName={isLoggedIn ? "SubEvent" : "Login"} // Use the login state to set the initial route
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="SubEvent"
        component={SubEvent}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <Stack.Screen
        name="MyTabs"
        component={MyTabs}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="NoInternet"
        component={NoInternetScreen}
        options={{
          title: "No internet connection",
          headerBackTitleVisible: false,
          headerLeft: false,
          animationEnabled: false,
          headerStyle: {
            backgroundColor: Colors.Primary,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: Fonts.FONT_MEDIUM,
          },
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="FlightDetails"
        component={FlightDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PreviewSeats"
        component={PreviewSeats}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ShowSeats"
        component={ShowSeats}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CameraQRScanner"
        component={CameraQRScanner}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ZebraQR"
        component={ZebraQR}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DesignatedCars"
        component={DesignatedCars}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Hotels"
        component={Hotels}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AudienceProfile"
        component={AudienceProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Survey"
        component={Survey}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default NavStack;
