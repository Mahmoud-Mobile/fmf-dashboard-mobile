import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  StatusBar,
  Alert,
} from "react-native";
import styles from "./Styles";
import { useNavigation } from "@react-navigation/native";
import CustomInput from "../../components/CustomInput";
import CustomPressable from "../../components/CustomPressable";
import EnvironmentSelector from "./components/EnvironmentSelector";
import { setEmail, setPassword } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authActions";
import * as Notifications from "expo-notifications";

const Login = () => {
  const navigation = useNavigation();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state.auth);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deviceToken, setDeviceToken] = useState(null);

  const validateInputs = () => {
    let isValid = true;
    if (email.trim().length < 1) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }
    if (password.trim().length < 1) {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }
    if (!selectedCategory) {
      setCategoryError(true);
      isValid = false;
    } else {
      setCategoryError(false);
    }
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateInputs()) {
      return;
    }

    let token = deviceToken;
    if (!token) {
      try {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus === "granted") {
          const tokenData = await Notifications.getDevicePushTokenAsync();
          token = tokenData.data;
          setDeviceToken(token);
        }
      } catch (error) {
        console.log("Error getting device token:", error);
      }
    }

    const body = {
      email: email,
      password: password,
      deviceToken: token || "",
    };
    setLoading(true);
    try {
      const response = await dispatch(login(body, true)); // showAlert=true to show 400 errors
      // console.log("response", JSON.stringify(response, null, 2));
      if (response.type === "LOGIN_SUCCESS") {
        navigation.reset({
          index: 0,
          routes: [{ name: "MainEvent" }],
        });
      }
      // Error alerts are handled in Gate.js when showAlert=true
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // Additional error handling if needed (when showAlert=false)
      if (!error?.response && error?.status === 400) {
        Alert.alert(
          "Login Failed",
          error.errorMessage || "Invalid credentials"
        );
      }
    }
  };

  useEffect(() => {
    if (selectedCategory === "fmf") {
      // dispatch(setEmail("fmf@lead-360.co"));
      // dispatch(setPassword("password123"));
    } else if (selectedCategory === "offerHome") {
      dispatch(setEmail("demo@lead-360.co"));
      dispatch(setPassword("password123"));
    }
  }, [selectedCategory]);

  useEffect(() => {
    // Get device token on component mount
    const getDeviceToken = async () => {
      try {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus === "granted") {
          const tokenData = await Notifications.getDevicePushTokenAsync();
          setDeviceToken(tokenData.data);
        }
      } catch (error) {
        console.log("Error getting device token:", error);
      }
    };

    getDeviceToken();
  }, []);

  const handleCategoryChange = (categoryValue) => {
    setSelectedCategory(categoryValue);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../../Assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text style={styles.subtitleText}>
              Please login to your account to continue
            </Text>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.titleText}>Sign In</Text>

            <EnvironmentSelector
              onCategoryChange={handleCategoryChange}
              error={categoryError}
              onErrorChange={setCategoryError}
            />

            <View style={styles.inputContainer}>
              <CustomInput
                label="Email Address"
                value={email}
                onChangeText={(text) => dispatch(setEmail(text))}
                secureTextEntry={false}
                isError={emailError}
                ref={emailRef}
                onSubmitEditing={() => {
                  passwordRef.current.focus();
                }}
                returnKeyType="next"
                keyboardType="email-address"
                placeholder="Enter your email"
              />

              <CustomInput
                label="Password"
                value={password}
                onChangeText={(text) => dispatch(setPassword(text))}
                secureTextEntry
                isError={passwordError}
                ref={passwordRef}
                maxLength={30}
                onSubmitEditing={handleLogin}
                placeholder="Enter your password"
              />
            </View>

            <View style={styles.buttonContainer}>
              <CustomPressable
                onPress={handleLogin}
                title="Sign In"
                isLoading={loading}
                disabled={loading}
              />
            </View>

            <Text style={styles.footerText}>LEAD Dashboard</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
