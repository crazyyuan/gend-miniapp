import {
  Chat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  useCreateChatClient,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

const apiKey = import.meta.env.VITE_STREAMCHAT_KEY as string;
const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");
console.log(userId, token, apiKey, "-----");

const filters = { members: { $in: [userId] }, type: "messaging" };
const options = { presence: true, state: true };
// const sort = { last_message_at: -1 };

const ChatPage = () => {
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: token,
    userData: { id: userId as string },
  });

  if (!client) return <div>Loading...</div>;

  return (
    <Chat client={client}>
      <ChannelList filters={filters} options={options} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default ChatPage;
