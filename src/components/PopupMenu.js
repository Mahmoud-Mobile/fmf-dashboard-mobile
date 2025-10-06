import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../Global/colors";
import { Fonts } from "../Global/fonts";
const PopupMenu = ({
  isMenuVisible,
  setMenuVisible,
  deleteBtnClick,
  editBtnClick,
  defaultBtnClick,
}) => {
  // Removed useTranslation - using static English text

  return (
    <View>
      {isMenuVisible && (
        <Modal
          visible={isMenuVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setMenuVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalContainer}
            activeOpacity={1}
            onPress={() => setMenuVisible(false)}
          >
            <View style={styles.menu}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={defaultBtnClick}
              >
                <FontAwesome
                  name="check-square-o"
                  size={20}
                  color={Colors.Primary}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Make Address Default</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={editBtnClick}>
                <FontAwesome
                  name="edit"
                  size={20}
                  color="green"
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={deleteBtnClick}
              >
                <FontAwesome
                  name="trash"
                  size={20}
                  color="#EF5C42"
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Remove</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => setMenuVisible(false)}
              >
                <FontAwesome
                  name="close"
                  size={20}
                  color="#292D32"
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menu: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
  menuItem: {
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  menuIcon: {
    marginRight: 8,
  },
  menuText: {
    color: Colors.cyan_blue,
    fontFamily: Fonts.FONT_Semi,
    fontSize: 14,
    alignSelf: "center",
    paddingTop: 2,
  },
});

export default PopupMenu;
