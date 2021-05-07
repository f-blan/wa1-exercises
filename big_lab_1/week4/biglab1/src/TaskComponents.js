import {Col, Row, Form, Dropdown} from 'react-bootstrap' ;
import { PencilSquare, Trash, PersonSquare } from 'react-bootstrap-icons';
import {MyModal} from './BodyComponents.js';
import {useState} from 'react' ;

function TaskRow(props){
    const trash_icon =  <Trash/>;
    const modify_icon = <PencilSquare/>;
    let private_icon =  undefined;
    let important = undefined;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    if(props.task.private){
        private_icon = <PersonSquare/>
    }
    if(props.task.important){
        important= "important";
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
            {props.task.deadline.toString()}
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