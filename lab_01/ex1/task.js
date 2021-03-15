"use strict"

const dayjs = require("dayjs");

function Task(id, description, options){
    this.id = id;
    this.description = description;

    if(!options){
        options = {};
    }
    if (!options.urgent){
        this.urgent = false;
    }else{
        this.urgent = options.urgent;
    }
    if(!options.priv){
        this.priv = true;
    }else{
        this.priv = options.priv;
    }
    if(!options.deadline){
        this.deadline = undefined;
    }else{
        this.deadline = options.deadline;
    }
    
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

}



function main(){
    let tl = new TaskList();

    let dl = new Date(2020, 1,1);

    tl.add(new Task(4, "task 4", {}));
    tl.add(new Task(0, "task 0", {deadline : new Date(1999,1,1)}));
    tl.add(new Task(1, "task 1", {urgent: true, deadline : dayjs('20210101')}));
    tl.add(new Task(2, "task 2", {deadline : dayjs('20200101')}));
    
    console.log("------PRINTING SORTED---------");
    tl.sortAndPrint();
    console.log("------PRINTING FILTERED LIST----------");
    tl.filterAndPrint();
}


main();


