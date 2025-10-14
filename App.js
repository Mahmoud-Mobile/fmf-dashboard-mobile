import React, { useEffect, useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import NavStack from "./src/Navigation/NavStack";
import * as Font from "expo-font";
import ToastWrapper from "./src/components/ToastWrapper";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import navigationService from "./src/Global/navRef";
import * as Notifications from "expo-notifications";
import { CommonActions } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navigationRef = useRef();
  const notificationListener = useRef();
  const responseListener = useRef();

  const loadFonts = async () => {
    await Promise.all([
      Font.loadAsync({
        FONT_LIGHT: require("./assets/fonts/Montserrat-Light.ttf"),
        FONT_REGULAR: require("./assets/fonts/Montserrat-Regular.ttf"),
        FONT_MEDIUM: require("./assets/fonts/Montserrat-Medium.ttf"),
        FONT_Semi: require("./assets/fonts/Montserrat-SemiBold.ttf"),
        FONT_BOLD: require("./assets/fonts/Montserrat-Bold.ttf"),
      }),
    ]);
    setFontsLoaded(true);
  };

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        //Parse a notification once it is recieved when app is opened
        //alert("tapped!!" + JSON.stringify(notification?.request?.content.data));
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        navigate("Notification");
      });

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    loadFonts();
  }, []);

  useEffect(() => {
    navigationService.navigation = navigationRef.current;
  }, [navigationRef]);

  // Wait for fonts to load
  if (!fontsLoaded) {
    return null; // You can return a loading indicator if needed
  }

  const navigate = (name, params) => {
    console.log("getCurrentRoute", navigationRef.current?.getCurrentRoute());
    navigationRef.current.dispatch((state) => {
      const routes = state.routes.filter(
        (r) => !["Notification"].includes(r.name)
      );
      return CommonActions.reset({
        ...state,
        routes,
        index: 0,
      });
    });

    navigationRef.current.navigate(name, params);
  };

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <ToastWrapper>
            <NavigationContainer
              ref={navigationRef}
              onReady={() => {
                navigationService.navigation = navigationRef.current;
              }}
            >
              <NavStack />
            </NavigationContainer>
          </ToastWrapper>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
