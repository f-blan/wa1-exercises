
import './App.css';
import {Container,ListGroup, Row, Dropdown, Col, Nav, Navbar, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';


function App() {
  const todo_icon = <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check2-all" viewBox="0 0 16 16">
                    <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
                    <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"/>
                    </svg> ;
  const user_icon = <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>;
  const trash_icon =  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                      </svg>;
  const modify_icon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                      </svg>;
  const private_icon =  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-square" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
                        </svg>;
  return (
    <>
    <Navbar bg="success" expand="xs" variant = "dark">
      <Col xs={2}>
        <Navbar.Brand href = "#home">{todo_icon} 
        ToDo Manager</Navbar.Brand>
      </Col>
      <Col xs ={{ span: 4, offset: 2 }}>
        <Form.Control type="text" placeholder="Search..." />

      </Col>
      
      <Col xs = {{ span: 1, offset: 3 }}>
         {user_icon}
      </Col>
      
    </Navbar>

    <Row>
      <Col xs = {12} md={4} className="aside">
        <Button variant = "outline-success" size = "lg" block active>All</Button>
        <Button variant = "outline-success" size="lg" block>Important</Button>
        <Button variant = "outline-success" size="lg" block>Today</Button>
        <Button variant = "outline-success" size="lg" block>Next 7 Days</Button>
        <Button variant = "outline-success" size="lg" block>Private</Button>
        
      </Col>
      <Col xs = {12} md={7} className="tasks">
        <h1 className = "taskhead"><strong>Filter: </strong> All</h1>
        <Dropdown.Divider/>
        <Row>
          <Col xs = {{ span: 3, offset: 1 }}>
            <Form.Check type="checkbox" label="Study for the exam"/>
          </Col>
          <Col xs = {{span: 1, offset: 1}}>
              {/*for private*/}
          </Col>
          <Col xs = {{ span: 4, offset: 0 }}>
            {/*for date*/}
          </Col>
          <Col xs = {1}>
            {modify_icon}
          </Col>

          <Col xs ={1}>
            {trash_icon}
          </Col>

        </Row>
        <Dropdown.Divider/>
        <Row>
          <Col xs = {{ span: 3, offset: 1 }}>
            <Form.Check type="checkbox" label="Prepare slides for the exam"/>
          </Col>
          <Col xs = {{span: 1, offset: 1}}>
              {private_icon}
          </Col>
          <Col xs = {{ span: 4, offset: 0 }}>
            Saturday, June 20th 2020, 12:00:00 am
          </Col>
          <Col xs = {1}>
            {modify_icon}
          </Col>

          <Col xs ={1}>
            {trash_icon}
          </Col>
        </Row>
          <Dropdown.Divider/>
        <Row>
          <Col xs = {{ span: 3, offset: 1 }}>
            <Form.Check type="checkbox" label="Call Mary"/>
          </Col>
          <Col xs = {{span: 1, offset: 1}}>
              {private_icon}
          </Col>
          <Col xs = {{ span: 4, offset: 0 }}>
            
          </Col>
          <Col xs = {1}>
            {modify_icon}
          </Col>

          <Col xs ={1}>
            {trash_icon}
          </Col>

        </Row>
        <Dropdown.Divider/>
      </Col>
    </Row>
    
    <Row>
    <Button className="addbtn" variant = "success">+</Button>
    </Row>
    </>
    
   

  );
}

export default App;
