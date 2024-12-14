"use client";
import Column from "@/components/Column";
import { COLUMNS } from "@/constant/columns";
import { INITIAL_TASKS } from "@/constant/task";
import React from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Task } from "@/types/Task.type";
import { toast } from "@/hooks/use-toast";

const KanbanBoard = () => {
  const [tasks, setTasks] = React.useState<Task[]>(INITIAL_TASKS);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    toast({
      title: "Task moved",
      description: `${active.data.current?.title} moved to ${newStatus}`,
      color: "green",
    });
  };
  return (
    <div className="mt-20">
      <h1
        className="text-4xl text-center font-bold my-5
     bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text"
      >
        Kanban Board
      </h1>
      <div className="flex justify-center space-x-10">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
};

export default KanbanBoard;
