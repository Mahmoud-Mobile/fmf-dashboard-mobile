import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import MyTabs from "../Navigation/MyTabs";
import NoInternetScreen from "../screens/NoInternetScreen";
import GuestDetails from "../screens/GuestDetails";
import PreviewSeats from "../screens/PreviewSeats";
import CameraQRScanner from "../screens/CameraQRScanner";
import ZebraQR from "../screens/ZebraQR";
import Chat from "../screens/Chat";
import DesignatedCars from "../screens/DesignatedCars";
import Hotels from "../screens/Hotels";
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
      initialRouteName={isLoggedIn ? "MyTabs" : "Login"} // Use the login state to set the initial route
      screenOptions={{ headerShown: false }}
    >
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
        name="GuestDetails"
        component={GuestDetails}
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
    </Stack.Navigator>
  );
};

export default NavStack;
