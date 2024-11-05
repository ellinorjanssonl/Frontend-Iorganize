import React, { useEffect, useState } from 'react';
import styles from './boards.module.css';

const Boards = ({ onSelectBoard }) => {
    const [boards, setBoards] = useState([]);
    const [newBoardName, setNewBoardName] = useState('');
    const [newBoardDescription, setNewBoardDescription] = useState('');
    const [expandedBoards, setExpandedBoards] = useState({});
    const [newTask, setNewTask] = useState({ title: '', description: '', assignedTo: '' });

    // Fetch all boards for the user
    const fetchUserBoards = async () => {
        try {
            const response = await fetch('http://localhost:3001/board/my-boards', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setBoards(data);
        } catch (error) {
            console.error("Error fetching boards:", error);
        }
    };

    const createBoard = async () => {
        try {
            const response = await fetch('http://localhost:3001/board/create', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newBoardName, description: newBoardDescription }),
            });

            if (response.ok) {
                fetchUserBoards();
                setNewBoardName('');
                setNewBoardDescription('');
            } else {
                console.error("Error creating board.");
            }
        } catch (error) {
            console.error("Error creating board:", error);
        }
    };


    const deleteBoard = async (boardId) => {
        try {
            const response = await fetch(`http://localhost:3001/board/delete/${boardId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setBoards(boards.filter((board) => board.id !== boardId));
            } else {
                console.error("Error deleting board.");
            }
        } catch (error) {
            console.error("Error deleting board:", error);
        }
    };

    const toggleTasks = async (boardId) => {
        onSelectBoard(boardId); 
        if (expandedBoards[boardId]) {
            setExpandedBoards((prev) => ({ ...prev, [boardId]: false }));
        } else {
            try {
                const response = await fetch(`http://localhost:3001/task/${boardId}/tasks`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setBoards((prevBoards) =>
                    prevBoards.map((board) =>
                        board.id === boardId ? { ...board, tasks: data } : board
                    )
                );
                setExpandedBoards((prev) => ({ ...prev, [boardId]: true }));
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }
    };

    const createTask = async (boardId) => {
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
                toggleTasks(boardId); 
            } else {
                console.error("Error creating task.");
            }
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    useEffect(() => {
        fetchUserBoards();
    }, []);

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
              console.log(`Task with ID ${taskId} deleted successfully.`);
              fetchUserBoards(); // Uppdatera board-listan med tasks
          } else {
              const errorData = await response.json();
              console.error("Error deleting task:", errorData.error || "Unknown error");
          }
      } catch (error) {
          console.error("Error deleting task:", error);
      }
  };
  
      

    return (
      <div className={styles.container}>
         <div className={styles.boardListContainer}>
                {boards.map((board) => (
                    <div key={board.id} className={styles.boardItem}>
                        <h3>{board.name}</h3>
                        <p>{board.description}</p>
                        <button onClick={() => toggleTasks(board.id)}>
                            {expandedBoards[board.id] ? "Hide Tasks" : "View Tasks"}
                        </button>
                        

                        {expandedBoards[board.id] && (
                            <div>
                                {board.tasks && board.tasks.length > 0 ? (
                                    <ul className={styles.boardTasks}>
                                        {board.tasks.map((task) => (
                                            <li key={task.id}>
                                              <h3>{task.title}</h3>
                                              <p>{task.description}</p>
                                              <p>Assigned to: {task.assigned_to}</p>
                                              <button onClick={() => {
    console.log("Attempting to delete task with ID:", task.id);
    deleteTask(task.id);
}}>
    Delete
</button>
                                              </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No tasks available for this board.</p>
                                )}

                                {/* Form to add a new task */}
                                <div className={styles.createTaskForm}>
                                    <h4>Add a new task</h4>
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
                                    <button className={styles.newtask} onClick={() => createTask(board.id)}>Add Task</button>
                                </div>
                                <button className={styles.deletebutton} onClick={() => deleteBoard(board.id)}>Delete</button>
                            </div>
                        )}
                    </div>
                    
                ))}
             </div>

             <div className={styles.createBoardForm}>
                <h3>Create New Board</h3>
                <input
                    type="text"
                    value={newBoardName}
                    onChange={(e) => setNewBoardName(e.target.value)}
                    placeholder="Board Name"
                />
                <input
                    type="text"
                    value={newBoardDescription}
                    onChange={(e) => setNewBoardDescription(e.target.value)}
                    placeholder="Board Description"
                />
                <button onClick={createBoard}>Create Board</button>
            </div>
        </div>
    );
};

export default Boards;
