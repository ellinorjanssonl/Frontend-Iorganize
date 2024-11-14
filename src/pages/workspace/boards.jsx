import React, { useEffect, useState } from "react";
import styles from "./boards.module.css";
import Tasks from "./tasks";

const Boards = ({ onSelectBoard }) => {
    const [boards, setBoards] = useState([]);
    const [newBoardName, setNewBoardName] = useState("");
    const [newBoardDescription, setNewBoardDescription] = useState("");
    const [invites, setInvites] = useState([]);
    const [inviteEmail, setInviteEmail] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserBoards = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:3001/board/my-boards", {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Fetched boards:", data);
                setBoards(data);
            } else {
                console.error("Failed to fetch boards");
            }
        } catch (error) {
            console.error("Error fetching boards:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserBoards();
    }, []);

    const createBoard = async () => {
        try {
            const response = await fetch("http://localhost:3001/board/create", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newBoardName, description: newBoardDescription }),
            });

            if (response.ok) {
                fetchUserBoards();
                setNewBoardName("");
                setNewBoardDescription("");
            } else {
                console.error("Error creating board.");
            }
        } catch (error) {
            console.error("Error creating board:", error);
        }
    };

    return (
        <div className={styles.container}>
            {isLoading ? (
                <p>Loading...</p>
            ) : boards.length === 0 ? (
                <p>No boards found. Create one to get started!</p>
            ) : (
                boards.map((board) => (
                    <div key={board.id} className={styles.boardItem}>
                        <h3>{board.name}</h3>
                        <p>{board.description}</p>
                        <button onClick={() => onSelectBoard(board.id)}>Select</button>
                        <Tasks boardId={board.id} />
                    </div>
                ))
            )}

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
