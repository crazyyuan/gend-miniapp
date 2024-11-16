import { useEffect, useId, useState } from "react";
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  useCreateChatClient,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

const apiKey = import.meta.env.VITE_STREAMCHAT_KEY as string;
const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");
console.log(userId, token, apiKey, "-----");

// const sort = { last_message_at: -1 };

const ChatPage = () => {
  const getChannel = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_NEXTAUTH_URL}/match/${useId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      console.log(data, "channel data");

      return data;
    } catch (error: unknown) {
      console.log("Error sending login", error);
      return null;
    }
  };

  const [channelData, setChannelData] = useState(null);

  useEffect(() => {
    const fetchChannelData = async () => {
      const data = await getChannel();
      setChannelData(data);
    };

    fetchChannelData();
  }, []);

  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: token,
    userData: { id: userId as string },
  });

  const channel = client?.channel("messaging", {
    image: "https://cdn.com/image.png",
    name: "Just Chatting",
    members: ["dave-matthews", "trey-anastasio"],
  });

  console.log(channelData);

  if (!client) return <div>Loading...</div>;

  return (
    <Chat client={client}>
      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel>
    </Chat>
  );
};

export default ChatPage;
