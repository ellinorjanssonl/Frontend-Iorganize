import React from "react";
import MembersListAvatar from "../../avatar/MembersListAvatar";
import Boards from "./boards";
import "./boards.module.css";

const WorkspacePage = () => {
  return (
    <>
      <MembersListAvatar />
      <Boards/>
    </>
  );
};

export default WorkspacePage;
