export default interface ITodo {
    id: number;
    title: string;
    notes: string;
    dueDate: Date;
    priority: 0 | 1 | 2;
    modifiedDate?: Date;
    createDate: Date;
}
