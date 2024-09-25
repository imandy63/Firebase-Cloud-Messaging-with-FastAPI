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

const MessagePage = () => {
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const router = useRouter();
  const [update, setUpdate] = useState<MessageUpdateStatusModel | null>();
  const userId = Cookies.getCookieCall("userId");
  const [token, setToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("");

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  function handleClick() {
    forceUpdate();
  }

  const outClicked = async () => {
    Cookies.clearUser();
    await removeToken(userId as string, token);
    await deleteRegistrationToken();
    router.push("/");
  };

  useEffect(() => {
    if (!token) {
      getFcmToken().then((data) => {
        setNotificationPermissionStatus(data.notificationPermissionStatus);
        setToken(data.token);
        window.addEventListener("pagehide", async () => {
          await removeToken(userId as string, data.token as string);
        });
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
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // navigator.serviceWorker.register("./firebase-messaging-sw.js");
      if (notificationPermissionStatus === "granted") {
        const messaging = getMessaging(firebaseApp);

        const unsubscribe = onMessage(messaging, (payload) => {
          console.log("Foreground push notification received:", payload);
          const data = payload.data as MessageReceiveModel;
          if (data?.type === "New Message") {
            setMessages((prev) => [
              ...prev,
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
            ]);
          } else {
            setUpdate(data as MessageUpdateStatusModel);
          }
        });
        return () => {
          unsubscribe();
        };
      }
    }
  }, [token]);

  useEffect(() => {
    console.log({ messages, update });
    if (update != null) {
      const message = messages.find((mess) => mess.id === update.id);
      if (message) {
        message.readAt = update.readAt;
        message.status = "read";
        console.log({ message, messages });
        handleClick();
      }
    }
  }, [update]);

  return (
    <div className="w-4/5 m-auto">
      <div className="flex justify-between">
        <div>Message</div>
        <Link
          href={"/"}
          className="cursor-pointer py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={outClicked}
        >
          Out
        </Link>
        <Link href={"/message/send"}>
          <button
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Send
          </button>
        </Link>
      </div>
      <div>
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {messages.map((message, index) => {
                  return (
                    <tr
                      key={index}
                      className={`text-gray-700 dark:text-gray-400 ${
                        message.status == "sent" ? "font-bold" : ""
                      }`}
                    >
                      <Link href={`/message/${message.id}`}>
                        <td className="px-4 py-3">{message.senderId}</td>
                      </Link>
                      <td className="px-4 py-3 text-sm">{message.subject}</td>
                      <td className="px-4 py-3 text-sm">{message.sendTime}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
            <span className="col-span-2"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
