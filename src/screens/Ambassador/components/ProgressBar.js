import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";
import styles from "./ProgressBarStyles";

const ProgressBar = ({ stages, currentStage }) => {
  return (
    <View style={styles.container}>
      {stages.map((stage, index) => {
        const isCompleted = index < currentStage;
        const isCurrent = index === currentStage;
        const isUpcoming = index > currentStage;

        return (
          <React.Fragment key={index}>
            <View style={styles.stageContainer}>
              <View
                style={[
                  styles.stageCircle,
                  isCompleted && styles.stageCircleCompleted,
                  isCurrent && styles.stageCircleCurrent,
                  isUpcoming && styles.stageCircleUpcoming,
                ]}
              >
                {isCompleted ? (
                  <MaterialIcons
                    name="check"
                    size={10}
                    color={Colors.White}
                  />
                ) : (
                  <Text
                    style={[
                      styles.stageNumber,
                      isCurrent && styles.stageNumberCurrent,
                      isUpcoming && styles.stageNumberUpcoming,
                    ]}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text
                style={[
                  styles.stageLabel,
                  isCompleted && styles.stageLabelCompleted,
                  isCurrent && styles.stageLabelCurrent,
                  isUpcoming && styles.stageLabelUpcoming,
                ]}
              >
                {stage}
              </Text>
            </View>
            {index < stages.length - 1 && (
              <View
                style={[
                  styles.connector,
                  isCompleted && styles.connectorCompleted,
                  !isUpcoming && styles.connectorActive,
                  isUpcoming && styles.connectorUpcoming,
                ]}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};

export default ProgressBar;

