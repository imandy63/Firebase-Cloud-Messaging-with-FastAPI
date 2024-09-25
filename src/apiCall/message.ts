import { MessageReceiveModel, MessageSendModel } from "@/model/message";
import { instance } from ".";

export const getMessage = async (messageId: string) => {
  const messageResponse = await instance.get(`/message?messageId=${messageId}`);
  return messageResponse.data as MessageReceiveModel;
};

export const getAllMessages = async (userId: string) => {
  console.log(userId);
  const messages = await instance.get(`/message/${userId}`);
  return messages.data as MessageReceiveModel[];
};

export const updateReadStatus = async (messageId: string, userId: string) => {
  const status = await instance.post(`/message/updatestatus`, {
    messageId,
    userId,
  });
  return status.data;
};

export const sendMessage = async (data: MessageSendModel) => {
  const sendResponse = await instance.post(`/message`, data);
  return sendResponse.data;
};
