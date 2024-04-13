import AppLayout from '../components/layout/AppLayout'
import { IconButton, Skeleton, Stack } from '@mui/material';
import { grayColor, orange } from '../constants/color';
import { useRef, useState, useCallback, useEffect } from 'react';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { InputBox } from './../components/styles/StyledComponents';
import FileMenu from '../components/dialogs/FileMenu';
import MessageComponent from '../components/shared/MessageComponent';
import { getSocket } from '../socket';
import { NEW_MESSAGE } from "../constants/event";
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api';
import { setIsFileMenu } from "../redux/reducers/misc";

import { useErrors, useSocketEvents } from "../hooks/hook";
import { useInfiniteScrollTop } from "6pp"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeNewMessagesAlert } from '../redux/reducers/chat';


const Chat = ({ chatId, user }) => {
    const containerRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const socket = getSocket();


    const [message, SetMessage] = useState("");

    const [messages, SetMessages] = useState([]);

    const [page, setPage] = useState(1);
    const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

    const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId })
    const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

    const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
        containerRef,
        oldMessagesChunk.data?.totalPages,
        page,
        setPage,
        oldMessagesChunk.data?.messages
    );


    const errors = [
        { isError: chatDetails.isError, error: chatDetails.error },
        { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
    ];

    const members = chatDetails?.data?.chat?.members;


    const handleFileOpen = (e) => {
        dispatch(setIsFileMenu(true));
        setFileMenuAnchor(e.currentTarget);
    };

    const submitHandler = (e) => {
        e.preventDefault()
        if (!message.trim()) return

        /// Emittinhg Message to the Server
        socket.emit(NEW_MESSAGE, { chatId, members, message })
        SetMessage("")
    }


    useEffect(() => {
        dispatch(removeNewMessagesAlert(chatId))
        return () => {
            SetMessage("");
            SetMessages([]);
            setOldMessages([]);
            setPage(1);
        }
    }, [chatId])


    const newMessagesListener = useCallback(
        (data) => {
            if (data.chatId !== chatId) return;

            SetMessages((prev) => [...prev, data.message]);
        },
        [chatId]
    );


    const eventHandler = {
        // [ALERT]: alertListener,
        [NEW_MESSAGE]: newMessagesListener,
        // [START_TYPING]: startTypingListener,
        // [STOP_TYPING]: stopTypingListener,
    };

    useSocketEvents(socket, eventHandler);
    useErrors(errors);
    const allMessages = [...oldMessages, ...messages];
    // console.log(allMessages)

    return chatDetails.isLoading ? <Skeleton /> : (
        <>
            <Stack ref={containerRef}
                boxSizing={"border-box"}
                padding={"1rem"}
                spacing={"1rem"}
                bgcolor={grayColor}
                height={"90%"}
                sx={{

                    overflowX: "hidden",
                    overflowY: "auto"
                }} >

                {
                    allMessages.map((i) => (
                        <MessageComponent message={i} key={i._id}
                            user={user} />
                    ))
                }
            </Stack>
            <form style={{ height: "10%" }} onSubmit={submitHandler}>
                <Stack direction={"row"} height={"100%"}
                    padding={"1rem"}
                    alignItems={"center"}
                    position={"relative"}>
                    <IconButton sx={{
                        position: "absolute",
                        left: "1.5rem",
                        rotate: "30deg"
                    }} onClick={handleFileOpen}>
                        <AttachFileIcon />
                    </IconButton>

                    <InputBox placeholder='Type message here...' value={message} onChange={(e) => SetMessage(e.target.value)} />
                    <IconButton type='submit' sx={{
                        rotate: "-30deg",
                        backgroundColor: orange,
                        color: "white",
                        marginLeft: "1rem",
                        padding: "0.5rem",
                        "&:hover": {
                            bgcolor: "error.dark"
                        }
                    }}>
                        <SendIcon />
                    </IconButton>
                </Stack>

            </form>
            <FileMenu anchorEl={fileMenuAnchor} chatId={chatId} />

        </>)
}

export default AppLayout()(Chat)