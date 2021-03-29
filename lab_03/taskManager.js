"use strict"






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

function TaskList(){
    let list = [];

    this.add= function(task){
        list.push(task);
    }
    this.sortAndPrint = function(){
        console.log(list.sort((a,b) =>  {
            if(a.deadline == undefined){
                return 1;
            }else if (b.deadline == undefined){
                return -1;
            }else{
                return dayjs(a.deadline).isAfter(dayjs(b.deadline));
            }
        }));
    }

    this.filterAndPrint = function(){
        console.log(list.filter((e) => e.urgent));
    }

    this.loadList = function(filter_type){
        let h1 = document.querySelector('h1');
        h1.innerHTML=`${filter_type}`;
        let prev_active = document.getElementsByClassName('active');
        for(let elem of prev_active){
            elem.classList.remove('active');
        }

        let new_active = document.getElementById(filter_type);
        new_active.classList.add('active');

        let chosen_filter;
        switch(filter_type){
            case 'All':
                chosen_filter = filter_all;
                break;
            case 'Important':
                chosen_filter = filter_important;
                break;
            case 'Today':
                chosen_filter = filter_today;
                break;
            case 'Next 7 Days':
                chosen_filter = filter_bseven;
                break;
            case 'Private':
                chosen_filter = filter_private;
                break;
            default:
                chosen_filter = filter_all;
                break;
        }
        this.addToDOM(chosen_filter);
    }

    this.addToDOM = function(chosen_filter){
        let showlist = list.filter((e) => chosen_filter(e));
        let ul = document.getElementById("taskList");
        ul.innerHTML="";
        let i = 1;
        for(let task of showlist){
            let important = "";
            if(task.important){
                important = "important";
            }
            let li = document.createElement('li');
            li.classList.add("list-group-item");
            
            let divp = document.createElement('div');
            divp.classList.add("d-flex");
            divp.classList.add("w-100");
            divp.classList.add("justify-content-between");
            let div1 = document.createElement('div');
            div1.classList.add("custom-control");
            div1.classList.add("custom-checkbox");
            let html1 = `<input type="checkbox" class="custom-control-input" id="check-t${i}">
            <label class="custom-control-label ${important}" for="check-t${i}">${task.description}</label>`;
            div1.innerHTML=html1;
            i++;
            divp.appendChild(div1);



            if(task.private){
                let div2 = document.createElement('div');
                let html2 = `<svg class="bi bi-person-square" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
              </svg>`;
              div2.innerHTML=html2;
              divp.appendChild(div2);
            }

            let small= document.createElement('small');
            small.innerHTML= `${task.deadline}`;

            divp.appendChild(small);

            li.appendChild(divp);
            ul.appendChild(li);

            
        }
    }
    let str = 'hi'
}

function listeners_init(taskList){
    const f_ids = ['All', 'Important', 'Private', 'Today', 'Next 7 Days'];
    for(let id of f_ids){
        console.log(id);
        let e = document.getElementById(id);
        e.addEventListener('click', event =>{
            taskList.loadList(id);
        });
    }
}

function main(){
    const t1 = new Task(1, "laundry", 0, 1);
    const t2 = new Task(2, "monday lab", 0, 0, "2021-03-16T09:00:00.000Z");
    const t3 = new Task(3, "phone call", 1, 0, "2021-03-08T15:20:00.000Z");

    const t4 = new Task(4, "this has today as deadline", 0, 0, dayjs());
    
    const t5 = new Task(4, "deadline for this is 3 days in the future", 0 , 1, dayjs().add(3, 'day'));
    // create the task list and add the dummy tasks
    const taskList = new TaskList();
    taskList.add(t1);
    taskList.add(t2);
    taskList.add(t3);
    taskList.add(t4);
    taskList.add(t5);
    

    taskList.loadList("All");

    listeners_init(taskList);
}


main();
