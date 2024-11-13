// tasks.jsx
import React, { useState, useEffect } from 'react';

const Tasks = ({ boardId }) => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '', assignedTo: '' });
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        if (boardId) {
            fetchTasks(boardId);
        }
    }, [boardId]);

    const fetchTasks = async (boardId) => {
        try {
            const response = await fetch(`http://localhost:3001/task/${boardId}/tasks`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            // Kontrollera om responsen är tom
            if (!response.ok) {
                console.error("Error fetching tasks:", response.statusText);
                return; // Avsluta funktionen om responsen är felaktig
            }
    
            // Läs och logga svaret för att säkerställa att det är JSON
            const text = await response.text();
            console.log("Response text:", text);
    
            // Om svaret är tomt, logga detta och avsluta funktionen
            if (!text) {
                console.error("No data returned from server");
                return;
            }
    
            // Omvandla texten till JSON
            const data = JSON.parse(text);
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };
  

    const createTask = async () => {
        try {
            const response = await fetch(`http://localhost:3001/task/create/${boardId}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });
            if (response.ok) {
                setNewTask({ title: '', description: '', assignedTo: '' });
                fetchTasks(boardId);
            } else {
                console.error("Error creating task.");
            }
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const addTaskComment = async (taskId) => {
        try {
            const response = await fetch(`http://localhost:3001/task/addcomment/${taskId}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment: newComment }),
            });
            if (response.ok) {
                setNewComment('');
                fetchTasks(boardId);
            } else {
                console.error("Error adding comment.");
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };
    
    const deleteTask = async (taskId) => {
        try {
            const response = await fetch(`http://localhost:3001/task/delete/${taskId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                fetchTasks(boardId);
            } else {
                console.error("Error deleting task.");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div>
            <h3>Tasks for this board</h3>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <h2>{task.title}</h2>
                        <p>{task.description}</p>
                        <p>Assigned to: {task.assigned_to}</p>
                        <button onClick={() => deleteTask(task.id)}>Delete Task</button>
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment"
                        />
                        <button onClick={() => addTaskComment(task.id)}>Add Comment</button>
                    </li>
                ))}
            </ul>
            <div>
                <h2>Add a new task</h2>
                <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Task Title"
                />
                <input
                    type="text"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Task Description"
                />
                <input
                    type="text"
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                    placeholder="Assigned to (User ID)"
                />
                <button onClick={createTask}>Add Task</button>
            </div>
        </div>
    );
};

export default Tasks;
