"use strict"

const dayjs = require("dayjs");
const sqlite = require("sqlite3");

const db = new sqlite.Database("tasks.db", (err) => {
    if(err){
        throw err;
    }
});

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
        console.log(list.sort((a,b) => {
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

    this.load = function(db, sql, params){
        
        return new Promise( (resolve, reject) => {
            db.all(sql, params, (err, rows) => {
                if(err){
                    reject(err);
                }else{

                    for(let row of rows){
                        let task = new Task(row.id, row.description, {urgent: row.urgent, private: row.private, deadline: row.deadline});
                        list.push(task);
                    }

                    resolve();
                }
                    
                
            });
        });



    }

    this.printlist = function(){
        return new Promise((resolve, reject) => {
            console.log(list);
            resolve();
        });
        
    }

}



async function main(){
    

    let tl1 = new TaskList();
    let tl2 = new TaskList();
    let tl3 = new TaskList();

    const sql1 = "SELECT * FROM tasks";
    const params1 = [];
    let p1 = tl1.load(db,sql1,params1).catch((e) =>{
        console.log(e);
    });

    const sql2 = "SELECT * FROM tasks T WHERE T.deadline > ? ";
    const params2 = ["2021-03-09T15:20:00.000Z"];
    let p2 = tl2.load(db,sql2,params2).catch((e) =>{
        console.log(e);
    });

    const sql3 = "SELECT * FROM tasks T WHERE T.description LIKE ?";
    const params3 = ["%call%"];
    let p3 = tl3.load(db,sql3,params3).catch((e) =>{
        console.log(e);
    });

    let promise_array = [p1,p2,p3];

    await Promise.all(promise_array);

    console.log("---------------------PRINTING ALL ROWS-------------------------------");
    await tl1.printlist();

    console.log("---------------------PRINTING ALL ROWS WITH DEADLINE > 2021-03-09-------------------------------");
    await tl2.printlist();

    console.log("---------------------PRINTING ALL ROWS WITH DESCRIPTION CONTAINING 'call' -------------------------------");
    await tl3.printlist();

    db.close();
}


main();

