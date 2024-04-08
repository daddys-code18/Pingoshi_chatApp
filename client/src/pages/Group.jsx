
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, IconButton, Tooltip, Grid, Drawer, Stack, Typography, TextField, Button, Backdrop } from '@mui/material';
import { Menu as MenuIcon, KeyboardBackspace as KeyboardBackspaceIcon, Edit as EditIcon, Done as DoneIcon, Delete as DeleteIcon, Add as AddIcon, } from "@mui/icons-material"
import { matBlack } from "../constants/color"
import { Suspense, lazy, memo, useEffect, useState } from 'react';
import { Link } from "../components/styles/StyledComponents"
import AvatarCard from './../components/shared/AvatarCard';
import { sampleChats } from './../constants/sampleData';


const ConfrimDeleteDialog = lazy(() => import("../components/dialogs/ConfrimDeleteDialog"))
const AddMembersDialog = lazy(() => import("../components/dialogs/AddMembersDialog"))

const Group = () => {
    const isAddMember = true

    const navigate = useNavigate();
    const chatId = useSearchParams()[0].get("group")
    // console.log(chatId)
    const [isedit, setIsEdit] = useState(true)

    const [isMobileMenuOpen, setIsMobileOpen] = useState(false)
    const [groupName, setGroupName] = useState("")
    const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("")
    const [confrimDeleteDialog, setConfrimDeleteDialog] = useState(false)

    const navigateBack = () => {
        navigate("/")
    }
    const handleMobile = () => {
        setIsMobileOpen((prev) => !prev)

    }
    const handleMobileClose = () => {
        setIsMobileOpen(false)
    }
    const updateGroupName = () => {
        setIsEdit(false)
        console.log(groupNameUpdatedValue)
    };

    const confirmDeleteHandler = () => {
        console.log("Delete Group")
    }
    const openConfrimDeleteHandler = () => {
        setConfrimDeleteDialog(true);
    }
    const closeConfrimDeleteHandler = () => {
        setConfrimDeleteDialog(false);
    }
    const openAddMemberHandler = () => {
        console.log("Add Member")
    }
    const deleteHandler = () => {
        console.log("Dlete Handler")
        closeConfrimDeleteHandler()
    }
    useEffect(() => {
        setGroupName(`group Name${chatId}`);
        setGroupNameUpdatedValue(`Group Name${chatId}`);
        return () => {
            setGroupName("");
            setGroupNameUpdatedValue("");
            setIsEdit(false)

        }

    }, [chatId])
    const IconBtns = (
        <>
            <Box sx={{
                display: {
                    xs: "block",
                    sm: "none",
                    position: "fixed",
                    right: "1rem",
                    top: "1rem",
                }
            }}>
                <IconButton onClick={handleMobile}>
                    <MenuIcon />
                </IconButton></Box>

            <Tooltip title="back">
                <IconButton sx={{
                    position: "absolute",
                    top: "2rem",
                    left: "2rem",
                    bgcolor: matBlack,
                    color: "white",
                    ":hover": {
                        bgcolor: "rgba(0,0,0,0.7)"
                    }
                }}
                    onClick={navigateBack}>
                    <KeyboardBackspaceIcon />
                </IconButton>
            </Tooltip>
        </>
    );
    const GroupName = <>
        <Stack direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={"1rem"}
            padding={"3rem"}>
            {
                isedit ? <>
                    <TextField value={groupNameUpdatedValue}
                        onChange={(e) => { setGroupNameUpdatedValue(e.target.value) }}>



                    </TextField>
                    <IconButton onClick={updateGroupName}><DoneIcon /></IconButton>

                </> : <>
                    <Typography variant='h4'>{groupName}</Typography>
                    <IconButton onClick={() => setIsEdit(true)}>
                        <EditIcon />
                    </IconButton>

                </>
            }
        </Stack>


    </>
    const ButtonGroup = <>
        <Stack direction={{
            xs: "column-reverse",
            sm: "row"
        }}
            spacing={"1rem"}
            p={{ xs: "0", sm: "1rem", md: "1rem 4rem" }}>
            <Button size='large' color='error' startIcon={<DeleteIcon />} onClick={openConfrimDeleteHandler}>Delete Group</Button>
            <Button size='large' variant='contained' startIcon={<AddIcon />} onClick={openAddMemberHandler}>Add Member</Button>

        </Stack>

    </>
    return (
        <Grid container height={"100vh"}>
            <Grid item sx={{
                display: {
                    xs: "none",
                    sm: "block"
                }
            }} sm={4}
                bgcolor={"bisque"}> <GroupList myGroups={sampleChats} chatId={chatId} />

            </Grid>

            <Grid item xs={12}
                sm={8}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    padding: "1rem 3rem"
                }}>{IconBtns}

                {
                    groupName && <>
                        {GroupName}

                        <Typography margin={"2rem"} alignSelf={"flex-start"}
                            variant='body1'>Members</Typography>

                        <Stack maxWidth={"45rem"} width={"100%"}
                            boxSizing={"border-box"}
                            padding={{
                                sm: "1rem",
                                xs: "0",
                                md: "1rem 4rem"
                            }}
                            spacing={"2rem"}
                            bgcolor={"bisque"}
                            height={"50vh"}
                            overflow={"auto"}>
                            {
                                // Member 
                            }

                        </Stack>
                        {ButtonGroup}
                    </>


                }

            </Grid>{
                isAddMember && <Suspense fallback={
                    <Backdrop open />}>

                    <AddMembersDialog />
                </Suspense>
            }

            {confrimDeleteDialog && <Suspense fallback={
                <Backdrop open />}>
                <ConfrimDeleteDialog open={confrimDeleteDialog} handleClose={closeConfrimDeleteHandler}
                    deleteHandler={deleteHandler} />
            </Suspense>}
            <Drawer open={isMobileMenuOpen} onClose={
                handleMobileClose
            } sx={{
                display: {
                    xs: "block",
                    sm: "none"
                }
            }}>
                <GroupList w={"50vw"} myGroups={sampleChats} chatId={chatId} />
            </Drawer>
        </Grid>
    )
}
const GroupList = ({ w = "100%", myGroups = [], chatId }) => (
    <Stack width={w}>
        {
            myGroups.length > 0 ? (
                myGroups.map((group) => (
                    <GroupListItem group={group} chatId={chatId} key={group._id} />
                ))
            ) : (
                <Typography textAlign={"center"} padding={"1rem"}>
                    No groups
                </Typography>
            )
        }
    </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {

    const { name, avatar, _id } = group;
    return (
        <Link to={`?group=${_id}`} onClick={(e) => {
            if (chatId === _id) e.preventDefault()
        }}>
            <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
                <AvatarCard avatar={avatar} />
                <Typography>{name}</Typography>

            </Stack></Link>
    );
});

export default Group