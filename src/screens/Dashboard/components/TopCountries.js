import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Storage } from "expo-storage";
import { useSelector, useDispatch } from "react-redux";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";
import { horizontalMargin } from "../../../config/metrics";
import { fetchTopCountries } from "../../../redux/actions/dashboardActions";
import DataTableCard from "../../../components/DataTableCard";

const TopCountries = () => {
  const dispatch = useDispatch();
  const { selectedEvent } = useSelector((state) => state.api) || {};
  const { topCountries, topCountriesLoading, topCountriesError } = useSelector(
    (state) => state.dashboard
  ) || {
    topCountries: [],
    topCountriesLoading: false,
    topCountriesError: null,
  };
  const [currentEnvironment, setCurrentEnvironment] = useState("fmf");

  useEffect(() => {
    const loadEnvironment = async () => {
      try {
        const selectedCategory = await Storage.getItem({
          key: "selected-category",
        });
        setCurrentEnvironment(selectedCategory || "fmf");
      } catch (error) {
        setCurrentEnvironment("fmf");
      }
    };
    loadEnvironment();
  }, []);

  useEffect(() => {
    if (selectedEvent?.id && currentEnvironment === "fmf") {
      dispatch(fetchTopCountries(selectedEvent.id, 20));
    }
  }, [selectedEvent?.id, currentEnvironment, dispatch]);

  // Don't render if not in FMF environment
  if (currentEnvironment !== "fmf") {
    return null;
  }

  if (topCountriesLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={Colors.Primary} />
        </View>
      </View>
    );
  }

  if (topCountriesError || !topCountries || topCountries.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <DataTableCard
        title="Top 20 Countries"
        columns={[
          {
            title: "Country",
            key: "country",
            render: ({ item }) => (
              <View style={styles.countryCell}>
                <Text style={styles.rankText}>{item.rank}.</Text>
                <Text style={styles.countryText}>{item.country}</Text>
              </View>
            ),
          },
          {
            title: "Registration",
            key: "registration",
            render: ({ item }) => (
              <View style={styles.registrationCell}>
                <Text style={styles.registrationText}>
                  {item.registration.toLocaleString()}
                </Text>
                {/* <View style={styles.changeContainer}>
                  <Text style={styles.changeArrow}>↑</Text>
                  <Text style={styles.changeText}>
                    {Math.abs(item.change || 0)}%
                  </Text>
                </View> */}
              </View>
            ),
          },
        ]}
        data={topCountries}
        onPress={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: horizontalMargin,
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  countryCell: {
    flexDirection: "row",
    alignItems: "center",
  },
  rankText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    marginRight: 4,
  },
  countryText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.PrimaryText,
  },
  registrationCell: {
    alignItems: "flex-end",
  },
  registrationText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  changeArrow: {
    fontSize: 10,
    color: Colors.Success,
    marginRight: 2,
  },
  changeText: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Success,
  },
});

export default TopCountries;
