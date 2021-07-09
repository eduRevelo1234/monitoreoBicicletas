import React,{useState,useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import FormCheck from 'react-bootstrap/FormCheck';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { helpHttp } from '../helpers/helpHttp';
import { Redirect, Route } from 'react-router';
import auth from "./Auth";

const initialForm = {
    nombre: "",
    cedula: "",
    correo: "",
    celular: "",
    contacto: "",
    password:"",
    password2:"",
}

const RegitrarseForm = () => {

    const [form, setForm] = useState(initialForm);
    const [passwordValidation, setPasswordValidation] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    

    const cedulaHandler = async event => {

        const re = /^[0-9\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            setForm({
                ...form,
                [event.target.name]: event.target.value,
            })
        }
    }
    const passwordHandler = async event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        })
    }
    const password2Handler = async event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        })
        
        if(form.password2 === form.password){
            setPasswordValidation(true);
            
        }
        else{
            setPasswordValidation(false);
        }
    }
    const emailHandler = async event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        })
    }
    const nombreHandler = async event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        })
    }
    const submitHandler = (e) => {
        
        if(form.password === form.password2){
            let url = `https://eaayz8d062.execute-api.eu-west-2.amazonaws.com/User/transactions?Cedula=${form.cedula}&Nombres=${form.nombre}&Correo=${form.correo}&Password=${form.password}&Celular=${form.celular}&Contacto=${form.contacto}&Emergencia=OFF&Status=ON`;
            console.log(url);
            helpHttp().get(url).then((res)=>{
                if(!res.err){
                    setResponse(res);
                    console.log(res);
                    setError(null);
                    alert(response.message);
                }else{
                    setResponse(null);
                    setError(res);
                }
            });
            

        }else{
            e.preventDefault();
            e.stopPropagation();
            alert("Deben coincidir las contraseñas");
        }
    }
    return (
            <>
            {response ? (
                <Redirect to="/"/>
            ):(
                <Container>
                    <Row>
                        <Col xs={3} md={2} lg={3}/>
                        <Col xs={6} md={6} lg={6}>
                            <h1>Registrarse</h1>
                            <Form onSubmit={submitHandler}>
                                <Form.Group  controlId="formNombre">
                                    <Form.Label >Nombre</Form.Label>
                                    <Form.Control type="text" name="nombre" required placeholder="Ingrese su nombre" value={form.nombre} onChange={nombreHandler}/>
                                </Form.Group>
                                <Form.Group  controlId="loginForm">
                                    <Form.Label>Cedula</Form.Label>
                                    <Form.Control type="text" name="cedula" maxLength="10" required placeholder="Ingrese su Cedula" value={form.cedula} onChange={cedulaHandler}/>
                                </Form.Group>
                                <Form.Group  controlId="formBasicEmail">
                                    <Form.Label>Correo</Form.Label>
                                    <Form.Control type="email" name="correo" required placeholder="correo" value={form.correo} onChange={emailHandler} />
                                </Form.Group>
                                <Form.Group  controlId="formBasictelf">
                                    <Form.Label>Celular</Form.Label>
                                    <Form.Control type="text" name="celular" maxLength="10" required placeholder="Ingrese su Celular" value={form.celular} onChange={cedulaHandler}/>
                                </Form.Group>
                                <Form.Group  controlId="formBasictelE">
                                    <Form.Label>Contacto de emergencia</Form.Label>
                                    <Form.Control type="text" name="contacto" maxLength="10" required placeholder="Ingrese el numero de un contacto" value={form.contacto} onChange={cedulaHandler}/>
                                </Form.Group>
                                <Form.Group  controlId="formBasicPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" name="password" required placeholder="Constraseña" value={form.password} onChange={passwordHandler} />
                                </Form.Group>
                                <Form.Group  controlId="formBasicPassword2">
                                    <Form.Label>Vuelva a ingresar la contraseña</Form.Label>
                                    <Form.Control type="password" name="password2" required placeholder="Constraseña" value={form.password2} onChange={password2Handler} />
                                </Form.Group>
                                <Button variant="primary" type="button" onClick={submitHandler} >
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                        <Col xs={3} md={2} lg={2}/>
                    </Row>
                </Container>
            )}
             
        </>
    )
}

export default RegitrarseForm;
