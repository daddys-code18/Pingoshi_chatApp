import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from "@mui/material"
import {
    useInputValidation,
    //  useStrongPassword 
} from "6pp"
import { bgGradient } from "../../constants/color"
import { Navigate } from "react-router-dom"

const AdminLogin = () => {
    const isAdmin = true
    const secretkeys = useInputValidation("")
    const submitHandler = (e) => {
        e.preventDefault()
        console.log("submit")
    }
    if (isAdmin) return <Navigate to="/admin/dashboard" />
    return (
        <div style={{
            backgroundImage: bgGradient
        }}>

            <Container component={"main"} maxWidth="xs" sx={{
                height: '100vh',
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Paper elevation={3} sx={{
                    padding: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: 'center'

                }}>


                    <>
                        <Typography variant="h5"> Admin Login</Typography>
                        <form style={{
                            width: "100%",
                            marginTop: "1rem"

                        }} onSubmit={submitHandler} >
                            <TextField required fullWidth label="Secretkey" type="password" margin="normal" variant="outlined" value={secretkeys.value} onChange={secretkeys.changeHandler} />
                            <Button sx={{
                                marginTop: "1rem"
                            }} variant="contained" color="primary" fullWidth type="submit">Login</Button>
                            <Typography textAlign={"center"} m={"1rem"}>OR</Typography>
                        </form>
                    </>

                </Paper>

            </Container >
        </div>
    )
}

export default AdminLogin