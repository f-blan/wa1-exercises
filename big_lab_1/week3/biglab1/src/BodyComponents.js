import {Col, Button} from 'react-bootstrap' ;
import {useState} from 'react' ;
import {Container, Row, Dropdown, Modal, Form} from 'react-bootstrap';
import "./App.css"
import TaskRow from './TaskComponents.js';
import {Task, TaskList} from './Task.js';
import dayjs from 'dayjs';


function MyBody(props){
    //let filter_all = props.filters.filter((f) => f.name === 'All').pop();
    const [selected, setSelected] = useState('All');
    const [tasks, setTasks] = useState(props.tasks);
    //const [filters, setFilters] = useState([...props.filters]);
    
    const chooseFilter = (name) => {
      setSelected(name);
    }

    const addTask = (task) => {
      props.tasks.add(task);
      
      setTasks(() => {
        let newTasks = new TaskList(props.tasks.getList());
        return newTasks;
      });
      
      
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
          props.tasks.getList().filter((t)=>selected_filter(t)).map((t) => <TaskRow task = {t} key ={t.id}/>)
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
  const [date, setDate] = useState("");
  //const [validated, setValidated] = useState(false);
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
      console.log(localerr);
    }

    if(props.tasks.getList().map((t) => t.description).includes(description)){
      valid = false;
      if(localerr!==[]){
        localerr.push(", ");
      }
      localerr.push("Description has to be unique");
      //setError((old) => old.concat("-description has to be unique-"));
    }

    if(dayjs().isAfter(date)){
      valid = false;
      if(localerr!==[]){
        localerr.push(", ");
      }
      localerr.push("Input date has expired already");
      //setError((old) => old.concat("-date has already expired-"));
    }
    setError(localerr);
    if(valid ===true){
      const last_id = props.tasks.getList().length +1;
      const task = new Task(last_id, description, important, priv, date);//{id : last_id+1, description : description, important : important, private : priv, deadline : date};
      props.addTask(task);
      setError("");
      setDescription("");
      setImportant(false);
      setPriv(false);
      setDate("");
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
            <Form.Check type="checkbox" label="Important" value = {important} onChange={() => setImportant(i =>!i)}/>
          </Form.Group>
          <Form.Group controlid="formPrivate">
            <Form.Check type="checkbox" label="Private" value = {priv} onChange={() => setPriv( asd =>!asd)}/>
          </Form.Group>
          <Form.Group controlid='formDate'>
              <Form.Label>Date</Form.Label>
              <Form.Control type='datetime-local' value={date} onChange={(ev) => setDate(ev.target.value)}/>
          </Form.Group>
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

export default MyBody;
