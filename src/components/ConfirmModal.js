import React, { useCallback } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./Styles";
import { Colors } from "../Global/colors";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

const ConfirmModal = ({ ref, onChange, onPress, close, title }) => {
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={["40%", "50%"]}
      onChange={onChange}
      handleIndicatorStyle={{ backgroundColor: "#C5CEDB" }}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
    >
      <View style={{ marginTop: 30 }}>
        <Text style={styles.titleText}>{title}</Text>
        <View
          style={{
            marginTop: 30,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={[styles.btnView, { backgroundColor: Colors.Primary }]}
            onPress={onPress}
            activeOpacity={0.7}
          >
            <Text style={styles.btnText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnView, { backgroundColor: Colors.gray }]}
            onPress={close}
            activeOpacity={0.7}
          >
            <Text style={styles.btnText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

export default ConfirmModal;
