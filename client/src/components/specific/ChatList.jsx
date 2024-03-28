import { Stack } from "@mui/material"
import ChatItem from "../shared/ChatItem"

const ChatList = ({ w = "100%",
    chats = [],
    chatId,
    onlineUsers = [],
    newMessagesAlert = [{
        chatId: "",
        count: 0
    }],
    handleDeleteChart }) => {
    return (
        <Stack width={w} direction={"column"}>
            {chats?.map((data, index) => {
                const { avatar, _id, name, groupChat, members } = data;
                const newMessageAlert = newMessagesAlert.find(({ chatId }) => chatId === _id);
                const isOnline = members?.some((member) => onlineUsers.includes(member))


                return <ChatItem index={index} newMessageAlert={newMessageAlert} isOnline={isOnline} avatar={avatar}
                    name={name} _id={_id}
                    key={_id}
                    groupChat={groupChat}
                    sameSender={chatId === _id}
                    henadleDeleteChart={handleDeleteChart} />
            })}

        </Stack>
    )
}

export default ChatList