import React, { useEffect, useState } from 'react';
import styles from './boards.module.css';

const Boards = () => {
    const [boards, setBoards] = useState([]);
    const [newBoardName, setNewBoardName] = useState('');
    const [newBoardDescription, setNewBoardDescription] = useState('');
    const [selectedBoard, setSelectedBoard] = useState(null); // For viewing board details with tasks


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

            if (response.status === 401) {
                console.error("Unauthorized: Please log in again.");
                return;
            }

            const data = await response.json();
            setBoards(data);
        } catch (error) {
            console.error("Error fetching boards:", error);
        }
    };

    // Create a new board
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
                fetchUserBoards(); // Refresh boards list
                setNewBoardName(''); // Reset input
                setNewBoardDescription('');
            } else {
                console.error("Error creating board.");
            }
        } catch (error) {
            console.error("Error creating board:", error);
        }
    };

    // Delete a board
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

    // Fetch board details with tasks
    const getBoardWithTasks = async (boardId) => {
        try {
            const response = await fetch(`http://localhost:3001/board/${boardId}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            setSelectedBoard(data); // Set selected board for detailed view
        } catch (error) {
            console.error("Error fetching board with tasks:", error);
        }
    };

    // Add a new board member
    const addBoardMember = async (boardId, userId) => {
        try {
            const response = await fetch(`http://localhost:3001/board/adduser/${boardId}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });

            if (response.ok) {
                console.log("User added successfully.");
                getBoardWithTasks(boardId); 
            } else {
                console.error("Error adding user.");
            }
        } catch (error) {
            console.error("Error adding user to board:", error);
        }
    };

    useEffect(() => {
        fetchUserBoards();
    }, []);

    return (
      <div className={styles.container}>
          <div className={styles.boardListContainer}>
              {boards.map(board => (
                  <div key={board.id} className={styles.boardItem}>
                      <h3>{board.name}</h3>
                      <p>{board.description}</p>
                      <ul className={styles.boardTasks}>
                          {board.tasks?.map(task => (
                              <li key={task.id}>{task.title}</li>
                          ))}
                      </ul>
                      <button onClick={() => getBoardWithTasks(board.id)}>View Tasks</button>
                      <button className={styles.deletebutton} onClick={() => deleteBoard(board.id)}>Delete</button>
                      {selectedBoard && (
                    <div className={styles.selectedBoard}>
                        <h3>{selectedBoard.name} Tasks</h3>
                        <ul>
                            {selectedBoard.tasks.map(task => (
                                <li key={task.id}>{task.title}</li>
                            ))}
                        </ul>
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
