import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material"
import { useState } from "react"
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

const Header = () => {
    const navigate = useNavigate()

    const [isMobile, setIsMobile] = useState(false)
    const [isSearch, setIsSearch] = useState(false)
    const [isNewGroup, setIsNewGroup] = useState(false)
    const [isNotification, setIsNotification] = useState(false)

    const handleMobile = () => {
        setIsMobile((prev) => !prev)
    }
    const openSearch = () => {
        setIsSearch((prev) => !prev)
    }
    const openNewGroup = () => {
        setIsNewGroup((prev) => !prev)
    }
    const openNotification = () => {
        setIsNotification((prev) => !prev)
    }

    const navigateToGroup = () => navigate("/groups")

    const logouthandler = () => {
        console.log("logout")
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
