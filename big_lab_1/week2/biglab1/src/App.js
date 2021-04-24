
import { CheckAll, PersonCircle } from 'react-bootstrap-icons';

import {Col, Navbar, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import MyBody from './BodyComponents.js';
import TaskInit from './Task.js';




function App() {
  
  let data = new TaskInit();
  return (
    <>
    <MyNav/>

    <MyBody tasks = {data.list} filters = {data.filters}/>
    
   
    </>
  );
}

function MyNav() {
  const todo_icon = <CheckAll size = {30}/> ;
  const user_icon = <PersonCircle size = {30} className = "icon-user"/>;

  return(
      <>
          <Navbar bg="success" expand="xs" variant = "dark">
              <Col xs={2}>
              <Navbar.Brand href = "#home">{todo_icon} 
              ToDo Manager
              </Navbar.Brand>
              </Col>
              <Col xs ={{ span: 4, offset: 2 }}>
              <Form.Control type="text" placeholder="Search..." />

              </Col>
    
              <Col xs = {{ span: 1, offset: 3 }}>
              {user_icon}
              </Col>
    
          </Navbar>


      </>

  );


}


export default App;
