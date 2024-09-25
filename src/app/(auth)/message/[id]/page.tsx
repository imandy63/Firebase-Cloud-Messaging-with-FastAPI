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
      console.log(params);
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
  }, []);

  return (
    <div>
      {isLoad ? (
        <div>Loading ...</div>
      ) : (
        <>
          {data ? (
            <>
              <TextDisplayer text={data.senderId} />
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
                <a target="_blank" href={data.attachedUrl}>
                  {data.attachedUrl}
                </a>
              ) : (
                <div>None</div>
              )}
            </>
          ) : (
            <div>Message does not exist</div>
          )}
        </>
      )}
    </div>
  );
};

export default MessageDetailPage;
