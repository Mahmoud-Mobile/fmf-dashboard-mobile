import { useCallback } from "react";
import { Alert } from "react-native";
import {
  markFlightArrived,
  markFlightDeparted,
  toggleMeetDone,
  toggleLuggageReceived,
} from "../../../webservice/apiConfig";
import { sendNotification } from "../../../config/notificationUtils";

export const useFlightActions = (fetchFlightsData, selectedCategory) => {
  const getParticipantName = (participant) => {
    const firstName = participant?.firstName || "";
    const lastName = participant?.lastName || "";
    return `${firstName} ${lastName}`.trim() || "Participant";
  };

  const getActionButtons = useCallback(
    (flight) => {
      const flightId = flight.id;
      const participantId = flight.participant?.id;

      if (!flightId || !participantId) {
        return [];
      }

      if (flight.flightType === "DEPARTURE") {
        const isParticipantDepartedDisabled =
          flight.isParticipantDeparted === true;

        const handleParticipantDeparted = async () => {
          try {
            await markFlightDeparted(flightId, participantId, {
              departed: true,
            });

            const participantName = getParticipantName(flight.participant);
            const flightNumber =
              flight.returnFlightNumber || flight.arrivalFlightNumber || "-";

            await sendNotification(
              "Participant Departed",
              `${participantName} has departed on flight ${flightNumber}`,
              {
                type: "flight_departed",
                flightId: flightId,
                participantId: participantId,
              }
            );

            Alert.alert(
              "Success",
              "Participant departed status updated successfully!",
              [{ text: "OK", style: "default" }]
            );
            fetchFlightsData();
          } catch (error) {
            Alert.alert(
              "Error",
              "Failed to update participant departed status. Please try again.",
              [{ text: "OK", style: "default" }]
            );
          }
        };

        return [
          {
            icon: "flight-takeoff",
            text: "Participant Departed",
            isSelected: !isParticipantDepartedDisabled,
            disabled: isParticipantDepartedDisabled,
            onPress: handleParticipantDeparted,
          },
        ];
      }

      const isMeetDoneDisabled = flight.isMeetDone === true;
      const isLuggageReceivedDisabled = flight.isLuggageReceived === true;
      const isParticipantArrivedDisabled = flight.isParticipantArrived === true;

      const handleMeetDone = async () => {
        try {
          await toggleMeetDone(flightId, participantId, {
            meetDone: true,
          });

          const participantName = getParticipantName(flight.participant);
          const flightNumber = flight.arrivalFlightNumber || "-";

          await sendNotification(
            "Meet Done",
            `Meet completed for ${participantName} on flight ${flightNumber}`,
            {
              type: "flight_meet_done",
              flightId: flightId,
              participantId: participantId,
            }
          );

          Alert.alert("Success", "Meet done status updated successfully!", [
            { text: "OK", style: "default" },
          ]);
          fetchFlightsData();
        } catch (error) {
          Alert.alert(
            "Error",
            "Failed to update meet done status. Please try again.",
            [{ text: "OK", style: "default" }]
          );
        }
      };

      const handleLuggageReceived = async () => {
        try {
          await toggleLuggageReceived(flightId, participantId, {
            luggageReceived: true,
          });

          const participantName = getParticipantName(flight.participant);
          const flightNumber = flight.arrivalFlightNumber || "-";

          await sendNotification(
            "Luggage Received",
            `Luggage received for ${participantName} on flight ${flightNumber}`,
            {
              type: "flight_luggage_received",
              flightId: flightId,
              participantId: participantId,
            }
          );

          Alert.alert(
            "Success",
            "Luggage received status updated successfully!",
            [{ text: "OK", style: "default" }]
          );
          fetchFlightsData();
        } catch (error) {
          Alert.alert(
            "Error",
            "Failed to update luggage received status. Please try again.",
            [{ text: "OK", style: "default" }]
          );
        }
      };

      const handleParticipantArrived = async () => {
        try {
          await markFlightArrived(flightId, participantId, {
            arrived: true,
          });

          const participantName = getParticipantName(flight.participant);
          const flightNumber = flight.arrivalFlightNumber || "-";

          await sendNotification(
            "Participant Arrived",
            `${participantName} has arrived on flight ${flightNumber}`,
            {
              type: "flight_participant_arrived",
              flightId: flightId,
              participantId: participantId,
            }
          );

          Alert.alert(
            "Success",
            "Participant arrived status updated successfully!",
            [{ text: "OK", style: "default" }]
          );
          fetchFlightsData();
        } catch (error) {
          Alert.alert(
            "Error",
            "Failed to update participant arrived status. Please try again.",
            [{ text: "OK", style: "default" }]
          );
        }
      };

      return [
        {
          icon: "work",
          text: "Luggage Received",
          isSelected: !isLuggageReceivedDisabled,
          disabled: isLuggageReceivedDisabled,
          onPress: handleLuggageReceived,
        },
        {
          icon: "check-circle",
          text: "Meet Done",
          isSelected: !isMeetDoneDisabled,
          disabled: isMeetDoneDisabled,
          onPress: handleMeetDone,
        },
        {
          icon: "person",
          text: "Participant Arrived",
          isSelected: !isParticipantArrivedDisabled,
          disabled: isParticipantArrivedDisabled,
          onPress: handleParticipantArrived,
        },
      ];
    },
    [fetchFlightsData, selectedCategory]
  );

  return { getActionButtons };
};
