"use client";
import { getMessaging, getToken, deleteToken } from "firebase/messaging";
import firebaseApp from "../utils/firebase";

const getFcmToken = async () => {
  try {
    if (typeof window !== "undefined") {
      const messaging = getMessaging(firebaseApp);
      const permission = await Notification.requestPermission();
      console.log(permission);
      if (permission === "granted" && "serviceWorker" in navigator) {
        const currentToken = await getToken(messaging, {
          vapidKey:
            "BDI69M_uq2cO9nAfKU03Tp5ezuE57-Aj1y3i3X5YGKgkyzd3q7ZI9fdygxoN7KMxp-xYW9f-NIo9ASGv1RzA9Sg",
        });
        if (currentToken) {
          return {
            token: currentToken,
            notificationPermissionStatus: permission,
          };
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
        }
      }
    }
    return { token: "", notificationPermissionStatus: "denied" };
  } catch (error) {
    console.log("Error retrieving token:", error);
    return { token: "", notificationPermissionStatus: "denied" };
  }
};

const deleteRegistrationToken = async () => {
  const messaging = getMessaging(firebaseApp);
  return await deleteToken(messaging);
};

export { getFcmToken, deleteRegistrationToken };
