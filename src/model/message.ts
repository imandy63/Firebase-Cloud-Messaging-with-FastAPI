export type MessageSendModel = {
  receiverId: string[];
  senderId: string;
  subject: string;
  message: string;
  attachedUrl: string;
};

export type MessageModel = {
  id: string;
  senderId: string;
  subject: string | null;
  receiverId: string;
  message: string;
  status: "read" | "sent";
  attachedUrl: string;
  readAt: string;
  sendTime: string;
};

export type MessageReceiveModel = MessageModel & {
  type: string;
};

export type MessageUpdateStatusModel = {
  type: string;
  id: string;
  readAt: string;
};
