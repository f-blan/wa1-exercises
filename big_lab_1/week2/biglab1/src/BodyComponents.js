import {Col, Button} from 'react-bootstrap' ;
import {useState} from 'react' ;
import {Container, Row, Dropdown,} from 'react-bootstrap';
import "./App.css"
import TaskRow from './TaskComponents.js';



function MyBody(props){
    const [selected, setSelected] = useState('All');
    const [tasks, setTasks] = useState([...props.tasks]);
    //const [filters, setFilters] = useState([...props.filters]);
    
    const chooseFilter = (name) => {
      setSelected(name);
      let chosen_filter = props.filters.filter((f) => f.name === name).pop().filter;
      setTasks(props.tasks.filter(t => chosen_filter(t)));
    }
    
    return(
        <>
        <Container fluid>
        <Row>
            <MySide selected = {selected} filters = {props.filters} choose = {chooseFilter}/>

            <MyMain selected = {selected} tasks = {tasks}/> 
        
            <MyButton/>
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

    return(
        <>
        <Col xs = {12} md={7} className="tasks">
        <h1 className = "taskhead"><strong>Filter: </strong>{props.selected}</h1>
        <Dropdown.Divider/>
        {
          props.tasks.map((t) => <TaskRow task = {t} key ={t.id}/>)
        }
        </Col>
        </>

    );
}
function MyButton(){
    return(
        <>
        <Button type="button" className="fixed-right-bottom" size="lg" variant="success">&#43;</Button>
        </>
    );
}


export default MyBody;
