'use strict';

const express = require('express')
const morgan = require('morgan')


const PORT = 3001;

const dao = require('./dao'); // module for accessing the DB

const app = express();
app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));

app.use(morgan('dev'));
app.use(express.json()); // parse the body in JSON format => populate req.body attributes

app.get('/api/filter/:filterId', (req, res) => {
    const id = req.params.filterId;
    let funct;

    switch(id){
        case "all":
            funct = dao.all;
            break;
        case "important":
            funct = dao.important;
            break;
        case "private":
            funct = dao.private;
            break;
        case "today" :
            funct = dao.today;
            break;
        case "next7days":
            funct = dao.next7days;
            break;
        default:
            res.status(404).json("unexistent filter");
            funct = undefined;
            break;
    }
    if(funct != undefined){
    funct()
        .then((tasks) => { res.json(tasks); })
        .catch((error) => { res.status(500).json(error); });
    }
});


app.get('/api/retrieveTask/:id', async (req, res) => {
    const code = req.params.id;
    try {
        let task = await dao.getTask(code);
        res.json(task);
    } catch (error) {
        res.status(500).json(error);
    }

});

app.post('/api/addTask', async (req, res) => {
    
    let description = req.body.description;
    let important = req.body.important;
    let priv = req.body.private;
    let deadline = req.body.deadline;
    let user = req.body.user;
    try {
        let id = await dao.createTask({ description: description, important: important, 
            private : priv, deadline: deadline, completed: 0, user: user});
        res.json(id);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.put('/api/updateTask', async (req, res) => {
    let id = req.body.id;
    let description = req.body.description;
    let important = req.body.important;
    let priv = req.body.private;
    let deadline = req.body.deadline;
    let user = req.body.user;
    try {
        await dao.updateTask({id: id, description: description, important: important, 
            private : priv, deadline: deadline, completed: 0, user: user});
        res.end();
    } catch (error) {
        res.status(500).json(error);
    }
});

app.delete('/api/deleteTask/:id', async (req, res) => {
    const code = req.params.id;
    try {
        let task = await dao.deleteTask(code);
        res.end();
    } catch (error) {
        res.status(500).json(error);
    }

});

app.put('/api/markTask', async (req, res) => {
    let id = req.body.id;
    let mark = req.body.mark;
    try {
        await dao.markTask(id, mark);
        res.end();
    } catch (error) {
        res.status(500).json(error);
    }
});