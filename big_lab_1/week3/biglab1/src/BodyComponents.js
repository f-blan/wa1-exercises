import {Col, Button} from 'react-bootstrap' ;
import {useState} from 'react' ;
import {Container, Row, Dropdown, Modal, Form} from 'react-bootstrap';
import "./App.css"
import TaskRow from './TaskComponents.js';
//import Task from './Task.js';
import dayjs from 'dayjs';


function MyBody(props){
    //let filter_all = props.filters.filter((f) => f.name === 'All').pop();
    const [selected, setSelected] = useState('All');
    const [tasks, setTasks] = useState([...props.tasks]);
    //const [filters, setFilters] = useState([...props.filters]);
    
    const chooseFilter = (name) => {
      setSelected(name);
    }

    const addTask = (task) => {

      setTasks(oldTasks=>[...oldTasks, task]);
    }
    


    return(
        <>
        <Container fluid>
        <Row>
            <MySide selected = {selected} filters = {props.filters} choose = {chooseFilter}/>

            <MyMain selected = {selected} tasks = {tasks} filters = {props.filters}/> 
        
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
            props.filters.map((f) => <FilterRow name = {f.name} selected = {props.selected} key = {f.name} choose = {props.choose}/>)
        }


    </Col>
    </>
    );
}

function FilterRow(props){
    if(props.selected === props.name){
        return(
            <>
                <Button variant="success" href="#" className="filter-button" size="lg" onClick={() => props.choose(props.name)}>{props.name}</Button>
                <Dropdown.Divider className="filter-divider" />
            </>
        );
    }else{
        return(
            <>
                <Button variant="light" href="#" className="filter-button" size="lg" onClick={() => props.choose(props.name)}>{props.name}</Button>
                <Dropdown.Divider className="filter-divider" />
            </>
        );
    }
}



function MyMain(props){  
  let selected_filter = props.filters.filter((f) => f.name === props.selected).pop().filter;
    return(
        <>
        <Col xs = {12} md={7} className="tasks">
        <h1 className = "taskhead"><strong>Filter: </strong>{props.selected}</h1>
        <Dropdown.Divider/>
        {
          props.tasks.filter((t)=>selected_filter(t)).map((t) => <TaskRow task = {t} key ={t.id}/>)
        }
        </Col>
        </>

    );
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

      <MyModal show = {show} handleClose = {handleClose} tasks = {props.tasks} addTask={(task) => {props.addTask(task); handleClose()}}/>
      
    </>
    
    );
}

function MyModal(props){
  const [description, setDescription] = useState('');
  const [important, setImportant] = useState(false);
  const [priv, setPriv] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) =>{
    const form = event.currentTarget;
    event.preventDefault();
    if(form.checkValidity ===false  ){
      event.preventDefault();
      event.stopPropagation();
    }else{
        setValidated(true);

      
    }
    if(validated ===true){
      const last_id = props.tasks.map((t) => t.id).sort((a,b) => b-a)[0];
      const task = {id : last_id+1, description : description, important : important, private : priv, deadline : date};
      props.addTask(task);
    }
  }
  return(
    <>
    <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a task</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlid="formTaskDescription">
            <Form.Label>Task Description</Form.Label>
            <Form.Control required type = "text" placeholder="...enter description" value = {description} onChange={(ev) => setDescription(ev.target.value)}/>
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
            <Form.Control.Feedback type= "invalid">Please provide a description</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlid="formImportant">
            <Form.Check type="checkbox" label="Important" value = {important} onChange={(ev)=> setImportant(i =>!i)}/>
          </Form.Group>
          <Form.Group controlid="formPrivate">
            <Form.Check type="checkbox" label="Private" value = {priv} onChange={(ev) => setPriv(p =>!p)}/>
          </Form.Group>
          <Form.Group controlid='formDate'>
              <Form.Label>Date</Form.Label>
              <Form.Control required type='date' value={date.format('YYYY-MM-DD')} onChange={(ev) => setDate(dayjs(ev.target.value))}/>
              <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type= "invalid">Please provide a valid date</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="success" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>


        </Form>
      </Modal>
    </>
  );
}

export default MyBody;
