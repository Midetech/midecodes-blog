import { Task } from "@/types/Task.type";


export const INITIAL_TASKS: Task[] = [
    {
        id: '1',
        title: 'Research Project',
        description: 'Gather requirements and create initial documentation',
        status: 'TODO',
    },
    {
        id: '2',
        title: 'Design System',
        description: 'Create component library and design tokens',
        status: 'TODO',
    },
    {
        id: '3',
        title: 'API Integration',
        description: 'Implement REST API endpoints',
        status: 'IN_PROGRESS',
    },
    {
        id: '4',
        title: 'Testing',
        description: 'Write unit tests for core functionality',
        status: 'DONE',
    },
];
