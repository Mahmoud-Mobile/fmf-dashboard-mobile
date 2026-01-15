import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";
import { View, Alert, ActivityIndicator, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

import CustomHeader from "../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./Styles";
import { fetchSeatingPlans } from "../../redux/actions/api";
import { SeatingCanvas, ErrorState, ManualRegisterModal } from "./components";
import SeatDetailsModal from "./components/SeatDetailsModal";
import { parseSeatingData } from "./utils/parseSeatingData";
import { calculateScale } from "./utils/calculateScale";
import { subEvent_ManualRegister } from "../../webservice/apiConfig";
import { Colors } from "../../Global/colors";

const SeatingPlanPreview = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { eventId, subEventID, qrCode, manualRegisterMode } =
    route.params || {};
  const { seatingPlans, loading, error } = useSelector((state) => state.api);
  const [isRegistering, setIsRegistering] = useState(false);
  const [selectedSeatId, setSelectedSeatId] = useState(null);
  const [selectedSeatInfo, setSelectedSeatInfo] = useState(null);
  const manualRegisterModalRef = useRef(null);
  const seatDetailsModalRef = useRef(null);

  useEffect(() => {
    if (eventId && subEventID) {
      dispatch(fetchSeatingPlans(eventId, subEventID));
      // console.log("seatingPlans", seatingPlans);
    }
  }, [eventId, subEventID, dispatch]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSeatSelection = useCallback(
    (seatId, seatInfo) => {
      if (!seatId) {
        return;
      }

      // Get seat info from seatsMap if not provided
      const fullSeatInfo = seatInfo || seatsMap[seatId] || { id: seatId };

      // In manual register mode, show registration modal
      if (manualRegisterMode && qrCode) {
        setSelectedSeatId(seatId);
        manualRegisterModalRef.current?.open();
      } else {
        // In preview mode, show seat details modal
        // Find assignments for this seat
        const seatAssignments =
          seatingPlans?.assignments?.filter(
            (assignment) => assignment.seatId === seatId
          ) || [];

        setSelectedSeatInfo({
          ...fullSeatInfo,
          assignments: seatAssignments,
        });
        seatDetailsModalRef.current?.open();
      }
    },
    [manualRegisterMode, qrCode, seatsMap, seatingPlans]
  );

  const handleManualRegister = useCallback(
    async (notes) => {
      if (!selectedSeatId) return;

      setIsRegistering(true);
      try {
        const payload = {
          qrCode: qrCode,
          seatId: selectedSeatId,
          notes: notes || " ",
        };
        await subEvent_ManualRegister(eventId, subEventID, payload);
        Alert.alert(
          "Success",
          "Guest has been successfully registered to the sub-event.",
          [
            {
              text: "OK",
              onPress: () => navigation.goBack(),
            },
          ]
        );
      } catch (error) {
        const errorData = error?.response?.data || error?.data || {};
        const errorMsg =
          errorData?.message ||
          error?.message ||
          errorData?.error ||
          "Failed to register. Please try again.";
        Alert.alert("Registration Failed", errorMsg);
      } finally {
        setIsRegistering(false);
        setSelectedSeatId(null);
      }
    },
    [selectedSeatId, qrCode, eventId, subEventID, navigation]
  );

  const handleCancelRegister = useCallback(() => {
    setSelectedSeatId(null);
  }, []);

  const handleCloseSeatDetails = useCallback(() => {
    setSelectedSeatInfo(null);
  }, []);

  // Parse seating data
  const { layoutElements, seatsMap, canvasWidth, canvasHeight } =
    useMemo(() => {
      const parsed = parseSeatingData(seatingPlans);
      console.log("Parsed seating data:", {
        layoutElementsCount: parsed.layoutElements.length,
        seatsMapCount: Object.keys(parsed.seatsMap).length,
        canvasSize: `${parsed.canvasWidth}x${parsed.canvasHeight}`,
      });
      return parsed;
    }, [seatingPlans]);

  // Calculate scale for rendering
  const scale = useMemo(
    () => calculateScale(canvasWidth, canvasHeight),
    [canvasWidth, canvasHeight]
  );

  const hasMissingParams = !eventId || !subEventID;
  const hasSeatingPlan = seatingPlans?.seatingPlan;

  const renderContent = () => {
    if (error) {
      return <ErrorState message="" />;
    }

    if (!hasSeatingPlan) {
      return <ErrorState message=" " />;
    }

    return (
      <>
        {manualRegisterMode && (
          <View style={styles.manualRegisterBanner}>
            <View style={styles.manualRegisterIconContainer}>
              <MaterialIcons name="event-seat" size={24} color={Colors.White} />
            </View>
            <View style={styles.manualRegisterContent}>
              <Text style={styles.manualRegisterTitle}>
                Manual Registration Mode
              </Text>
              <View style={styles.manualRegisterQRContainer}>
                <Text style={styles.manualRegisterLabel}>QR Code:</Text>
                <View style={styles.manualRegisterQRBadge}>
                  <MaterialIcons
                    name="qr-code"
                    size={14}
                    color={Colors.Primary}
                  />
                  <Text style={styles.manualRegisterQRText}>{qrCode}</Text>
                </View>
              </View>
              <Text style={styles.manualRegisterSubtext}>
                Tap on a seat to register
              </Text>
            </View>
          </View>
        )}
        {isRegistering && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingModal}>
              <ActivityIndicator size="large" color={Colors.Primary} />
              <Text style={styles.loadingModalText}>Registering...</Text>
            </View>
          </View>
        )}
        <SeatingCanvas
          layoutElements={layoutElements}
          seatsMap={seatsMap}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          scale={scale}
          onSeatPress={handleSeatSelection}
          isManualRegisterMode={manualRegisterMode}
        />
        {manualRegisterMode && (
          <ManualRegisterModal
            ref={manualRegisterModalRef}
            qrCode={qrCode}
            seatId={selectedSeatId}
            onRegister={handleManualRegister}
            onCancel={handleCancelRegister}
          />
        )}
        {!manualRegisterMode && (
          <SeatDetailsModal
            ref={seatDetailsModalRef}
            seatInfo={selectedSeatInfo}
            onClose={handleCloseSeatDetails}
          />
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        leftLabel={manualRegisterMode ? "Manual Register" : "Preview"}
        onLeftButtonPress={handleBack}
      />
      {renderContent()}
    </View>
  );
};

export default SeatingPlanPreview;
