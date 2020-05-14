import todosRouter from './todos';

export default (router, db) => {
    router.use('/todos', todosRouter(db));
    
    return router;
};