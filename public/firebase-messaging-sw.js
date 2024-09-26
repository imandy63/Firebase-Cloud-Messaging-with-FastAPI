importScripts(
  "https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js"
);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGw97YupPweRNwK_YL3v0bniwbYfaJd64",
  projectId: "notification-service-44a22",
  messagingSenderId: "594703263162",
  authDomain: "notification-service-44a22.firebaseapp.com",
  appId: "1:594703263162:web:1de7a7dd515aaec8aa2983",
};

firebase.initializeApp(firebaseConfig);

class CustomPushEvent extends Event {
  constructor(data) {
    super("push");

    Object.assign(this, data);
    this.custom = true;
  }
}

/*
 * Overrides push notification data, to avoid having 'notification' key and firebase blocking
 * the message handler from being called
 */
self.addEventListener("push", (e) => {
  // Skip if event is our own custom event
  if (e.custom) return;

  // Kep old event data to override
  const oldData = e.data;

  // Create a new event to dispatch, pull values from notification key and put it in data key,
  // and then remove notification key
  const newEvent = new CustomPushEvent({
    data: {
      ehheh: oldData.json(),
      json() {
        const newData = oldData.json();
        newData.data = {
          ...newData.data,
          ...newData.notification,
        };
        delete newData.notification;
        return newData;
      },
    },
    waitUntil: e.waitUntil.bind(e),
  });

  e.waitUntil(self.registration.showNotification());

  // Stop event propagation
  e.stopImmediatePropagation();

  // Dispatch the new wrapped event
  dispatchEvent(newEvent);
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const { title, body, image, icon, ...restPayload } = payload.data;
  const notificationOptions = {
    body,
    icon: image || "/icons/firebase-logo.png", // path to your "fallback" firebase notification logo
    data: restPayload,
  };
  console.log(payload);

  self.registration.showNotification(title, notificationOptions);

  const channel = new BroadcastChannel("sw-messages");
  channel.postMessage(payload.data);
});

self.addEventListener("notificationclick", (event) => {
  // console.log(event?.notification?.data?.type == "New Message");
  // console.log(event?.notification?.data?.id);
  if (
    event?.notification?.data &&
    event?.notification?.data?.id &&
    event?.notification?.data?.type === "New Message"
  ) {
    self.clients.openWindow(
      `http://localhost:3000/message/${event?.notification?.data?.id}`
    );
  }

  // close notification after click
  event.notification.close();
});
