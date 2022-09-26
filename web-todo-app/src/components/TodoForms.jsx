import { Button, Paper, TextField } from '@mui/material'
import './TodoForms.css'
import React, { useState } from 'react'

function TodoForms({ addTodo }) {
    const [description, setDescription] = useState(null)
    const taskHandler = (taskDescription) => {
        addTodo(taskDescription)
        document.getElementById('outlined-basic').value = null
    }

    return (
        <Paper className='todoForm'>
            <TextField
                id="outlined-basic"
                label="Task"
                variant="outlined"
                onChange={e => setDescription(e.target.value)}
                fullWidth />
            <Button variant="text" onClick={() => taskHandler(description)}>Adicionar</Button>
        </Paper>
    )
}

export default TodoForms