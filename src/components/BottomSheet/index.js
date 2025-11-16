import React, {
  useCallback,
  useImperativeHandle,
  forwardRef,
  useMemo,
} from "react";
import { TouchableOpacity, Text, View } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import styles from "./Styles";

const DEFAULT_SNAP_POINTS = ["50%", "60%", "70%", "90%"];

const BottomSheetComponent = forwardRef(
  (
    {
      children,
      snapPoints,
      enablePanDownToClose = true,
      backgroundStyle,
      title,
    },
    ref
  ) => {
    const bottomSheetRef = React.useRef(null);

    const memoizedSnapPoints = useMemo(() => {
      return snapPoints || DEFAULT_SNAP_POINTS;
    }, [snapPoints]);

    useImperativeHandle(ref, () => ({
      open: () => {
        if (bottomSheetRef.current) {
          try {
            bottomSheetRef.current.snapToIndex(1);
          } catch (error) {
            console.log("Error opening bottom sheet:", error);
          }
        } else {
          console.log("BottomSheet ref is null");
        }
      },
      close: () => {
        if (bottomSheetRef.current) {
          try {
            bottomSheetRef.current.close();
          } catch (error) {
            console.log("Error closing bottom sheet:", error);
          }
        }
      },
    }));

    const handleSheetChanges = useCallback((index) => {
      console.log("Sheet index changed to:", index);
    }, []);

    const renderBackdrop = useCallback(
      (props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      ),
      []
    );

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={memoizedSnapPoints}
        enablePanDownToClose={enablePanDownToClose}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        backgroundStyle={[styles.bottomSheetBackground, backgroundStyle]}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            {title ? <Text style={styles.title}>{title}</Text> : <View />}
            <TouchableOpacity
              onPress={() => bottomSheetRef.current?.close()}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

BottomSheetComponent.displayName = "BottomSheet";
export default BottomSheetComponent;
