import React from "react";
import { Workspace } from "@niklaspelli/fwk4-23-components";
import MembersListAvatar from "../../avatar/MembersListAvatar"; // Justera sökvägen om nödvändigt
import DraggableTaskBoard from "./DraggableTaskBoard";

const WorkspacePage = () => {


  return (
    <>
      <Workspace /> 
      <MembersListAvatar />
      <DraggableTaskBoard />
    </>
  );
};

export default WorkspacePage;