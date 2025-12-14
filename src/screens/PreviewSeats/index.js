import React, { useEffect, useMemo } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import CustomHeader from "../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./Styles";
import { fetchSeatingPlans } from "../../redux/actions/api";
import { SeatingCanvas, LoadingState, ErrorState } from "./components";
import { parseSeatingData } from "./utils/parseSeatingData";
import { calculateScale } from "./utils/calculateScale";

const SeatingPlanPreview = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { eventId, subEventID } = route.params || {};
  const { seatingPlans, loading, error } = useSelector((state) => state.api);

  useEffect(() => {
    if (eventId && subEventID) {
      dispatch(fetchSeatingPlans(eventId, subEventID));
      console.log("seatingPlans", seatingPlans);
    }
  }, [eventId, subEventID, dispatch]);

  const handleBack = () => {
    navigation.goBack();
  };

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
    if (hasMissingParams) {
      return <ErrorState message="Event ID or Subevent ID is missing" />;
    }

    if (loading) {
      return <LoadingState />;
    }

    if (error) {
      return <ErrorState message={error} />;
    }

    if (!hasSeatingPlan) {
      return <ErrorState message="No seating plan found" />;
    }

    return (
      <SeatingCanvas
        layoutElements={layoutElements}
        seatsMap={seatsMap}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        scale={scale}
      />
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader leftLabel="Preview" onLeftButtonPress={handleBack} />
      {renderContent()}
    </View>
  );
};

export default SeatingPlanPreview;
