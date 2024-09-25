"use client";
import useFcmToken from "../customHook/customHookOriginal";
import { getMessaging, onMessage } from "firebase/messaging";
import firebaseApp from "../utils/firebase";
import { useEffect } from "react";

export default function FcmTokenComp() {
  const { token, notificationPermissionStatus } = useFcmToken();

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("./firebase-messaging-sw.js");

      if (notificationPermissionStatus === "granted") {
        const messaging = getMessaging(firebaseApp);
        console.log("granted");
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
