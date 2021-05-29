const url = 'http://localhost:3000';

async function loadTasks(f_apiname){
    const response = await fetch(url + "/api/filter/" + f_apiname, {
        method : "GET",
        headers : {
          'Content-Type' : 'application/json',
        },
      
      } );
      const tasks = await response.json();
      return [...tasks];
}

async function addTask(task){
    await fetch(url + "/api/addTask", {
          method : "POST",
          headers : {
            'Content-Type' : 'application/json',
          },
          body : JSON.stringify(task),
        } );
}

async function modifyTask(task){
    await fetch(url + "/api/updateTask", {
        method : "PUT",
        headers : {
            'Content-Type' : 'application/json',
          },
          body : JSON.stringify(task),
    });
}

async function removeTask(task){
    await fetch(url + "/api/deleteTask/" + task.id, {
        method : "DELETE",
        headers : {
            'Content-Type' : 'application/json',
          },
    });
}

async function markTask(task){
    const body = {id : task.id, mark : task.completed};
    await fetch(url + "/api/markTask", {
        method : "PUT",
        headers : {
            'Content-Type' : 'application/json',
          },
          body : JSON.stringify(body),
    });
}


const API = {loadTasks, addTask, modifyTask, removeTask, markTask}
export default API;