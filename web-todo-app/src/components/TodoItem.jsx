import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Paper } from '@mui/material';
import TodoEditDialog from './TodoEditDialog';
import { useState } from 'react';

export default function TodoItem({ todo, deleteTodo, updateTodo, updateTaskDone }) {
    const [openDialog, setOpenDialog] = useState(false)
    const [done, setDone] = useState(todo.done)
    const dialogHandler = () => {
        setOpenDialog(!openDialog)
    }
    const updateDone = () => {
        setDone(!done)
        todo.done = !todo.done
        updateTaskDone(todo)
    }
    return (
        <>
            <TodoEditDialog open={openDialog} dialogHandler={dialogHandler} todo={todo} updateTodo={updateTodo}/>
            <Paper style={{ padding: '0.5em 0em' }}>
                <ListItem
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo.id)} >
                            <DeleteIcon />
                        </IconButton>
                    }
                >
                    <ListItemButton role={undefined} dense>
                        <ListItemIcon>
                            <Checkbox
                                onClick={updateDone}
                                edge="start"
                                tabIndex={-1}
                                checked={done}
                                disableRipple
                            />
                        </ListItemIcon>
                        <ListItemText primary={todo.description} onClick={dialogHandler}/>
                    </ListItemButton>
                </ListItem>

            </Paper>
        </>
    );
}
