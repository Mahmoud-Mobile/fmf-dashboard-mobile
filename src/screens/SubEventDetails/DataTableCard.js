import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";

const DataTableCard = ({
  columns = [],
  data = [],
  onItemPress,
  containerStyle,
}) => {
  const columnCount = columns.length;

  const getColumnFlex = (index) => {
    if (columnCount === 3) {
      return index === 0 ? 0.3 : index === 1 ? 0.4 : 0.3;
    } else if (columnCount === 4) {
      return 0.25;
    } else if (columnCount === 5) {
      return 0.2;
    }
    return 1 / columnCount;
  };

  const renderHeader = () => (
    <View style={styles.tableHeader}>
      {columns.map((column, index) => (
        <View
          key={index}
          style={[styles.headerColumn, { flex: getColumnFlex(index) }]}
        >
          <Text
            style={[styles.headerText, index === 0 && styles.headerTextBold]}
          >
            {column.title}
          </Text>
        </View>
      ))}
    </View>
  );

  const getKey = (item, index) => {
    return item.id || item.key || `row-${index}`;
  };

  const renderRows = () => {
    if (!data || data.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No data available</Text>
        </View>
      );
    }

    return data.map((item, index) => {
      const isLastRow = index === data.length - 1;

      return (
        <TouchableOpacity
          key={getKey(item, index)}
          style={[styles.dataRow, isLastRow && styles.lastRow]}
          onPress={() => {
            if (onItemPress) {
              onItemPress(item);
            }
          }}
          activeOpacity={onItemPress ? 0.7 : 1}
          disabled={!onItemPress}
        >
          {columns.map((column, colIndex) => {
            const cellValue = item[column.key];
            return (
              <View
                key={colIndex}
                style={[styles.dataColumn, { flex: getColumnFlex(colIndex) }]}
              >
                {column.render ? (
                  column.render({ item, value: cellValue, index: colIndex })
                ) : (
                  <Text
                    style={[
                      styles.dataText,
                      colIndex === 0 && styles.dataTextBold,
                    ]}
                  >
                    {cellValue !== undefined && cellValue !== null
                      ? String(cellValue)
                      : ""}
                  </Text>
                )}
              </View>
            );
          })}
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {renderHeader()}
      <View>{renderRows()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    borderRadius: 12,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F3F3F5",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF0F4",
  },
  headerColumn: {
    alignItems: "flex-start",
  },
  headerText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_Semi,
    color: Colors.Primary,
    textTransform: "uppercase",
  },
  headerTextBold: {
    fontFamily: Fonts.FONT_BOLD,
  },
  dataRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
    alignItems: "center",
    minHeight: 40,
  },
  dataColumn: {
    alignItems: "flex-start",
    justifyContent: "center",
    minHeight: 40,
  },
  dataText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
  },
  dataTextBold: {
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.PrimaryText,
    fontSize: 13,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
  },
});

export default DataTableCard;
