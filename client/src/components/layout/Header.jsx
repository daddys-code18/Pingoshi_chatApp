import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material"
import { Suspense, lazy, useState } from "react"
import { useNavigate } from "react-router-dom"
import { orange } from './../../constants/color';
import {
    Add as AddIcon,
    Menu as MenuIcon,
    Search as SearchIcon,
    Group as GroupIcon,
    Notifications as NotificationsIcon,
    Logout as LogoutIcon
} from "@mui/icons-material"

const SearchDialog = lazy(() => import('../specific/Search'))
const NotificationsDialog = lazy(() => import('../specific/Notifications'))
const NewGroupDialog = lazy(() => import('../specific/Newgroup'))
import axios from 'axios';
import { server } from "../../constants/config";
import { useDispatch, useSelector } from 'react-redux';
import { userNotExists } from "../../redux/reducers/auth";
import toast from "react-hot-toast";
import {
    setIsMobile,
    setIsNewGroup,
    setIsNotification,
    setIsSearch,
} from "../../redux/reducers/misc";

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isSearch } = useSelector(state => state.misc)

    const [isNewGroup, setIsNewGroup] = useState(false)
    const [isNotification, setIsNotification] = useState(false)

    const handleMobile = () => dispatch(setIsMobile(true))

    const openSearch = () => dispatch(setIsSearch(true))

    const openNewGroup = () => {
        setIsNewGroup((prev) => !prev)
    }
    const openNotification = () => {
        setIsNotification((prev) => !prev)
    }

    const navigateToGroup = () => navigate("/groups")

    const logouthandler = async () => {
        try {
            const { data } = await axios.get(`${server}/api/v1/user/logout`, { withCredentials: true })
            toast.success(data.message)
            dispatch(userNotExists())

        } catch (error) {
            toast.error(error?.response?.data?.message || "Something Went Wrong")

        }

    }
    return (

        <>
            <Box sx={{ flexGrow: 1 }} height={"4rem"}>
                <AppBar position="static" sx={{
                    bgcolor: orange
                }}>
                    <Toolbar>
                        <Typography variant="h6"
                            sx={{ display: { xs: "none", sm: "block" } }}>
                            Pingoshi

                        </Typography>
                        <Box sx={{ display: { xs: "block", sm: "none" } }}>
                            <IconButton color="inherit" onClick={handleMobile} >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box >
                            <IconBtn title={"Search"}
                                icon={<SearchIcon />}
                                onClick={openSearch} />

                            <IconBtn title={"New Group"}
                                icon={<AddIcon />}
                                onClick={openNewGroup} />

                            <IconBtn title={"Manage Groups"}
                                icon={<GroupIcon />}
                                onClick={navigateToGroup} />

                            <IconBtn title={"Notifications"}
                                icon={<NotificationsIcon />}
                                onClick={openNotification} />

                            <IconBtn title={"Logout"}
                                icon={<LogoutIcon />}
                                onClick={logouthandler} />


                        </Box>

                    </Toolbar>


                </AppBar>

            </Box>
            {
                isSearch && (
                    <Suspense fallback={<Backdrop open />}>
                        <SearchDialog />

                    </Suspense>
                )
            }
            {
                isNotification && (
                    <Suspense fallback={<Backdrop open />}>

                        <NotificationsDialog />
                    </Suspense>
                )
            }
            {
                isNewGroup && (
                    <Suspense fallback={<Backdrop open />}>

                        <NewGroupDialog />
                    </Suspense>
                )
            }

        </>
    )
}

const IconBtn = ({ title, icon, onClick }) => {
    return (
        <Tooltip title={title}>
            <IconButton color="inherit" size="large" onClick={onClick}>
                {icon}
            </IconButton>
        </Tooltip>
    )
}
export default Header
