export default interface ITodo {
    id: number;
    title: string;
    notes: string;
    dueDate: Date;
    priority: 0 | 1 | 2;
    archived: boolean;
    archiveDate?: Date;
    completed: boolean;
    completeDate?: Date;
    updatedAt?: Date;
    createdAt: Date;
}
