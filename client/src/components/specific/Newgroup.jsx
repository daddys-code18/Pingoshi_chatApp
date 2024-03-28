import { useInputValidation } from '6pp';
import { Button, Dialog, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import { sampleUsers } from '../../constants/sampleData';
import UserItem from '../shared/UserItem';


const Newgroup = () => {
    const groupName = useInputValidation("")
    const [members, setMembers] = useState(sampleUsers)
    const [selectMembers, setSelectMembers] = useState([])

    const selectMemberHandler = (id) => {
        setSelectMembers((prev) => prev.includes(id) ? prev.filter((currElement) => currElement !== id) : [...prev, id])
    };
    const submitHandler = () => { };
    const closeHandler = () => { }
    return (
        <Dialog open onClose={closeHandler}>
            <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"}
                spacing={"2rem"}>
                <DialogTitle textAlign={"center"} variant='h4'>New group</DialogTitle>
                <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler} />
                <Typography variant='body1'>Members</Typography>

                <Stack>
                    {
                        members.map((i) => (
                            <UserItem user={i} key={i._id} handler={selectMemberHandler} isAdded={selectMembers.includes(i._id)} />
                        ))
                    }
                </Stack>
                <Stack direction={"row"} justifyContent={"space-evenly"}>
                    <Button variant='text' color='error' size='large'>
                        cancel
                    </Button>
                    <Button variant='contained' size='large' onClick={submitHandler}>create</Button>

                </Stack>

            </Stack>

        </Dialog>
    )
}

export default Newgroup