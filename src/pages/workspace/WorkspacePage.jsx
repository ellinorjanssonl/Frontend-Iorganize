import React from "react";
import { Workspace } from "@niklaspelli/fwk4-23-components";
import MembersListAvatar from "../../avatar/MembersListAvatar";
import DraggableTaskBoard from "./DraggableTaskBoard";
import Tasks from "./tasks";

const WorkspacePage = () => {
  return (
    <>
      <MembersListAvatar />
      <Tasks />
      <Workspace />
      <DraggableTaskBoard />
    </>
  );
};

export default WorkspacePage;
