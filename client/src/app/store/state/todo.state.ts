import ITodo from 'src/app/todos/models/todo';


export interface ITodoState {
    todos: Array<ITodo>;
    loading: boolean;
}

export const initialTodoState: ITodoState = {
    todos: [],
    loading: false
};
