'use strict';

const express = require('express')
const morgan = require('morgan')
const PORT = 3001;

const dao = require('./dao'); // module for accessing the DB
const userDao = require('./dao-users');

const passport = require('passport');
const passportLocal = require('passport-local');
const session = require('express-session');

//initialize passport Strategy
passport.use(new passportLocal.Strategy((username, password, done) => {
    userDao.getUser(username, password).then(user => {
        if(user)
            done(null, user);
        else
            done(null, false, {message : 'Wrong username or password'});
    }).catch(err => {
        done(err);
    })
}));

//serialize and deserialize the user (just the id)
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
    userDao.getUserById(id)
      .then(user => {
        done(null, user); // this will be available in req.user
      }).catch(err => {
        done(err, null);
      });
});

// Express initialization

const app = express();
app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));

app.use(morgan('dev'));
app.use(express.json()); // parse the body in JSON format => populate req.body attributes


//initialize HTTP sessions
app.use(session({
    secret: 'BAEGroup-biglab2',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());


//authentication middleware
const isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated())
        return next();
    
    return res.status(401).json({error : 'not authenticated'});
}

//POST /login
app.post('/api/login', function(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err)
            return next(err);
        if (!user) {
          // display wrong login messages
          return res.status(401).json(info);
        }
        // success, perform the login
        req.login(user, (err) => {
        
            
          if (err)
            return next(err);
          
          // req.user contains the authenticated user, we send all the user info back
          // this is coming from userDao.getUser()
          return res.json(req.user);
        });
    })(req, res, next);
  });
// DELETE /sessions/current 
// logout
app.delete('/api/logout', (req, res) => {
    req.logout();
    res.end();
  });
  

/*
  TASK API FUNCTIONS
*/
app.get('/api/filter/:filterId', isLoggedIn,(req, res) => {
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
    funct(req.user.id)
        .then((tasks) => { res.json(tasks); })
        .catch((error) => { res.status(500).json(error); });
    }
});


app.get('/api/retrieveTask/:id', isLoggedIn,async (req, res) => {
    const code = req.params.id;
    try {
        let task = await dao.getTask(code, req.user.id);
        res.json(task);
    } catch (error) {
        res.status(500).json(error);
    }

});

app.post('/api/addTask', isLoggedIn, async (req, res) => {
    
    let description = req.body.description;
    let important = req.body.important;
    let priv = req.body.private;
    let deadline = req.body.deadline;
    let user = req.user.id;
    try {
        let id = await dao.createTask({ description: description, important: important, 
            private : priv, deadline: deadline, completed: 0, user: user});
        res.json(id);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.put('/api/updateTask', isLoggedIn, async (req, res) => {
    let id = req.body.id;
    let description = req.body.description;
    let important = req.body.important;
    let priv = req.body.private;
    let deadline = req.body.deadline;
    let user = req.user.id;
    try {
        await dao.updateTask({id: id, description: description, important: important, 
            private : priv, deadline: deadline, completed: 0, user: user});
        res.end();
    } catch (error) {
        res.status(500).json(error);
    }
});

app.delete('/api/deleteTask/:id', isLoggedIn, async (req, res) => {
    const code = req.params.id;
    try {
        let task = await dao.deleteTask(code, req.user.id);
        res.end();
    } catch (error) {
        res.status(500).json(error);
    }

});

app.put('/api/markTask', isLoggedIn, async (req, res) => {
    let id = req.body.id;
    let mark = req.body.mark;
    try {
        await dao.markTask(id, mark, req.user.id);
        res.end();
    } catch (error) {
        res.status(500).json(error);
    }
});

app.get('/api/session', isLoggedIn, (req, res) =>{
    if(req.isAuthenticated)
        res.status(200).json(req.user);
    else
        res.status(401).json({error : 'Unauthenticated!'});
});