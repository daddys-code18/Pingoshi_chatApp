import AppLayout from '../components/layout/AppLayout'
import { IconButton, Stack } from '@mui/material';
import { grayColor, orange } from '../constants/color';
import { useRef } from 'react';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { InputBox } from './../components/styles/StyledComponents';
import FileMenu from '../components/dialogs/FileMenu';
import { sampleMessage } from '../constants/sampleData';
import MessageComponent from '../components/shared/MessageComponent';

const Chat = () => {
    const containerRef = useRef(null);

    const user = {
        _id: "cacdcdc",
        name: "Pavan Kafare"
    }
    return (
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
                    sampleMessage.map((i, index) => (
                        <MessageComponent message={i} key={index}
                            user={user} />
                    ))
                }
            </Stack>
            <form style={{ height: "10%" }}>
                <Stack direction={"row"} height={"100%"}
                    padding={"1rem"}
                    alignItems={"center"}
                    position={"relative"}>
                    <IconButton sx={{
                        position: "absolute",
                        left: "1.5rem",
                        rotate: "30deg"
                    }}>
                        <AttachFileIcon />
                    </IconButton>

                    <InputBox placeholder='Type message here...' />
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
            <FileMenu />

        </>)
}

export default AppLayout()(Chat)