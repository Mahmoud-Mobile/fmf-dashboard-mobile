import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Colors } from "../../../../Global/colors";

const NoShowModal = ({
  visible,
  noShowReason,
  onReasonChange,
  onSubmit,
  onClose,
}) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View
        style={{
          backgroundColor: Colors.White,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
          paddingBottom: 40,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 15,
            color: Colors.Black,
          }}
        >
          Mark as No Show
        </Text>
        <Text
          style={{
            fontSize: 14,
            marginBottom: 10,
            color: Colors.Gray,
          }}
        >
          Please enter the reason for no show:
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: Colors.Gray,
            borderRadius: 8,
            padding: 12,
            minHeight: 100,
            textAlignVertical: "top",
            marginBottom: 20,
          }}
          placeholder="Enter reason..."
          placeholderTextColor="#828282"
          value={noShowReason}
          onChangeText={onReasonChange}
          multiline
          numberOfLines={4}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: Colors.Gray || "#E0E0E0",
              padding: 15,
              borderRadius: 8,
              marginRight: 10,
              alignItems: "center",
            }}
            onPress={onClose}
          >
            <Text style={{ color: Colors.White, fontSize: 16 }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: Colors.Primary,
              padding: 15,
              borderRadius: 8,
              alignItems: "center",
            }}
            onPress={onSubmit}
          >
            <Text style={{ color: Colors.White, fontSize: 16 }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NoShowModal;

