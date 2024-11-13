import React, { useEffect, useState } from 'react';
import styles from './boards.module.css';
import Tasks from './tasks';

const Boards = () => {
    const [boards, setBoards] = useState([]);
    const [newBoardName, setNewBoardName] = useState('');
    const [newBoardDescription, setNewBoardDescription] = useState('');
    const [invites, setInvites] = useState([]);
    const [inviteEmail, setInviteEmail] = useState('');
    const [selectedBoardId, setSelectedBoardId] = useState(null);
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
            console.log("Fetched boards:", data); // Lägg till logg här
            setBoards(data);
        } catch (error) {
            console.error("Error fetching boards:", error);
        }
    };
    
    const fetchInvites = async () => {
        try {
            const response = await fetch('http://localhost:3001/invite/get', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log("Fetched invites:", data); // Lägg till logg här
            setInvites(data);
        } catch (error) {
            console.error("Error fetching invites:", error);
        }
    };

    const sendInvite = async (boardId) => {
        try {
            const response = await fetch('http://localhost:3001/invite/send', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ boardId, invitedEmail: inviteEmail }),
            });

            if (response.ok) {
                setInviteEmail('');
                alert('Invite sent successfully!');
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Failed to send invite');
            }
        } catch (error) {
            console.error("Error sending invite:", error);
        }
    };

    const acceptInvite = async (inviteId) => {
        try {
            const response = await fetch(`http://localhost:3001/invite/${inviteId}/accept`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                fetchUserBoards();
                fetchInvites();
                console.log (inviteId);
            } else {
                console.error("Error accepting invite.");
            }
        } catch (error) {
            console.error("Error accepting invite:", error);

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

    useEffect(() => {
        fetchUserBoards();
        fetchInvites();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.boardListContainer}>
              {boards.map((board, index) => (
               <div key={`${board.id}-${index}`} className={styles.boardItem}>
               <h3>{board.name}</h3>
               <p>{board.description}</p>
                <div className={styles.boardActions}>
                 <button onClick={() => setSelectedBoardId(board.id)}>Select Board</button>
              </div>

            {selectedBoardId === board.id && <Tasks boardId={board.id} />}
              <div className={styles.inviteForm}>
               <h4>Invite a Member</h4>
                <input
                 type="email"
                 value={inviteEmail}
                 onChange={(e) => setInviteEmail(e.target.value)}
                 placeholder="User's Email"
                />
                <button onClick={() => sendInvite(board.id)}>Send Invite</button>
              </div>
             </div>
            ))}
             </div>
               <div className={styles.invitesContainer}>
                <h3>Pending Invites</h3>
                <ul>
                  {invites.map((invite, index) => (
                  <li key={`${invite.id}-${index}`}>
                   <p>Board: {invite.board_id} - Invited by: {invite.invited_by}</p>
                   <button onClick={() => acceptInvite(invite.id)}>Accept Invite</button>
                  </li>
                ))}
               </ul>

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
