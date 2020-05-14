import express from 'express';

export default (db) => {
    const router = express.Router();
    const pageSize = 25;

    router.get('/', async(req, res, next) => {
        const page = (req.query.page - 1) || 0;
        
        try {
            db.Todos.findAndCountAll({
                limit: pageSize,
                offset: page * pageSize
            }).then(result => {
                res.status(200).json(result);
            }).catch(e => {
                res.status(500).json({
                    error: 'Internal Sever Error'
                });
                next(e);
            });
        } catch(e) {
            res.status(500).json({
                error: 'Internal Sever Error'
            });
            next(e);
        }
    });
    
    router.get('/:id', async(req, res, next) => {
        try {
            db.Todos.findOne({
                where: { 
                    id: req.params.id
                }
            }).then(result => {
                if(result) {
                    res.status(200).json(result);
                }
                
                res.status(404).send();
            }).catch(e => {
                res.status(500).json({
                    error: 'Internal Sever Error'
                });
                console.log(e);
            });
        }
        catch(e) {
            res.status(500).json({
                error: 'Internal Sever Error'
            });
            next(e); 
        }
    });
    
    router.post('/', async(req, res, next) => {
        try {
            db.Todos.create({
                title: req.body.name,
                notes: req.body.notes,
                dueDate: req.body.dueDate,
                priority: req.body.priority,
                archived: req.body.achived,
                archivedDate: req.body.archivedDate,
                completed: req.body.completed,
                completeDate: req.body.completed
            }).then(() => {
                res.status(204).json();
            }).catch(e => {
                res.status(500).json({
                    error: 'Internal Sever Error'
                });
                console.log(e);
            });
        }
        catch(e) { 
            res.status(500).json({
                error: 'Internal Sever Error'
            });
            next(e);
        }
    });
    
    router.put('/:id', async(req, res, next) => {
        db.Todos.update(
            {
                title: req.body.name,
                notes: req.body.notes,
                dueDate: req.body.dueDate,
                priority: req.body.priority,
                archived: req.body.achived,
                archivedDate: req.body.archivedDate,
                completed: req.body.completed,
                completeDate: req.body.completed,
                modifiedDate: Date.now()
            },
            { 
                where : { 
                    id: req.params.id
                }
            }
        ).then(([rowsUpdated], updatedRow) => {
            console.log(rowsUpdated);

            if(rowsUpdated !== 0) {
                res.status(204).json();
            }

            res.status(404).send();
            
        }).catch(e => {
            res.status(500).json({
                error: 'Internal Sever Error'
            });
            next(e);
        });
    });

    return router;
}
