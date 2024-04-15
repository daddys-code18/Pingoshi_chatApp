import { useInputValidation } from '6pp';
import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import UserItem from '../shared/UserItem';
import { useDispatch, useSelector } from 'react-redux';
import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/api/api';
import {
    useAsyncMutation,
    useErrors
} from "../../hooks/hook";
import { setIsNewGroup } from "../../redux/reducers/misc";
import toast from "react-hot-toast";



const Newgroup = () => {
    const { isNewGroup } = useSelector(state => state.misc)
    const dispatch = useDispatch()

    const { isError, isLoading, error, data } = useAvailableFriendsQuery()
    const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

    const groupName = useInputValidation("")

    const [selectMembers, setSelectMembers] = useState([])

    const errors = [
        {
            isError,
            error,
        },
    ];

    useErrors(errors);


    const selectMemberHandler = (id) => {
        setSelectMembers((prev) => prev.includes(id) ? prev.filter((currElement) => currElement !== id) : [...prev, id])
    };
    const submitHandler = () => {
        if (!groupName.value) return toast.error("Group name is required");

        if (selectMembers.length < 2)
            return toast.error("Please Select Atleast 3 Members");

        newGroup("Creating New Group...", {
            name: groupName.value,
            members: selectMembers,
        });

        closeHandler();
    };
    const closeHandler = () => {
        dispatch(setIsNewGroup(false))
    }
    return (
        <Dialog open={isNewGroup} onClose={closeHandler}>
            <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"}
                spacing={"2rem"}>
                <DialogTitle textAlign={"center"} variant='h4'>New group</DialogTitle>
                <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler} />
                <Typography variant='body1'>Members</Typography>

                <Stack>
                    {
                        isLoading ? <Skeleton /> : data?.friends.map((i) => (
                            <UserItem user={i} key={i._id} handler={selectMemberHandler} isAdded={selectMembers.includes(i._id)} />
                        ))
                    }
                </Stack>
                <Stack direction={"row"} justifyContent={"space-evenly"}>
                    <Button variant='text' color='error' size='large' onClick={closeHandler}>
                        cancel
                    </Button>
                    <Button variant='contained' size='large' onClick={submitHandler} disabled={isLoadingNewGroup}>create</Button>

                </Stack>

            </Stack>

        </Dialog>
    )
}

export default Newgroup