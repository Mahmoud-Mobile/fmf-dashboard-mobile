import React from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";

const SeatingPlanPreview = ({
  visible,
  onClose,
  eventTitle,
  eventSubtitle,
  location,
  date,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Seating Plan Preview</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color={Colors.gray} />
            </Pressable>
          </View>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{eventTitle}</Text>
              <Text style={styles.eventSubtitle}>{eventSubtitle}</Text>

              <View style={styles.infoRow}>
                <MaterialIcons
                  name="location-on"
                  size={16}
                  color={Colors.Primary}
                />
                <Text style={styles.infoText}>{location}</Text>
              </View>

              <View style={styles.infoRow}>
                <MaterialIcons name="event" size={16} color={Colors.Primary} />
                <Text style={styles.infoText}>Event Date: {date}</Text>
              </View>
            </View>

            <View style={styles.seatingPlanContainer}>
              <Text style={styles.sectionTitle}>Seating Plan</Text>

              {/* Mock seating plan visualization */}
              <View style={styles.stageArea}>
                <Text style={styles.stageText}>STAGE</Text>
              </View>

              <View style={styles.seatingGrid}>
                {Array.from({ length: 6 }, (_, rowIndex) => (
                  <View key={rowIndex} style={styles.seatingRow}>
                    {Array.from({ length: 8 }, (_, seatIndex) => (
                      <View
                        key={seatIndex}
                        style={[
                          styles.seat,
                          Math.random() > 0.7 && styles.occupiedSeat,
                        ]}
                      />
                    ))}
                  </View>
                ))}
              </View>

              <View style={styles.legend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendSeat, styles.availableSeat]} />
                  <Text style={styles.legendText}>Available</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendSeat, styles.occupiedSeat]} />
                  <Text style={styles.legendText}>Occupied</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <Pressable style={styles.closeModalButton} onPress={onClose}>
              <Text style={styles.closeModalButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: Colors.White,
    borderRadius: 12,
    width: "100%",
    maxHeight: "80%",
    shadowColor: Colors.Secondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.Secondary,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  eventInfo: {
    marginBottom: 20,
  },
  eventTitle: {
    fontSize: 20,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.Secondary,
    marginBottom: 4,
  },
  eventSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.gray,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.gray,
    marginLeft: 8,
  },
  seatingPlanContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.Secondary,
    marginBottom: 16,
  },
  stageArea: {
    backgroundColor: Colors.Primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  stageText: {
    color: Colors.White,
    fontSize: 16,
    fontFamily: Fonts.FONT_BOLD,
  },
  seatingGrid: {
    alignItems: "center",
    marginBottom: 20,
  },
  seatingRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  seat: {
    width: 20,
    height: 20,
    backgroundColor: Colors.borderColor,
    marginHorizontal: 2,
    borderRadius: 4,
  },
  occupiedSeat: {
    backgroundColor: Colors.Primary,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendSeat: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  availableSeat: {
    backgroundColor: Colors.borderColor,
  },
  legendText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.gray,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.borderColor,
  },
  closeModalButton: {
    backgroundColor: Colors.Primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  closeModalButtonText: {
    color: Colors.White,
    fontSize: 16,
    fontFamily: Fonts.FONT_MEDIUM,
  },
});

export default SeatingPlanPreview;
