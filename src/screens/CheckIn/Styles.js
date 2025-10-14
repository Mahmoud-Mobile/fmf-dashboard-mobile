import { StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.Secondary,
    marginBottom: 16,
    marginHorizontal: 8,
  },
  searchContainer: {
    marginBottom: 16,
    marginHorizontal: 8,
  },
  listContainer: {
    paddingBottom: 96,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.gray,
    textAlign: "center",
    marginTop: 16,
  },
});
