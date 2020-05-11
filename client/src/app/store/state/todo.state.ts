import ITodo from 'src/app/todos/models/todo';


export interface ITodoState {
    todos: Array<ITodo>;
    loading: boolean;
    error?: string;
}

export const initialTodoState: ITodoState = {
    todos: [],
    loading: false,
    error: undefined
};
