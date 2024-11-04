import React from "react";
/* import { Workspace } from "@niklaspelli/fwk4-23-components"; */
import MembersListAvatar from "../../avatar/MembersListAvatar";
/* import DraggableTaskBoard from "./DraggableTaskBoard"; */
import Boards from "./boards";
import "./boards.module.css";

const WorkspacePage = () => {
  return (
    <>
      <MembersListAvatar />
      <Boards/>
    {/*   <Workspace /> */}
  {/*     <DraggableTaskBoard /> */}
    </>
  );
};

export default WorkspacePage;
