import {Col, Row, Form, Dropdown} from 'react-bootstrap' ;
import { PencilSquare, Trash, PersonSquare } from 'react-bootstrap-icons';
import {MyModal} from './BodyComponents.js';
import {useState} from 'react' ;
import dayjs from 'dayjs';

function TaskRow(props){
    const trash_icon =  <Trash/>;
    const modify_icon = <PencilSquare/>;
    let private_icon =  undefined;
    let important = undefined;
    let date = dayjs(props.task.deadline).format("dddd, MMMM D YYYY hh:mm ");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    
    if(props.task.private){
        private_icon = <PersonSquare/>
    }
    if(props.task.important){
        important= "important";
    }

    if(date.toString() === "Invalid Date"){
        date = undefined;
    }
    return(
        <>
        <Row>
        <Col xs = {{ span: 3, offset: 1 }}>
            <Form.Check type="checkbox" className = {important} label={props.task.description}/>
        </Col>
        <Col xs = {{span: 1, offset: 1}}>
            {private_icon}
        </Col>
        <Col xs = {{ span: 4, offset: 0 }}>
            {date}
        </Col>
        <Col xs = {1} onClick={handleShow}>
            {modify_icon}
        </Col>

        <Col xs ={1} onClick= {() => props.remove(props.task)}>
            {trash_icon}
        </Col>

        </Row>
        <Dropdown.Divider/>
        <MyModal show = {show} handleClose = {handleClose} tasks = {props.tasks} functionTask={(task) => {props.modify(task); handleClose()}}
        task = {props.task}/>

        </>

    );
}

export default TaskRow ;