import axiosInstance from "./axiosInstance";

export const sendChatMessageApi = async ({
  message,
  conversationId,
  userId,
}) => {
  const payload = {
    message,
  };

  if (conversationId) {
    payload.conversationId = conversationId;
  }

  if (userId) {
    payload.userId = String(userId);
  }

  const response = await axiosInstance.post("/api/chat/message", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
