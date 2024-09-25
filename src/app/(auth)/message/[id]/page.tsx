"use client";
import { getMessage, updateReadStatus } from "@/apiCall/message";
import { Label } from "@/app/components/Label";
import { TextDisplayer } from "@/app/components/TextDisplayer";
import { MessageReceiveModel } from "@/model/message";
import Cookies from "@/utils/cookie";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MessageDetailPage = () => {
  const params = useParams().id as string;
  const userId = Cookies.getCookieCall("userId");
  const [data, setData] = useState<MessageReceiveModel>();
  const [isLoad, setIsLoad] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!params) {
      router.back();
    } else {
      getMessage(params)
        .then(async (data) => {
          setData(data);
          setIsLoad(false);
          await updateReadStatus(params.toString(), userId as string);
        })
        .catch((err) => {
          console.log(err);
          router.back();
        });
    }
  }, [params, router, userId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        {isLoad ? (
          <div className="text-center">Loading ...</div>
        ) : (
          <>
            {data ? (
              <div className="space-y-4">
                <div className="flex justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-700">Message Details</h2>
                  <button
                    onClick={() => router.back()}
                    className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 transition duration-200"
                  >
                    Back
                  </button>
                </div>
                <div className="space-y-2">
                  <Label text="Sender Id" />
                  <div className="text-black">
                  <TextDisplayer text={data.senderId} />
                </div>
                  <Label text="Receiver Id" />
                  <TextDisplayer text={data.receiverId} />
                  <Label text="Message Id" />
                  <TextDisplayer text={data.id} />
                  <Label text="Time" />
                  <TextDisplayer text={data.sendTime} />
                  <Label text="Subject" />
                  <TextDisplayer text={data.subject || "No subject"} />
                  <Label text="Content" />
                  <TextDisplayer text={data.message} />
                  <Label text="Attached URL" />
                  {data.attachedUrl ? (
                    <a
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={data.attachedUrl}
                    >
                      {data.attachedUrl}
                    </a>
                  ) : (
                    <div>None</div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center">Message does not exist</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MessageDetailPage;
