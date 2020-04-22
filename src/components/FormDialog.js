import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog({ setModalControl, modalControl, currentUser, setFetchSuccessUpdatedEmail }) {

    //keep in mind every time to modal reopens, error is set back to false.
    const [error, setError] = React.useState(false);

    const [input, setInput] = React.useState('')


    const handleClose = () => {
        setModalControl(false)
    };

    const handleUpdateEmail = () => {

        const data = {
            _id: currentUser._id,
            newEmail: input,
        }


        fetch('/api/update-email', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data
            }),
        })
            .then(res => {
                return res.json()
            })
            .then(json => {
                if (json.success) {
                    setModalControl(false)
                    setFetchSuccessUpdatedEmail(json.email)
                } else {
                    setInput('')
                    setError(true)
                }
            })

    }

    console.log(error)

    return (
        <div>

            <Dialog open={modalControl} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Admin</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can edit the email from here.
          </DialogContentText>
                    <TextField

                        value={input}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        helperText={!error ? "" : "Cannot update with the same email."}
                        onChange={(e) => setInput(e.target.value)}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleUpdateEmail} color="primary">
                        Submit
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}