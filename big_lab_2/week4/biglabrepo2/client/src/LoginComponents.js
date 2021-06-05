import {useState} from 'react' ;
import API from './API.js';
import { Form, Button, Alert, Row, Container, Col} from 'react-bootstrap';

function LoginBody(props){
    const [message, setMessage] = useState("");
    const setUserInfo = props.setUserInfo;
    const setLoggedIn = props.setLoggedIn;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const doLogIn = (username, password) =>{
        API.login(username, password).then(user => {
        
            setUserInfo(user);
            setLoggedIn(true);
            
          
        }).catch(err => setMessage(err));
      
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        setMessage("");

        let valid = true;

        if(email === "" || password === ""){
            valid = false;
        }        

        if(valid){
            doLogIn(email, password);
        }else{
            setMessage("Invalid login or password");
        }
        
    }


    return(

        <Container fluid>
        <Row>
            <Col xs = {{ span: 6, offset: 3 }}>
            <h1>Please Login to use the application</h1>
            </Col>
            </Row>    
        <Row>
        
        <Col xs = {{ span: 4, offset: 4 }} className = "login-credentials">
        <Form>
            {message ? <Alert variant='danger'>{message}</Alert> : ''}
            <Form.Group controlId='username'>
                <Form.Label>email</Form.Label>
                <Form.Control type='email' value={email} onChange={ev => setEmail(ev.target.value)} />
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} />
            </Form.Group>
            <Button variant = 'success'onClick={handleSubmit}>Login</Button>
        </Form>
        </Col>
        </Row>
        </Container>
    );
 
}


export  {LoginBody};