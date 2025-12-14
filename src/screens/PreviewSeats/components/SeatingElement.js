import React from "react";
import { View, TouchableOpacity, Alert, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../../Global/colors";

const SeatingElement = ({ element, seat, scale }) => {
  const { type, x, y, width, height, rotation = 0, id } = element;

  // Validate position and size data
  const validX = typeof x === "number" && !isNaN(x) ? x : 0;
  const validY = typeof y === "number" && !isNaN(y) ? y : 0;
  const validWidth =
    typeof width === "number" && !isNaN(width) && width > 0 ? width : 20;
  const validHeight =
    typeof height === "number" && !isNaN(height) && height > 0 ? height : 20;

  const scaledX = validX * scale;
  const scaledY = validY * scale;
  const scaledWidth = validWidth * scale;
  const scaledHeight = validHeight * scale;

  // Make table icons smaller (60% of calculated size)
  // Ensure minimum icon size so seats are visible
  const baseIconSize = Math.max(Math.min(scaledWidth, scaledHeight), 8);
  const iconSize = type === "table" ? baseIconSize * 0.6 : baseIconSize;

  const elementStyle = {
    position: "absolute",
    left: scaledX,
    top: scaledY,
    width: Math.max(scaledWidth, 8),
    height: Math.max(scaledHeight, 8),
    transform: [{ rotate: `${rotation || 0}deg` }],
    justifyContent: "center",
    alignItems: "center",
  };

  const handlePress = () => {
    let seatId = "";
    let title = "";

    if (type === "table") {
      title = "Table Information";
      seatId = `Table ID: ${id}`;
      if (element.properties?.label) {
        seatId += `\nLabel: ${element.properties.label}`;
      }
    } else if (type === "chair") {
      title = "Seat Information";
      if (seat?.seatIdentifier) {
        seatId = `Seat ID: ${seat.seatIdentifier}`;
      } else if (seat?.id) {
        seatId = `Seat ID: ${seat.id}`;
      } else {
        seatId = `Element ID: ${id}`;
      }
      if (seat?.status) {
        seatId += `\nStatus: ${seat.status}`;
      }
    } else if (type === "stage") {
      title = "Stage Information";
      seatId = `Stage ID: ${id}`;
      if (element.properties?.label) {
        seatId += `\nLabel: ${element.properties.label}`;
      }
    }

    Alert.alert(title, seatId, [{ text: "OK" }]);
  };

  // if (type === "table") {
  //   return (
  //     <TouchableOpacity
  //       key={id}
  //       style={elementStyle}
  //       onPress={handlePress}
  //       activeOpacity={0.7}
  //     >
  //       <MaterialIcons
  //         name="table-restaurant"
  //         size={iconSize}
  //         color={Colors.gray}
  //       />
  //     </TouchableOpacity>
  //   );
  // }

  if (type === "chair") {
    const seatStatus = seat?.status || "AVAILABLE";
    const seatColor = getSeatColor(seatStatus);

    return (
      <TouchableOpacity
        key={id}
        style={elementStyle}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <MaterialIcons name="event-seat" size={iconSize} color={seatColor} />
      </TouchableOpacity>
    );
  }

  if (type === "stage") {
    const stageLabel = element.properties?.label || "Stage";
    return (
      <TouchableOpacity
        key={id}
        style={[
          elementStyle,
          {
            backgroundColor: Colors.Primary,
            borderRadius: 4,
            borderWidth: 2,
            borderColor: Colors.DarkGray,
            opacity: 0.9,
          },
        ]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Text
          style={{
            color: Colors.White,
            fontSize: Math.max(Math.min(scaledWidth / 10, 16), 10),
            fontWeight: "bold",
            textAlign: "center",
          }}
          numberOfLines={2}
        >
          {stageLabel}
        </Text>
      </TouchableOpacity>
    );
  }

  // Rows are visual guides, don't render
  if (type === "row") {
    return null;
  }

  return null;
};

/**
 * Gets the color for a seat based on its status
 */
const getSeatColor = (status) => {
  switch (status) {
    case "AVAILABLE":
      return Colors.Success;
    case "OCCUPIED":
      return Colors.Error;
    default:
      return Colors.gray;
  }
};

export default SeatingElement;
