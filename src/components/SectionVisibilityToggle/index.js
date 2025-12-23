import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../Global/colors";
import styles from "./styles";

const SectionVisibilityToggle = ({
  sections = [],
  visibleSections = {},
  onToggleSection,
  iconName = "tune",
  activeIconName = "close",
  placementStyle,
  panelStyle,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const resolvedVisibility = useMemo(() => {
    return sections.reduce((acc, section) => {
      acc[section.id] = visibleSections?.[section.id] !== false;
      return acc;
    }, {});
  }, [sections, visibleSections]);

  const handlePanelToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClosePanel = () => {
    setIsOpen(false);
  };

  const handleSectionToggle = (sectionId) => {
    if (onToggleSection) {
      onToggleSection(sectionId);
    }
  };

  if (!sections.length) {
    return null;
  }

  return (
    <>
      {isOpen && (
        <TouchableWithoutFeedback onPress={handleClosePanel}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
      )}
      {isOpen && (
        <View style={[styles.panelContainer, panelStyle]}>
          {!!label && <Text style={styles.panelLabel}>{label}</Text>}
          {sections.map((section) => (
            <View key={section.id} style={styles.panelRow}>
              <Text style={styles.panelRowLabel}>{section.label}</Text>
              <Switch
                value={resolvedVisibility[section.id]}
                onValueChange={() => handleSectionToggle(section.id)}
                trackColor={{
                  false: Colors.LightGray,
                  true: Colors.Primary,
                }}
                thumbColor={Colors.White}
              />
            </View>
          ))}
        </View>
      )}
      <TouchableOpacity
        style={[styles.fabButton, placementStyle]}
        onPress={handlePanelToggle}
        activeOpacity={0.85}
        accessibilityLabel="Toggle section visibility"
        accessibilityState={{ expanded: isOpen }}
      >
        <MaterialIcons
          name={isOpen ? activeIconName : iconName}
          size={24}
          color={Colors.White}
        />
      </TouchableOpacity>
    </>
  );
};

export default SectionVisibilityToggle;
