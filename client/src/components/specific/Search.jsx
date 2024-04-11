import { Dialog, DialogTitle, InputAdornment, Stack, TextField, List, ListItem, ListItemText } from "@mui/material"
import { useInputValidation } from "6pp"
import { Search as SearchIcon } from "@mui/icons-material"
import UserItem from "../shared/UserItem"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { setIsSearch } from "../../redux/reducers/misc"
import { useLazySearchUserQuery } from "../../redux/api/api"


const Search = () => {
    const { isSearch } = useSelector(state => state.misc);
    
    const [searchUser] = useLazySearchUserQuery()

    const dispatch = useDispatch();
    const search = useInputValidation("")

    let isloadingSendFriendRequest = false;


    const [users, setUsers] = useState([])

    const addFriendHandler = (id) => {
        console.log(id)
    }

    const searchCloseHandler = () => dispatch(setIsSearch(false))

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            searchUser(search.value)
                .then(({ data }) => setUsers(data.users))
                .catch((e) => console.log(e));
        }, 1000);

        return () => {
            clearTimeout(timeOutId);
        };
    }, [search.value])


    return (
        <Dialog open={isSearch} onClose={searchCloseHandler}>
            <Stack p={"2rem"} direction={"column"} width={"25rem"}><DialogTitle textAlign={"center"}>Find People</DialogTitle>
                <TextField
                    label=""
                    value={search.value}
                    onChange={search.changeHandler}
                    variant="outlined"
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />
                <List>
                    {
                        users.map((i) => (
                            <UserItem user={i}
                                key={i._id}
                                handler={addFriendHandler}
                                handlerIsLoading={isloadingSendFriendRequest} />
                        ))
                    }
                </List>
            </Stack>
        </Dialog >
    )
}

export default Search