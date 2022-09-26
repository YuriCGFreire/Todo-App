import React, { useState, useEffect } from 'react'
import axios from "axios"
import './TodoHome.css'
import { Container, List } from '@mui/material';
import TodoForms from '../components/TodoForms';
import TodoItem from '../components/TodoItem';


function TodoHome() {
    const [todos, setTodos] = useState([])

    async function addTodo(description){
        await axios.post("http://localhost:3003/tasks", {description})
        getTodos()
    }

    async function getTodos() {
        const response = await axios.get("http://localhost:3003/tasks")
        setTodos([...response.data])
    }

    async function deleteTodo(id){
        await axios.delete(`http://localhost:3003/tasks/${id}`)
        getTodos()
    }

    async function updateTaskDone(task){
        await axios.patch(`http://localhost:3003/tasks/${task.id}`, {description: task.description, done: task.done})
        getTodos()
    }

    async function updateTodo(task){
        await axios.patch(`http://localhost:3003/tasks/${task.id}`, {description: task.description, done: task.done})
        getTodos()
    }

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <Container maxWidth="xs" className='app'>
            <TodoForms addTodo={addTodo} />
            <div className='todoList'>
                <List >
                    {todos.map((todo) => {
                        return (
                            <div className="todoItem" key={todo.id}>
                                <TodoItem todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} updateTaskDone={updateTaskDone} />
                            </div>
                        )
                    })}
                </List>
            </div>
        </Container>
    )
}

export default TodoHome