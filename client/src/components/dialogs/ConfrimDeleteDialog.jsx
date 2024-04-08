
import { DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
const ConfrimDeleteDialog = ({ open, handleClose, deleteHandler }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                confirm Delete
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this group?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}> No</Button>
                <Button onClick={deleteHandler}> Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfrimDeleteDialog
