import { TaskStatus } from "./column.type";

export type Task = {
    id: string;
    status: TaskStatus;
    title: string;
    description: string;
};
