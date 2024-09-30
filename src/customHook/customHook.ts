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
            "BI0ahJDLDFpcNeIatOwMfcut5IImgNC6aDIcC76Y1rckJjE9hSxcyyvJLk5K5RP2QR_GPlXFRAxU3jiO6JdrkiE",
          // "BOReUukNHBHSXYubsj3vv3AHRn-gqVVJ625f7XWTLFA01BQWGpDzX6q7pXmAJFXMkc4maSRgjGpc3itIiwblLps",
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
