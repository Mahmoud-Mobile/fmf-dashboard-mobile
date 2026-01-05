import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import styles from "./Styles";
import { Get } from "../../webservice/Gate";
import GradientHeader from "../../components/GradientHeader";
import DelegationCard from "./components";
import EmptyListComponent from "../../components/EmptyListComponent";

const Delegations = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedEvent } = useSelector((state) => state.api);
  const eventId = selectedEvent?.id || route.params?.eventId;
  const userInfo = useSelector((state) => state.auth.user);
  const userId = userInfo?.user?.id || route.params?.userId;
  const [delegations, setDelegations] = useState([]);
  const [loading, setLoading] = useState(!route.params?.delegations);

  useEffect(() => {
    const fetchDelegations = async () => {
      if (!userId || !eventId) return;

      try {
        setLoading(true);
        const url = `rbac/users/${userId}/delegations`;
        const data = eventId ? { eventId } : {};
        const response = await Get(url, data);
        setDelegations(response?.delegations || []);
      } catch (error) {
        console.log("Delegations Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!route.params?.delegations && userId && eventId) {
      fetchDelegations();
    }
  }, [eventId, userId, route.params?.delegations]);

  const renderDelegationCard = useCallback(({ item }) => {
    return <DelegationCard delegation={item} />;
  }, []);

  const keyExtractor = useCallback((item, index) => {
    return item.id ? String(item.id) : `delegation-${index}`;
  }, []);

  const renderEmptyComponent = useCallback(() => {
    return (
      <EmptyListComponent
        title="No Delegations Found"
        description="There are no delegations available at the moment."
      />
    );
  }, []);

  return (
    <View style={styles.container}>
      <GradientHeader
        title="Delegations"
        subtitle={`${delegations.length} delegation${
          delegations.length !== 1 ? "s" : ""
        }`}
        onBackPress={() => navigation.goBack()}
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading delegations...</Text>
        </View>
      ) : (
        <FlatList
          data={delegations}
          renderItem={renderDelegationCard}
          keyExtractor={keyExtractor}
          ListEmptyComponent={renderEmptyComponent}
          contentContainerStyle={
            delegations.length === 0
              ? styles.emptyListContainer
              : styles.listContainer
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Delegations;
