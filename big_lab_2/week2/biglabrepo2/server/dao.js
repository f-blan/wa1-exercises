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
exports.all = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks';
    db.all(sql, [], (err, rows) => {
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
exports.important = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks Where important = 1';
    db.all(sql, [], (err, rows) => {
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
exports.private = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks Where private = 1';
    db.all(sql, [], (err, rows) => {
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

exports.today = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks where deadline != NULL';
    db.all(sql, [], (err, rows) => {
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

exports.next7days = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks WHERE deadline is not null';
    db.all(sql, [], (err, rows) => {
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
exports.getTask = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks WHERE id=?';
    db.get(sql, [id], (err, row) => {
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
exports.deleteTask = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM tasks WHERE id = ?';
    db.run(sql, [id], (err) => {
      if (err) {
        reject(err);
        return;
      } else
        resolve(null);
    });
  });
}

exports.markTask = (id, completed) => {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE tasks SET 
      completed = ?
       WHERE id = ?`;
      db.run(sql, [completed,id], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID);
      });
    });
  };
  

  