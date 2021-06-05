const url = 'http://localhost:3000';

async function loadTasks(f_apiname){
    const response = await fetch(url + "/api/filter/" + f_apiname, {
        method : "GET",
        headers : {
          'Content-Type' : 'application/json',
        },
      
      } );

      if(response.ok){
        const tasks = await response.json();
        return tasks;
      }
      
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

async function login(username, password){
  const body = {username : username, password : password};
  const response = await fetch(url + "/api/login", {
      method : "POST",
      headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(body),
  });

  if(response.ok){
    const user = await response.json();
    return user;
  }else {
    try {
      const errDetail = await response.json();
      throw errDetail.message;
    }
    catch(err) {
      throw err;
    }
  }
}


async function logout(){
  await fetch(url + "/api/logout", {
      method : "DELETE",
      headers : {
          'Content-Type' : 'application/json',
        },
  });
}

async function getUserInfo(){
  const response = await fetch(url + "/api/session", {
      method : "GET",
      headers : {
          'Content-Type' : 'application/json',
        },
  });
  const userInfo = await response.json();
  if(response.ok){
    return userInfo;
  }else{
    throw userInfo;
  }
}

const API = {loadTasks, addTask, modifyTask, removeTask, markTask, login, logout, getUserInfo}
export default API;