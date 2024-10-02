"use client";
import { getAllMessages } from "@/apiCall/message";
import { addToken, removeToken } from "@/apiCall/user";
import { deleteRegistrationToken, getFcmToken } from "@/customHook/customHook";
import {
  MessageModel,
  MessageReceiveModel,
  MessageUpdateStatusModel,
} from "@/model/message";
import Cookies from "@/utils/cookie";
import firebaseApp from "@/utils/firebase";
import { getMessaging, onMessage } from "firebase/messaging";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useReducer, useState } from "react";
import useWebSocket from "react-use-websocket";

const MessagePage = () => {
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [socketUrl, setSocketUrl] = useState("");
  const router = useRouter();
  const [update, setUpdate] = useState<MessageUpdateStatusModel | null>();
  const userId = Cookies.getCookieCall("userId");
  const [token, setToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("");

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  function handleRerender() {
    forceUpdate();
  }

  const handleMessageReceived = (payload) => {
    console.log("Foreground push notification received:", payload);
    const data = payload.data as MessageReceiveModel;
    console.log(data.type !== "New Message");
    if (data?.type === "New Message") {
      setMessages((prev) => [
        {
          id: data.id,
          message: data.message,
          sendTime: data.sendTime,
          attachedUrl: data.attachedUrl,
          status: data.status,
          readAt: data.readAt,
          receiverId: data.receiverId,
          senderId: data.senderId,
          subject: data.subject,
        },
        ...prev,
      ]);
    } else {
      const update = data as MessageUpdateStatusModel;
      console.log(update);
      if (update != null) {
        setUpdate(update);
      }
    }
  };

  const outClicked = async () => {
    Cookies.clearUser();
    await removeToken(userId as string, token);
    // await deleteRegistrationToken();
    router.push("/");
  };

  // const { sendMessage, lastMessage } = useWebSocket(socketUrl);

  // useEffect(() => {
  //   if (lastMessage != null) {
  //     if (lastMessage.data == "PING") {
  //       sendMessage("PONG");
  //     }
  //     console.log(lastMessage);
  //   }
  // }, [lastMessage]);

  useEffect(() => {
    if (!token) {
      getFcmToken().then((data) => {
        setNotificationPermissionStatus(data.notificationPermissionStatus);
        setToken(data.token);
        // setSocketUrl(
        //   `ws://localhost:8000/ws?username=${userId}&token=${data.token}`
        // );
        console.log(data.token);
        Cookies.setCookieCall("token", data.token);
        // window.addEventListener("beforeunload", async () => {
        //   // Cookies.clearUser();
        //   const headers = {
        //     type: "application/json",
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //   };
        //   const blob = new Blob(
        //     [
        //       JSON.stringify({
        //         username: userId as string,
        //         token: Cookies.getCookieCall("token") as string,
        //       }),
        //     ],
        //     headers
        //   );
        //   navigator.sendBeacon("http://localhost:8000/user/removetoken", blob);
        // });
        console.log(data.notificationPermissionStatus);
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
          if (data.notificationPermissionStatus === "granted") {
            navigator.serviceWorker
              .register("/firebase-messaging-sw.js")
              .then(() => {
                const messaging = getMessaging(firebaseApp);
                const channel = new BroadcastChannel("sw-messages");
                channel.addEventListener("message", handleMessageReceived);
                onMessage(messaging, handleMessageReceived);
              });
          }
        }
        addToken({
          username: userId as string,
          registrationToken: data.token,
        }).then(() => {
          console.log(data.token);
        });
      });
    }

    getAllMessages(userId as string).then((data) => {
      setMessages(data);
      console.log(data);
    });
  }, []);

  useEffect(() => {
    if (update != null) {
      const message = messages.find((mess) => mess.id === update.id);
      console.log(message);
      if (message) {
        message.readAt = update.readAt;
        message.status = "read";
        console.log({ message, messages });
        handleRerender();
      }
    }
  }, [update]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-700">Messages</h2>
          <div>
            <Link
              href={"/"}
              className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 transition duration-200"
              onClick={outClicked}
            >
              Logout
            </Link>
            <Link href={"/message/send"}>
              <button
                type="button"
                className="ml-2 py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 transition duration-200"
              >
                Send
              </button>
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg shadow-xs">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead>
                <tr className="text-xs font-semibold text-gray-500 uppercase bg-gray-50">
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {messages.map((message, index) => (
                  <tr
                    key={index}
                    className={`text-gray-700 ${
                      message.status === "sent" ? "font-bold" : ""
                    }`}
                  >
                    <Link href={`/message/${message.id}`}>
                      <td className="px-4 py-3 hover:bg-gray-100 cursor-pointer">
                        {message.senderId}
                      </td>
                    </Link>
                    <td className="px-4 py-3 text-sm">{message.subject}</td>
                    <td className="px-4 py-3 text-sm">{message.sendTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase bg-gray-50 border-t border-gray-200">
            {/* You can add footer content here if needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
