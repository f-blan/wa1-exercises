
import { CheckAll, PersonCircle } from 'react-bootstrap-icons';

import {Col, Navbar, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {MyBody} from './BodyComponents.js';
import {TaskInit} from './Task.js';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';



function App() {
  
  let data = new TaskInit();

  return (
    
    <Router>
    <MyNav/>
    <Switch>
      <Route path="/All" render ={() =>
        <MyBody tasks = {data.list} filters = {data.filters} selected = 'All'/>
      }/>
      <Route path="/Important" render={()=>
        <MyBody tasks = {data.list} filters = {data.filters} selected = 'Important'/>
      }/>
      <Route path="/Private" render={()=>
        <MyBody tasks = {data.list} filters = {data.filters} selected = 'Private'/>
      }/>
      <Route path="/Today" render={()=>
        <MyBody tasks = {data.list} filters = {data.filters} selected = 'Today'/>
      }/>
      <Route path="/Next 7 Days" render={()=>
        <MyBody tasks = {data.list} filters = {data.filters} selected = 'Next 7 Days'/>
      }/>
      <Route path="/" render={()=>
        <MyBody tasks = {data.list} filters = {data.filters} />
      }/>
    </Switch>
    </Router>
    
  );
}

function MyNav() {
  const todo_icon = <CheckAll size = {30}/> ;
  const user_icon = <PersonCircle size = {30} className = "icon-user"/>;

  return(
      <>
          <Navbar bg="success" expand="xs" variant = "dark">
              <Col xs={2}>
              <Link to = {{pathname : '/'}}>
              <Navbar.Brand>{todo_icon} 
              ToDo Manager
              </Navbar.Brand>
              </Link>
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
