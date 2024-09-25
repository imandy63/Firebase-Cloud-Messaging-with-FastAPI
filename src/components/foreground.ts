"use client";
import { getFcmToken } from "../customHook/customHook";
import { getMessaging, onMessage } from "firebase/messaging";
import firebaseApp from "../utils/firebase";
import { useEffect, useState } from "react";
import { unsubscribe } from "diagnostics_channel";

export default function FcmTokenComp() {
  const [token, setToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("");

  getFcmToken().then((data) => {
    setToken(data.token);
    setNotificationPermissionStatus(data.notificationPermissionStatus);
  });

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("./firebase-messaging-sw.js");

      if (notificationPermissionStatus === "granted") {
        const messaging = getMessaging(firebaseApp);
        console.log("Subscribed", token);
        const unsubscribe = onMessage(messaging, (payload) =>
          console.log("Foreground push notification received:", payload)
        );
        return () => {
          unsubscribe();
        };
      }
    }
  }, [notificationPermissionStatus]);

  return null;
}
