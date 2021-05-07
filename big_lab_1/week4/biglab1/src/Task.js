

import dayjs from 'dayjs';

// only methods get_List and get_Filters are meaningful for biglab1 week2



function Task(id, description, isUrgent = false, isPrivate = true, deadline = '') {
    this.id = id;
    this.description = description;
    this.important = isUrgent;
    this.private = isPrivate;
    this.deadline = deadline && dayjs(deadline);
  
  
    this.toString = () => {
      return `Id: ${this.id}, ` +
      `Description: ${this.description}, Urgent: ${this.urgent}, Private: ${this.private}, ` +
      `Deadline: ${this._formatDeadline('LLL')}`;
    }
  
    this._formatDeadline = (format) => {
      return this.deadline ? this.deadline.format(format) : '<not defined>';
    }
  }

function filter_all(task){
    return true;
}
function filter_important(task){
    return task.important;
}
function filter_today(task){
    
    return dayjs().isSame(task.deadline, 'date');
}
function filter_private(task){
    return task.private;
}
function filter_bseven(task){
    if(dayjs().diff(task.deadline, 'day')<0 && dayjs().diff(task.deadline, 'day')>=-7){
        return true;
    }
    return  false;
}

function TaskList(paramlist){
    let list = paramlist.map((x) => x);


    this.getList=function(){
        return list;
        
    }
    this.add= function(task){
        
        list.push(task);
        
    }

    this.remove = function(task){
        const index = list.map((t) => t.id).indexOf(task.id);
        if(index> -1){
            list.splice(index, 1);
        }
    }

    this.modify= function(task){
        
        const up = list.filter((t) => t.id === task.id).pop();
        up.description=task.description;
        up.private= task.private;
        up.important = task.important;
        up.deadline = task.deadline;
        
    }

    this.getLastId = function(){
        return list.map((x)=> x.id).pop();
    }
    
}

//THESE ARE THE ONLY TWO IMPORTANT METHODS FOR BIGLAB1 WEEK2
//
//
//
//
//
//
//
//


function get_Filters(){
    let filters= [];
        
    filters.push({name: 'All', filter : filter_all});
    filters.push({name: 'Important', filter : filter_important});
    filters.push({name: 'Today', filter : filter_today})
    filters.push({name: 'Private', filter : filter_private});
    filters.push({name: 'Next 7 Days', filter : filter_bseven});
        
    return filters;
}

function get_List(){
    const t1 = new Task(1, "laundry", 0, 1);
    const t2 = new Task(2, "monday lab", 0, 0, "2021-03-16T09:00:00.000Z");
    const t3 = new Task(3, "phone call", 1, 0, "2021-03-08T15:20:00.000Z");

    const t4 = new Task(4, "this has today as deadline", 0, 0, dayjs());

    const t5 = new Task(5, "deadline for this is 3 days in the future", 0 , 1, dayjs().add(3, 'day'));
    // create the task list and add the dummy tasks
    const taskList = new TaskList([]);
    taskList.add(t1);
    taskList.add(t2);
    taskList.add(t3);
    taskList.add(t4);
    taskList.add(t5);

    return taskList;
}

function TaskInit(){
    this.filters = get_Filters();

    this.list = get_List();
    
}

export {TaskInit, Task, TaskList}; 



