import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  StatusBar,
} from "react-native";
import styles from "./Styles";
import { useNavigation } from "@react-navigation/native";
import CustomInput from "../../components/CustomInput";
import CustomPressable from "../../components/CustomPressable";
import { setEmail, setPassword } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authActions";

const Login = () => {
  const navigation = useNavigation();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state.auth);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

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
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateInputs()) {
      return;
    }
    const body = {
      email: email,
      password: password,
    };
    setLoading(true);
    try {
      const response = await dispatch(login(body));

      if (response.type === "LOGIN_SUCCESS") {
        navigation.reset({
          index: 0,
          routes: [{ name: "SubEvent" }],
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(setEmail("fmf@lead-360.co"));
    dispatch(setPassword("password123"));
  }, []);

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
                source={require("../../Assets/FMF-logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text style={styles.subtitleText}>Sign in to your FMF account</Text>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.titleText}>Sign In</Text>

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

            <Text style={styles.footerText}>FMF Dashboard</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
