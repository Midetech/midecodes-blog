import { ColumnType } from "@/types/column.type";
import { Task } from "@/types/Task.type";
import React from "react";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
};

const Column = ({ column, tasks }: ColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  return (
    <div className="flex w-80 flex-col rounded-lg bg-neutral-800 p-4 text-white">
      <h1 className="mb-4 font-semibold text-neutral-100"> {column.title}</h1>

      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
