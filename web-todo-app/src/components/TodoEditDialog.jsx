import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TextField } from '@mui/material';
import React, { useState } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function TodoEditDialog({ open, dialogHandler, todo, updateTodo }) {
    const [todoOpen, setTodoOpen] = useState(todo.description);

    const updateTodoHandler = () => {
        todo.description = todoOpen
        updateTodo(todo)
        dialogHandler()
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={dialogHandler}
            aria-describedby="alert-dialog-slide-description"
            fullWidth
        >
            <DialogTitle>{"Editando Task"}</DialogTitle>
            <DialogContent>
                <TextField
                    id="outlined-basic"
                    className='form'
                    label="Task"
                    variant="outlined"
                    defaultValue={todoOpen}
                    onChange={e => setTodoOpen(e.target.value)}
                    fullWidth />
            </DialogContent>
            <DialogActions>
                <Button onClick={dialogHandler}>Cancelar</Button>
                <Button onClick={() => updateTodoHandler()}>Atualizar</Button>
            </DialogActions>
        </Dialog>
    );
}
