import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { CameraView } from "expo-camera";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Colors } from "../../Global/colors";
import CustomHeader from "../../components/CustomHeader";
import { styles } from "./Styles";
import { resource_Checkin } from "../../webservice/apiConfig";
import SuccessWithAddCompanions from "./components/SuccessWithAddCompanions";
import CheckInDeclineModal from "./components/CheckInDeclineModal";
import CheckInSuccessModal from "./components/CheckInSuccessModal";
import moment from "moment";

const CheckIn_Area = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { selectedEvent } = useSelector((state) => state.api);
  const { area } = route.params || {};
  const resourceId = area?.id;
  const resourceLocation = area?.location;

  const [manualCode, setManualCode] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isLockedRef = useRef(false);
  const isFocused = useIsFocused();
  const successWithAddCompanionsRef = useRef(null);
  const checkInSuccessModalRef = useRef(null);
  const checkInDeclineModalRef = useRef(null);

  const handleScanned = useCallback(
    async (qrCode) => {
      if (isLockedRef.current || isModalVisible || !qrCode) return;
      isLockedRef.current = true;
      setIsLoading(true);
      setErrorMessage(null);
      setUserInfo(null);

      try {
        const payload = {
          qrCode: qrCode,
          scanLocation: resourceLocation || "",
        };

        const response = await resource_Checkin(
          selectedEvent?.id,
          resourceId,
          payload
        );
        const transformedUserInfo = {
          image: response?.participant?.profilePicture || null,
          name: response?.participant
            ? `${response.participant.firstName || ""} ${
                response.participant.lastName || ""
              }`.trim()
            : null,
          email: response?.participant?.email || null,
          mobile: response?.participant?.phone || null,
          visitorCode: response?.participant?.qrCode || null,
          qrCode: response?.participant?.qrCode || null,
        };

        setUserInfo(transformedUserInfo);
        setIsModalVisible(true);
        successWithAddCompanionsRef.current?.open();
      } catch (error) {
        const errorData = error?.response?.data || error?.data || {};
        const errorMsg =
          errorData?.message ||
          error?.message ||
          errorData?.error ||
          "Failed to check in. Please try again.";
        setErrorMessage(errorMsg);
        setIsModalVisible(true);
        checkInDeclineModalRef.current?.open();
      } finally {
        setIsLoading(false);
      }
    },
    [selectedEvent?.id, resourceId, resourceLocation, isModalVisible]
  );

  const handleCompleteCheckIn = useCallback((companionsCount) => {
    console.log("Completing check-in with companions:", companionsCount);
    successWithAddCompanionsRef.current?.close();

    setTimeout(() => {
      setIsModalVisible(true);
      checkInSuccessModalRef.current?.open();
    }, 300);
  }, []);

  const handleScanAnother = useCallback(() => {
    checkInSuccessModalRef.current?.close();
    setIsModalVisible(false);
    isLockedRef.current = false;
    setUserInfo(null);
    setErrorMessage(null);
  }, []);

  const handleTryAgain = useCallback(() => {
    setIsModalVisible(false);
    isLockedRef.current = false;
    setErrorMessage(null);
  }, []);

  const handleBarCodeScanned = useCallback(
    ({ data }) => {
      if (isModalVisible || isLockedRef.current) return;
      handleScanned(String(data));
    },
    [handleScanned, isModalVisible]
  );

  const handleManualCodeSubmit = useCallback(() => {
    if (!manualCode.trim()) return;
    handleScanned(manualCode.trim());
    setManualCode("");
  }, [manualCode, handleScanned]);

  useEffect(() => {
    if (!isFocused) {
      isLockedRef.current = false;
      setIsModalVisible(false);
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <CustomHeader
        leftLabel="Camera Scanner"
        onLeftButtonPress={() => navigation.goBack()}
      />

      <View style={styles.manualInputContainer}>
        <TextInput
          style={styles.manualInput}
          placeholder="Enter code manually"
          placeholderTextColor={Colors.SecondaryText}
          value={manualCode}
          onChangeText={setManualCode}
          onSubmitEditing={handleManualCodeSubmit}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={[
            styles.submitButton,
            !manualCode.trim() && styles.submitButtonDisabled,
          ]}
          onPress={handleManualCodeSubmit}
          disabled={!manualCode.trim()}
          activeOpacity={0.7}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {isFocused ? (
          <CameraView
            style={StyleSheet.absoluteFill}
            facing="back"
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            onBarcodeScanned={handleBarCodeScanned}
          />
        ) : null}
        {isLoading ? (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.processingText}>Processing QR Code...</Text>
          </View>
        ) : null}

        <View style={styles.scanArea}>
          <View style={styles.scanFrame} />
          <Text style={styles.scanText}>Position QR code within the frame</Text>
        </View>
      </View>

      <SuccessWithAddCompanions
        ref={successWithAddCompanionsRef}
        visitorInfo={userInfo}
        onCompleteCheckIn={handleCompleteCheckIn}
        onClose={handleScanAnother}
      />
      <CheckInSuccessModal
        ref={checkInSuccessModalRef}
        visitorName={userInfo?.name}
        location={resourceLocation || area?.location}
        dateTime={moment().format("MMM DD, YYYY hh:mm A")}
        onClose={handleScanAnother}
      />
      <CheckInDeclineModal
        ref={checkInDeclineModalRef}
        message={errorMessage}
        onClose={handleTryAgain}
      />
    </View>
  );
};

export default CheckIn_Area;
