import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Dimensions, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import CustomHeader from "../../components/CustomHeader";
import CustomCategories from "../../components/CustomCategories";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import LoadingModal from "../../components/LoadingModal";
import EmptyListComponent from "../../components/EmptyListComponent";
import { fetchFlights } from "../../redux/actions/api";
import styles from "./Styles";
// Custom Category Components
import CustomMinistryItem from "./components/CustomMinistryItem";
import CustomArrivalItem from "./components/CustomArrivalItem";
import CustomReturnItem from "./components/CustomReturnItem";

const { width } = Dimensions.get("window");
const isTablet = width > 768;

const Flights = () => {
  const dispatch = useDispatch();
  const { flights, loading, error } = useSelector((state) => state.api);
  const { selectedEvent } = useSelector((state) => state.api);

  const [selectedCategory, setSelectedCategory] = useState("ministry");
  const [refreshing, setRefreshing] = useState(false);

  const categories = [
    { id: "ministry", label: "Ministry", key: "ministry" },
    { id: "arrival", label: "Arrival", key: "arrival" },
    { id: "return", label: "Return", key: "return" },
  ];

  useEffect(() => {
    if (selectedEvent?.id) {
      fetchFlightsData();
    }
  }, [selectedEvent, selectedCategory]);

  useEffect(() => {
    if (!loading && refreshing) {
      setRefreshing(false);
    }
  }, [loading, refreshing]);

  const fetchFlightsData = () => {
    if (selectedEvent?.id) {
      const params = {
        status: "SCHEDULED",
        participantsType: selectedCategory,
      };
      dispatch(fetchFlights(selectedEvent.id, params));
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchFlightsData();
  };

  const handleFlightPress = (flight) => {
    console.log("Flight pressed:", flight);
  };

  const renderFlightItem = ({ item }) => {
    switch (selectedCategory) {
      case "ministry":
        return <CustomMinistryItem flight={item} onPress={handleFlightPress} />;
      case "arrival":
        return <CustomArrivalItem flight={item} onPress={handleFlightPress} />;
      case "return":
        return <CustomReturnItem flight={item} onPress={handleFlightPress} />;
      default:
        return <CustomMinistryItem flight={item} onPress={handleFlightPress} />;
    }
  };

  const renderEmptyComponent = () => (
    <EmptyListComponent
      message={`No ${selectedCategory} flights found`}
      subtitle="Check back later for updates"
    />
  );

  const renderListFooter = () => (
    <View style={styles.listFooter}>
      <Text style={styles.footerText}>
        {flights?.flights?.length || 0} {selectedCategory} flights found
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title={selectedEvent?.name || "Event flights"} center />

      <CustomCategories
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        horizontal={true}
        scrollable={true}
      />

      <FlatList
        data={flights?.flights || []}
        renderItem={renderFlightItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={renderListFooter}
        ListEmptyComponent={renderEmptyComponent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        numColumns={isTablet ? 2 : 1}
        columnWrapperStyle={isTablet ? styles.row : null}
      />

      <LoadingModal visible={loading} />
      <FloatingChatIcon />
    </SafeAreaView>
  );
};

export default Flights;
