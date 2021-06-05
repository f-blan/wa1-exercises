'use strict';
/* Data Access Object (DAO) module for accessing courses and exams */

const sqlite = require('sqlite3');
const dayjs = require('dayjs');

// open the database
const db = new sqlite.Database('tasks.db', (err) => {
  if(err) throw err;
});




let lastID;
const getlastID = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT max(id) as lastID from tasks';
    db.get(sql, [], (err, row) => {
      if (err) {
        reject(err);
        undefined;
      }
      if (row == undefined) {
        lastID = 0;
      }else{
        lastID = row.lastID;
      }
    });
  });
}




getlastID().then().catch();



// get all tasks
exports.all = (userid) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks where user = ?';
    db.all(sql, [userid], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const tasks = rows.map((e) => ({
           id: e.id, description: e.description, important: e.important, private : e.private, deadline : e.deadline, completed : e.completed,
            user: e.user
        }));
      resolve(tasks);
    });
  });
};

//get importants
exports.important = (userid) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks Where important = 1 and user = ?';
    db.all(sql, [userid], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const tasks = rows.map((e) => ({
           id: e.id, description: e.description, important: e.important, private : e.private, deadline : e.deadline, completed : e.completed,
            user: e.user
        }));
      resolve(tasks);
    });
  });
};
//get privates
exports.private = (userid) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks Where private = 1 and user = ?';
    db.all(sql, [userid], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const tasks = rows.map((e) => ({
           id: e.id, description: e.description, important: e.important, private : e.private, deadline : e.deadline, completed : e.completed,
            user: e.user
        }));
      resolve(tasks);
    });
  });
};

exports.today = (userid) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks where deadline != NULL and user = ?';
    db.all(sql, [userid], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const tasks = rows.map((e) => ({
           id: e.id, description: e.description, important: e.important, private : e.private, deadline : e.deadline, completed : e.completed,
            user: e.user
        })).filter((t) => dayjs().isSame(t.deadline, 'date'));
      resolve(tasks);
    });
  });
};

exports.next7days = (userid) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks WHERE deadline is not null and user = ?';
    db.all(sql, [userid], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const tasks = rows.map((e) => ({
           id: e.id, description: e.description, important: e.important, private : e.private, deadline : e.deadline, completed : e.completed,
            user: e.user
        })).filter((t) => {
          if(dayjs().diff(t.deadline, 'day')<0 && dayjs().diff(t.deadline, 'day')>=-7){
            return true;
          }
          return  false;
        
        });
      resolve(tasks);
    });
  });
};

// get the course identified by {code}
exports.getTask = (id, userid) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks WHERE id=? and user = ?';
    db.get(sql, [id, userid], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == undefined) {
        reject({error: 'Task not found.'});
      } else {
        const task = { id: row.id, description: row.description, important: row.important, private : row.private, deadline : row.deadline,
             completed : row.completed,
            user: row.user };
        resolve(task);
      }
    });
  });
};


// add a new exam
exports.createTask = (task) => {
  return new Promise((resolve, reject) => {
    const sql = 
    `INSERT INTO tasks(id, description, important, private, deadline, completed, user) 
    VALUES(?, ?, ?, ?, ?, ?, ?)`;
    db.run(sql, [lastID+1, task.description, task.important, task.private, task.deadline, task.completed, task.user], 
        function (err) {
      if (err) {
        reject(err);
        return;
      }
      lastID++;
      resolve(this.lastID);
    });
  });
};

// update an existing exam
exports.updateTask = (task) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE tasks SET 
    description = ?, important = ?, private = ?, deadline=DATE(?), completed=?, user= ?
     WHERE id = ?`;
    db.run(sql, [task.description, task.important, task.private, task.deadline, task.completed, task.user,task.id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

// delete an existing exam
exports.deleteTask = (id, userid) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM tasks WHERE id = ? and user = ?';
    db.run(sql, [id, userid], (err) => {
      if (err) {
        reject(err);
        return;
      } else
        resolve(null);
    });
  });
}

exports.markTask = (id, completed, userid) => {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE tasks SET 
      completed = ?
       WHERE id = ? and user = ?`;
      db.run(sql, [completed,id, userid], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID);
      });
    });
  };
  

  