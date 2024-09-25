"use client";
import { sendMessage } from "@/apiCall/message";
import { Input } from "@/app/components/Input";
import TextArea from "@/app/components/TextArea";
import { MessageSendModel } from "@/model/message";
import Cookies from "@/utils/cookie";
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
    <div className="container mx-auto p-8">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-center">Send Email</h1>
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
