import React, { useState } from "react";
import { TaskBoard } from "@niklaspelli/fwk4-23-components";

const DraggableTaskBoard = () => {
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null);

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const removeTaskFromAllColumns = (taskId) => {
    setBacklogTasks((prev) => prev.filter((task) => task.id !== taskId));
    setDoingTasks((prev) => prev.filter((task) => task.id !== taskId));
    setFinishedTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const handleDrop = (column) => {
    if (draggedTask) {
      removeTaskFromAllColumns(draggedTask.id);

      switch (column) {
        case "backlog":
          setBacklogTasks((prev) => [...prev, draggedTask]);
          break;
        case "doing":
          setDoingTasks((prev) => [...prev, draggedTask]);
          break;
        case "finished":
          setFinishedTasks((prev) => [...prev, draggedTask]);
          break;
        default:
          break;
      }

      setDraggedTask(null);
    }
  };

  
  const createNewTask = (taskContent) => {
    const now = new Date(); 
    const formattedDate = now.toLocaleString(); 
  
    return {
      id: now.getTime(),  
      content: taskContent,
      createdAt: formattedDate, 
    };
  };

  const handleAddBacklogTask = (taskContent) => {
    const newTask = createNewTask(taskContent);
    setBacklogTasks((prev) => [...prev, newTask]);
  };

  const handleAddDoingTask = (taskContent) => {
    const newTask = createNewTask(taskContent);
    setDoingTasks((prev) => [...prev, newTask]);
  };

  const handleAddFinishedTask = (taskContent) => {
    const newTask = createNewTask(taskContent);
    setFinishedTasks((prev) => [...prev, newTask]);
  };


const handleTaskRemove = (task) => {
    removeTaskFromAllColumns(task.id);
  };

  return (
    <TaskBoard
      backlogTasks={backlogTasks}
      doingTasks={doingTasks}
      finishedTasks={finishedTasks}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onAddBacklogTask={handleAddBacklogTask}
      onAddDoingTask={handleAddDoingTask}
      onAddFinishedTask={handleAddFinishedTask}
      onTaskRemove={handleTaskRemove}
    />
  );
};

export default DraggableTaskBoard;



