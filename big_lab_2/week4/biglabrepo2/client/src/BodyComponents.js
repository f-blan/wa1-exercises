import {Col, Button} from 'react-bootstrap' ;
import {useState, useEffect} from 'react' ;
import {Container, Row, Dropdown, Modal, Form} from 'react-bootstrap';
import "./App.css"
import TaskRow from './TaskComponents.js';
import {Task, TaskList} from './Task.js';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import API from './API';

function MyBody(props){
    const [reload, setReload] = useState(false);
    const [tasks, setTasks] = useState(new TaskList([]));
    const [loading, setLoading] = useState(true);
    

    useEffect(()=> {
      if(reload){
        setLoading(true);
        API.loadTasks(props.f_apiname).then(newT => {
          setTasks(new TaskList(newT));
          setReload(false);
          setLoading(false);
        }).catch(()=>{
          console.log("resetted!");
          setTasks(new TaskList([]));
          setReload(false);
          setLoading(false);
        });
      }

    }, [reload, props.f_apiname]);

    useEffect(() =>{
      setLoading(true);
      API.loadTasks(props.f_apiname).then(newT => {
        setTasks(new TaskList(newT));
        setLoading(false);
      }).catch(() => {
        console.log("resetted!");
        setTasks(new TaskList([]));
        setReload(false);
        setLoading(false);
      });
    }, [props.f_apiname]);

    const askReload = () =>{
      setReload(true);
    }

    const addTask = (task) => {
      API.addTask(task).then(setReload(true));
    }
       
    
    
    const modifyTask = (task) =>{
      API.modifyTask(task).then(setReload(true));
    }
    const removeTask = (task) => {
      API.removeTask(task).then(setReload(true));
    } 
    
    const markTask = (task) => {
      API.markTask(task).then(setReload(true));
    }
    

    return(
        <>
        <Container fluid>
        <Row>
            <MySide selected = {props.selected} filters = {props.filters} reload = {askReload}/>

            <MyMain selected = {props.selected} tasks = {tasks} mark = {markTask}
            filters = {props.filters} modify ={modifyTask} remove = {removeTask} loading = {loading} /> 
        
            <MyButton addTask = {addTask} tasks = {tasks}/>
        </Row>
        </Container>
        </>

    );
}

function MySide(props){
    return (
    <>
    <Col xs = {12} md={4} className="aside">
        {
            props.filters.map((f) => <FilterRow name = {f.name} selected = {props.selected} key = {f.name} choose = {props.choose} reload = {props.reload}/>)
        }


    </Col>
    </>
    );
}

function FilterRow(props){
    let path = '/';
    path = path.concat(props.name);
    
    
    if(props.selected === props.name){
        return(
            <>
                <Button variant="success" className="filter-button" size="lg" onClick={() => props.choose(props.name)}>{props.name}</Button>
                <Dropdown.Divider className="filter-divider" />
            </>
        );
    }else{
        return(
            <>
                <Link to={{pathname : path}}>
                <Button variant="light" onClick = {() => props.reload(true)} className="filter-button" size="lg">{props.name}</Button>
                </Link>
                <Dropdown.Divider className="filter-divider" />
            </>
        );
    }
}



function MyMain(props){
  if(props.selected === undefined || props.selected === '' || props.loading){
    return(
      <>
      <Col xs = {12} md={7} className="tasks">
        <h1>Please wait for loading of the tasks...</h1>
      </Col>
      </>
    );
  }else{
    
  
    return(
        <>
        <Col xs = {12} md={7} className="tasks">
        <h1 className = "taskhead"><strong>Filter: </strong>{props.selected}</h1>
        <Dropdown.Divider/>
        {
          props.tasks.getList().map((t) => <TaskRow task = {t} key ={t.id} 
          modify = {props.modify} remove = {props.remove} mark = {props.mark} tasks = {props.tasks}/>)
        }
        </Col>
        </>

    );
  }
}
function MyButton(props){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
    
    <>
    
      <Button type="button" className="fixed-right-bottom" size="lg" variant="success" onClick={handleShow}>
        +
      </Button>

      <MyModal show = {show} handleClose = {handleClose} tasks = {props.tasks} functionTask={(task) => {props.addTask(task); handleClose()}}/>
      
    </>
    
    );
}

function MyModal(props){
  let desc_init= '';
  let important_init = false;
  let priv_init = false;
  let date_init = '';
  let hour_init = 0;
  let min_init = 0;

  if(props.task !== undefined){
    desc_init = props.task.description;
    important_init = props.task.important;
    priv_init = props.task.private;
    date_init = dayjs(props.task.deadline).format("YYYY-MM-DD");
    hour_init = dayjs(props.task.deadline).format("hh");
    min_init = dayjs(props.task.deadline).format("mm");
      
  }


  const [description, setDescription] = useState(desc_init);
  const [important, setImportant] = useState(important_init);
  const [priv, setPriv] = useState(priv_init);
  const [date, setDate] = useState(date_init);
  const [hour, setHour] = useState(hour_init);
  const [minute, setMinute] = useState(min_init);
  const [error, setError] = useState("");

  
  const handleSubmit = (event) =>{
    //const form = event.currentTarget;
    let valid = true;
    let localerr = [];
    event.preventDefault();
    if(description === ""){
      valid = false;
      localerr.push("Missing description")
      //setError((old) => old.concat("-Missing Description-"));
      
    }

    if(props.tasks.getList().map((t) => t.description).includes(description) && props.task===undefined){
      valid = false;
      if(localerr!==[]){
        localerr.push(" ");
      }
      localerr.push("Description has to be unique");
      //setError((old) => old.concat("-description has to be unique-"));
    }

    if(dayjs().subtract(1,'d').isAfter(date)){
      valid = false;
      if(localerr!==[]){
        localerr.push(" ");
      }
      localerr.push("Input date has expired already");
      //setError((old) => old.concat("-date has already expired-"));
    }
    if(hour >=24 || hour<0){
      valid = false;
      if(localerr!==[]){
        localerr.push(" ");
      }
      localerr.push("Invalid hour");
      //setError((old) => old.concat("-date has already expired-"));
    }
    if(minute >=60 || minute<0){
      valid = false;
      if(localerr!==[]){
        localerr.push(" ");
      }
      localerr.push("Invalid minute");
      //setError((old) => old.concat("-date has already expired-"));
    }
    setError(localerr);
    if(valid ===true){
      let sel_id;
      if(props.task===undefined){
        sel_id= props.tasks.getLastId() +1;
      }else{
        sel_id = props.task.id;
      }
      setDate((oldDate) => dayjs(oldDate));
      
      //console.log(dayjs(date).format("YYYY-MM-DD-hh-mm"));
      const task = new Task(sel_id, description, important, priv, dayjs(`${date} ${hour}:${minute}`));//{id : last_id+1, description : description, important : important, private : priv, deadline : date};
      //console.log(task);
      
      props.functionTask(task);
      setError("");
      if(props.task===undefined){
        
        setDescription("");
        setImportant(false);
        setPriv(false);
        setDate("");
        setHour(0);
        setMinute(0);
      }
        
      
    }
  }
  return(
    <>
    <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a task</Modal.Title>
        </Modal.Header>
        <Form>
        <Modal.Body>
          <Form.Group controlid="formTaskDescription">
            <Form.Label>Task Description</Form.Label>
            <Form.Control required type = "text" placeholder="...enter description" value = {description} onChange={(ev) => setDescription(ev.target.value)}/>
          </Form.Group>
          <Form.Group controlid="formImportant">
            <Form.Check type="checkbox" label="Important" checked = {important} onChange={() => setImportant(i =>!i)}/>
          </Form.Group>
          <Form.Group controlid="formPrivate">
            <Form.Check type="checkbox" label="Private" checked = {priv} onChange={() => setPriv( asd =>!asd)}/>
          </Form.Group>
          <Form.Group controlid='formDate'>
              <Form.Label>Date</Form.Label>
              <Form.Control type='date' value={date} onChange={(ev) => setDate(ev.target.value)}/>
          </Form.Group>
          <Row>
          <Col xs={{ span: 3, offset: 1 }}>
          <Form.Group controlid= 'formhour'>
              <Form.Label>Hour</Form.Label>
              <Form.Control type="number" min={0} max ={23} value = {hour} onChange={(ev) => setHour(ev.target.value)}/>
          </Form.Group>
          </Col>
          <Col xs ={{ span: 3}}>
          <Form.Group controlid= 'formmin'>
              <Form.Label>Minute</Form.Label>
              <Form.Control type="number" min={0} max ={59} value = {minute} onChange={(ev) => setMinute(ev.target.value)}/>
          </Form.Group>
          </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <span className='important'>{error}</span>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>


        </Form>
      </Modal>
    </>
  );
}

export  {MyBody, MyModal};
