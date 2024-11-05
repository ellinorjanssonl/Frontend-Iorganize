import React, { useState } from "react";
import MembersListAvatar from "../../avatar/MembersListAvatar";
import Boards from "./boards";
import "./boards.module.css";

const WorkspacePage = () => {
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  // Hanterar valet av ett board
  const handleSelectBoard = (boardId) => {
    setSelectedBoardId(boardId);
  };

  return (
    <>
      <MembersListAvatar />
      <Boards onSelectBoard={handleSelectBoard} />
    </>
  );
};

export default WorkspacePage;
