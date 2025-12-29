import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Ensure Android notification channel exists
const ensureNotificationChannel = async () => {
  if (Platform.OS === "android") {
    try {
      await Notifications.setNotificationChannelAsync("default", {
        name: "Default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
        sound: "default",
        showBadge: true,
      });
    } catch (error) {
      console.error("Error setting up notification channel:", error);
    }
  }
};

// Initialize channel on module load
ensureNotificationChannel();

export const handleTestNotification = async () => {
  try {
    // Ensure permissions are granted
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } =
        await Notifications.requestPermissionsAsync();
      if (newStatus !== "granted") {
        console.error("Notification permissions not granted");
        return;
      }
    }

    // Ensure channel exists
    await ensureNotificationChannel();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Test Notification",
        body: "This is a test push notification!",
        sound: true,
        data: { test: true },
      },
      trigger: null, // Show immediately
    });
  } catch (error) {
    console.error("Error sending test notification:", error);
  }
};

export const sendNotification = async (title, body, data = {}) => {
  try {
    // Ensure permissions are granted
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } =
        await Notifications.requestPermissionsAsync();
      if (newStatus !== "granted") {
        console.error("Notification permissions not granted");
        return;
      }
    }

    // Ensure channel exists
    await ensureNotificationChannel();

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
        data,
      },
      trigger: null, // Show immediately
    });
  } catch (error) {
    console.log("Error sending notification:", error);
  }
};
