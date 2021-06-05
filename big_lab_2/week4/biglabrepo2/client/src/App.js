
import { CheckAll, PersonCircle } from 'react-bootstrap-icons';
import {useState, useEffect} from 'react' ;
import {Col, Navbar, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {MyBody} from './BodyComponents.js';
import {TaskInit} from './Task.js';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';
import API from './API.js';
import {LoginBody} from './LoginComponents';



function App() {
  
  let data = new TaskInit();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState();

  
  const doLogout = () => {
    API.logout().then(()=>{
      setLoggedIn(false);
      setUserInfo(undefined);
    });
  }

  useEffect(() => {
    API.getUserInfo().then(user => {
      setUserInfo(user);
      setLoggedIn(true);
    }).catch(err =>{
      setLoggedIn(false);
      setUserInfo(undefined);
    });
  }, []);
  return (
    
    <Router>
    <MyNav logged = {loggedIn} user = {userInfo} logout = {doLogout}/>
    <Switch>

      <Route path = "/login" render ={() =>
        
        <>{loggedIn ? <Redirect to = "/all"/> : <LoginBody setLoggedIn = {setLoggedIn} setUserInfo = {setUserInfo}/>}</>
      }/>
      <MainRoutes data = {data} loggedIn = {loggedIn}/>
      
    </Switch>
    </Router>
    
  );
}

function MainRoutes(props){
  const data = props.data;
  const loggedIn = props.loggedIn;
  return(
    <>
      <Route path="/All" render ={() =>
        <>{loggedIn ?
        <MyBody filters = {data.filters} selected = 'All' f_apiname = "all"/>
        : <Redirect to = "/login"/>}
        </>
      }/>
      <Route path="/Important" render={()=>
        <>{loggedIn ?
        <MyBody filters = {data.filters} selected = 'Important' f_apiname = "important"/>
        : <Redirect to = "/login"/>}
        </>
      }/>
      <Route path="/Private" render={()=>
        <>{loggedIn ?
        <MyBody filters = {data.filters} selected = 'Private' f_apiname = "private"/>
        : <Redirect to = "/login"/>}
        </>
      }/>
      <Route path="/Today" render={()=>
        <>{loggedIn ?
        <MyBody filters = {data.filters} selected = 'Today' f_apiname = "today"/>
        : <Redirect to = "/login"/>}
        </>
      }/>
      <Route path="/Next 7 Days" render={()=>
        <>{loggedIn ?
        <MyBody filters = {data.filters} selected = 'Next 7 Days' f_apiname = "next7days"/>
        : <Redirect to = "/login"/>}
        </>
      }/>
    </>
  );
}


function MyNav(props) {
  const todo_icon = <CheckAll size = {30}/> ;
  const user_icon = <Link to = '/login'><PersonCircle size = {30} onClick = {props.logout} className = "icon-user"/></Link>;

  return(
      <>
          <Navbar bg="success" expand="xs" variant = "dark">
              <Col xs={2}>
              <Link to = {{pathname : '/all'}}>
              <Navbar.Brand>{todo_icon} 
              ToDo Manager
              </Navbar.Brand>
              </Link>
              </Col>
              <Col xs ={{ span: 4, offset: 2 }}>
              <Form.Control type="text" placeholder="Search..." />

              </Col>
              {props.logged ? <span className = 'welcome-msg'>Hello {props.user.name}</span> : <div/>}
              <Col xs = {{ span: 1, offset: 2 }}>
      
              {user_icon}
              </Col>
              
               
          </Navbar>


      </>

  );


}


export default App;
