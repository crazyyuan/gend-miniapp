import { useEffect, useState } from "react";
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  useCreateChatClient,
  useMessageContext,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

import { Avatar3, Avatar5 } from "../../public/avatar";

interface ChannelProps {
  channelId: string;
  memberCount: number;
}

const CustomMessageUi = () => {
  const { isMyMessage, message } = useMessageContext();

  return (
    <div
      className={`w-full flex items-center ${
        isMyMessage() ? "flex-row-reverse" : "flex-row"
      }`}
      data-message-id={message.id}
    >
      <div className="w-[36px] h-[36px] rounded-full mx-2 flex items-center overflow-hidden">
        {isMyMessage() ? <Avatar5 /> : <Avatar3 />}
      </div>
      <span
        className={`w-full p-2 m-2 rounded-lg ${
          isMyMessage() ? "bg-blue-400 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {message.text}
      </span>
    </div>
  );
};

const apiKey = import.meta.env.VITE_STREAMCHAT_KEY as string;
const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");

// const sort = { last_message_at: -1 };

const ChatPage = () => {
  const getChannel = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_NEXTAUTH_URL}/match/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      return data;
    } catch (error: unknown) {
      console.log("Error sending login", error);
      return null;
    }
  };

  const [channelData, setChannelData] = useState<ChannelProps>({
    channelId: "",
    memberCount: 0,
  });

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

  const channel = client?.channel("messaging", channelData?.channelId, {
    image: "https://cdn.com/image.png",
    name: "Just Chatting",
    members: ["dave-matthews", "trey-anastasio"],
    // option to add custom fields
  });

  if (!client) return <div>Loading...</div>;

  return (
    <Chat client={client}>
      <Channel channel={channel} Message={CustomMessageUi}>
        <div className="w-[100vw] p-2">
          <MessageList />
        </div>

        <div className="fixed w-[100vw] left-0 bottom-32">
          <MessageInput />
        </div>
      </Channel>
    </Chat>
  );
};

export default ChatPage;
