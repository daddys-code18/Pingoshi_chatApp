// import Title from "../shared/Title";
import { Drawer, Grid, Skeleton } from '@mui/material';
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import {
    NEW_MESSAGE_ALERT,
    NEW_REQUEST,
    // ONLINE_USERS,
    REFETCH_CHATS,
} from "../../constants/event";
import { useErrors, useSocketEvents } from "../../hooks/hook";
import { getOrSaveFromStorage } from "../../lib/Features";
import { useMyChatsQuery } from "../../redux/api/api";
import {
    incrementNotification,
    setNewMessagesAlert,
} from "../../redux/reducers/chat";
import {
    setIsDeleteMenu,
    setIsMobile,
    setSelectedDeleteChat,
} from "../../redux/reducers/misc";
import { getSocket } from "../../socket";
import DeleteChatMenu from "../dialogs/DeleteChatMenu";
import ChatList from "../specific/ChatList";
import Profile from "../specific/Profile";
import Header from "./Header";

const AppLayout = () => (WrappedComponent) => {
    return (props) => {

        const params = useParams();
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const chatId = params.chatId;
        const deleteMenuAnchor = useRef(null);

        const socket = getSocket()


        const { isMobile } = useSelector((state) => state.misc);
        const { user } = useSelector((state) => state.auth);

        const { newMessagesAlert } = useSelector((state) => state.chat);

        const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
        useErrors([{ isError, error }]);

        useEffect(() => {
            getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert })
        }, [newMessagesAlert])

        const handleDeleteChart = (e, _id, groupChat) => {
            dispatch(setIsDeleteMenu(true));
            dispatch(setSelectedDeleteChat({ chatId, groupChat }));
            deleteMenuAnchor.current = e.currentTarget;
        };
        const handleMobileClose = () => dispatch(setIsMobile(false));


        const newRequestListener = useCallback(() => {
            dispatch(incrementNotification());
        }, [dispatch]);



        const newMessageAlertListener = useCallback((data) => {
            if (data.chatId === chatId) return

            dispatch(setNewMessagesAlert(data))
            // const sd = data.chatId;
            // console.log("New Message Alert", sd)
        }, [chatId])

        const refetchListener = useCallback(() => {
            refetch();
            navigate("/");
        }, [refetch, navigate]);

        const eventHandlers = {
            [NEW_MESSAGE_ALERT]: newMessageAlertListener,
            [NEW_REQUEST]: newRequestListener,
            [REFETCH_CHATS]: refetchListener,
            // [ONLINE_USERS]: onlineUsersListener,
        };

        useSocketEvents(socket, eventHandlers);



        return (
            <>
                {/* <Title /> */}
                <Header />

                <DeleteChatMenu
                    dispatch={dispatch}
                    deleteMenuAnchor={deleteMenuAnchor}
                />
                {isLoading ? (
                    <Skeleton />
                ) : (
                    <Drawer open={isMobile} onClose={handleMobileClose}>
                        <ChatList
                            w="70vw"
                            chats={data?.chats}
                            chatId={chatId}
                            handleDeleteChart={handleDeleteChart}
                            newMessagesAlert={newMessagesAlert}
                        />
                    </Drawer>
                )}


                <Grid container height={"calc(100vh - 4rem)"}>
                    <Grid item sm={4} md={3} sx={{
                        display: { xs: "none", sm: "block" }
                    }} height={"100%"}>
                        {isLoading ? (<Skeleton />) : (
                            <ChatList chats={data?.chats} chatId={chatId} handleDeleteChart={handleDeleteChart} newMessagesAlert={newMessagesAlert} />

                        )
                        }
                    </Grid>

                    <Grid item xs={12} md={5} lg={6}
                        height={"100%"}>
                        <WrappedComponent {...props} chatId={chatId} user={user} />

                    </Grid>

                    <Grid item md={4} lg={3} sx={{
                        display: { xs: "none", md: "block" },
                        padding: "2rem",
                        bgcolor: "rgba(0,0,0,0.85)"
                    }} height={"100%"}>
                        <Profile user={user} />
                    </Grid>

                </Grid>



            </>



        );
    };
};
export default AppLayout; 