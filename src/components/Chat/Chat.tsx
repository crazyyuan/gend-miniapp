import { useEffect, useState } from "react";
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  useCreateChatClient,
  Avatar,
  useMessageContext,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import "./Chat.css";

const CustomMessageUi = () => {
  const { isMyMessage, message } = useMessageContext();
  const messageUiClassNames = ["custom-message-ui"];
  if (isMyMessage()) {
    messageUiClassNames.push("custom-message-ui--mine");
  } else {
    messageUiClassNames.push("custom-message-ui--other");
  }
  return (
    <div className={messageUiClassNames.join(" ")} data-message-id={message.id}>
      <Avatar image={"/public/avatar/avatar-1.svg"} name={"11"} />
      <span className="custom-message-ui__text">{message.text}</span>
    </div>
  );
};

const apiKey = import.meta.env.VITE_STREAMCHAT_KEY as string;
const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");
console.log(userId, token, apiKey, "-----");

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

      console.log(data, "channel data");

      return data;
    } catch (error: unknown) {
      console.log("Error sending login", error);
      return null;
    }
  };

  const [channelData, setChannelData] = useState({});

  useEffect(() => {
    const fetchChannelData = async () => {
      const data = await getChannel();
      console.log(data);
      setChannelData(data);
    };

    fetchChannelData();
  }, []);

  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: token,
    userData: { id: userId as string },
  });

  const channel = client?.channel(
    "messaging",
    "2987237d-845d-4b62-b5da-c00e92f566fe",
    {
      image: "https://cdn.com/image.png",
      name: "Just Chatting",
      members: ["dave-matthews", "trey-anastasio"],
      // option to add custom fields
    }
  );

  console.log(channelData);

  if (!client) return <div>Loading...</div>;

  return (
    <Chat client={client}>
      <div>
        <img
          src="/public/avatar/avatar-1.svg"
          className="w-[36px] h-[36px] rounded-full"
        />
      </div>
      <Channel channel={channel} Message={CustomMessageUi}>
        <div className="w-[100vw]">
          <MessageList />
        </div>

        <div className="fixed w-[100vw] bottom-32">
          <MessageInput />
        </div>
      </Channel>
    </Chat>
  );
};

export default ChatPage;
