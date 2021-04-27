import {Col, Row, Form, Dropdown} from 'react-bootstrap' ;
import { PencilSquare, Trash, PersonSquare } from 'react-bootstrap-icons';

function TaskRow(props){
    const trash_icon =  <Trash/>;
    const modify_icon = <PencilSquare/>;
    let private_icon =  undefined;
    let important = undefined;
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
        <Col xs = {1}>
            {modify_icon}
        </Col>

        <Col xs ={1}>
            {trash_icon}
        </Col>

        </Row>
        <Dropdown.Divider/>
        </>
    );
}

export default TaskRow ;