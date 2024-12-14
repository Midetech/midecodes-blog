import { Task } from "@/types/Task.type";
import { useDraggable } from "@dnd-kit/core";
import React from "react";
type TaskCardProps = {
  task: Task;
};
const TaskCard = ({ task }: TaskCardProps) => {
  const { setNodeRef, attributes, listeners, transform } = useDraggable({
    id: task.id,
    data: task,
  });
  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md"
      style={style}
    >
      <h3 className="font-medium text-neutral-100">{task.title}</h3>
      <p className="mt-2 text-sm text-neutral-400">{task.description}</p>
    </div>
  );
};

export default TaskCard;
