"use client";
import { sendMessage } from "@/apiCall/message";
import { Input } from "@/app/components/Input";
import TextArea from "@/app/components/TextArea";
import { MessageSendModel } from "@/model/message";
import Cookies from "@/utils/cookie";
import Link from "next/link";
import { useState } from "react";

const SendMessagePage = () => {
  const currentUserId = Cookies.getCookieCall("userId") as string;
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [attachedUrl, setAttachedUrl] = useState("");

  const showMessage = async () => {
    const data: MessageSendModel = {
      receiverId: recipient.split(/\s*,\s*/g),
      subject,
      senderId: currentUserId,
      message: content,
      attachedUrl: attachedUrl,
    };
    console.log(data);
    await sendMessage(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-700">Send Message</h2>
          <div>
            <Link href={"/message"}>
              <button
                type="button"
                className="ml-2 py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 transition duration-200"
              >
                Back
              </button>
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <Input
              label="Recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              name="recipient"
            />
          </div>

          <div>
            <Input
              label="Subject"
              name="subject"
              onChange={(e) => setSubject(e.target.value)}
              value={subject}
            />
          </div>

          <div>
            <TextArea
              name="content"
              label="Content"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div>
            <Input
              label="Attached URL"
              name="attachedurl"
              onChange={(e) => setAttachedUrl(e.target.value)}
              value={attachedUrl}
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={showMessage}
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400"
            >
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMessagePage;
