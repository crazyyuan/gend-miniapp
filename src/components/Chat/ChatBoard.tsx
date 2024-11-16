import { useState } from "react";
import { Chat, useCreateChatClient } from "stream-chat-react";

const ChatBoard = () => {
  const [timeout] = useState(6000);
  const key = `timeout_${timeout}`;
  return <ChatWithOptions key={key} timeout={timeout} />;
};
const ChatWithOptions = ({ timeout }: any) => {
  const apiKey = import.meta.env.VITE_STREAMCHAT_KEY as string;
  const userId = localStorage.getItem("userId") as string;
  const token = localStorage.getItem("token");

  const client = useCreateChatClient({
    apiKey,
    options: { timeout },
    tokenOrProvider: token,
    userData: { id: userId },
  });
  if (!client) return <div>Loading...</div>;
  return <Chat client={client}></Chat>;
};

export default ChatBoard;
