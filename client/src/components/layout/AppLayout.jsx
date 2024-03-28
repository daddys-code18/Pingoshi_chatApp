// import Title from "../shared/Title";
import { useParams } from "react-router-dom";
import { sampleChats } from "../../constants/sampleData";
import ChatList from "../specific/ChatList";
import Header from "./Header";
import { Grid } from '@mui/material';

const AppLayout = () => (WrappedComponent) => {

    return (props) => {
        const params = useParams()
        const chatId = params.chatId

        const handleDeleteChart = (e, _id, groupChat) => {
            e.preventDefault();
            console.log("Delete Chat", _id, groupChat)
        }

        return (
            <>
                {/* <Title /> */}
                <Header />

                <Grid container height={"calc(100vh - 4rem)"}>
                    <Grid item sm={4} md={3} sx={{
                        display: { xs: "none", sm: "block" }
                    }} height={"100%"}>
                        <ChatList chats={sampleChats} chatId={chatId} handleDeleteChart={handleDeleteChart}
                        /></Grid>

                    <Grid item xs={12} md={5} lg={6}
                        height={"100%"}>
                        <WrappedComponent {...props} />

                    </Grid>

                    <Grid item md={4} lg={3} sx={{
                        display: { xs: "none", md: "block" },
                        padding: "2rem",
                        bgcolor: "rgba(0,0,0,0.85)"
                    }} height={"100%"}>Third</Grid>

                </Grid>

                <div>
                    Footer
                </div>

            </>



        );
    };
};
export default AppLayout; 