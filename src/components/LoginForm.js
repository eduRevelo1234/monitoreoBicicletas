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
import Alert from 'react-bootstrap/Alert';
import { Redirect,useHistory} from 'react-router';
import auth from "./Auth";

const initialForm = {
    cedula: "",
    password: "",
};
const initial = {
    Respuesta:"",
}
const LoginForm = () => {
    let history = useHistory();
    const [form, setForm] = useState(initialForm);
    const [response, setResponse] = useState(null);
    const [isValidate, setIsValidate] = useState(false);
    const [path, setPath] = useState(null);
    const [error, setError] = useState(null);


    const singInHandler = ()=>{
        let url =`https://eaayz8d062.execute-api.eu-west-2.amazonaws.com/User/transactions?Cedula=${form.cedula}&Nombres=prueba&Correo=&Password=&Celular=&Contacto=&Emergencia=&Status=`;
        console.log(url);
    
        helpHttp().get(url).then((res)=>{
            if(!res.err){
                setResponse(res);
                console.log(res);
                console.log(res.Password)
                if(res.Password == form.password){
                    setIsValidate(true);
                    setPath(`/home/${form.cedula}`);
                   
                }
                setError(null);
            }else{
                setResponse(null);
                setError(res);
            }
        })
        
    }

    useEffect(() => {
        auth.login(() => {
            history.push(path);
          });
    }, [path]);
    
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

    return (
        <Container>
             <Row>
                <Col xs={3} md={2} lg={3}/>
                <Col xs={6} md={6} lg={6}>
                    <h1>Iniciar Sesión</h1>
                    <Form onSubmit={singInHandler}>
                        <Form.Group controlId="loginForm">
                            <Form.Label>Cedula</Form.Label>
                            <Form.Control type="text" name="cedula" maxLength="10" required placeholder="Ingrese su Cedula" value={form.cedula} onChange={cedulaHandler}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" name="password" required placeholder="Constraseña" value={form.password} onChange={passwordHandler}/>
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={singInHandler}>
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col xs={3} md={2} lg={2}/>
            </Row>
            <Row>
                <Col xs={3} md={2} lg={3}/>
                <Col xs={6} md={6} lg={6}>
                    {response && (response.Respuesta === "False" ? <Alert variant="danger"> El usuario no existe </Alert> : (
                        isValidate ? <Redirect to={path} /> : <Alert variant="danger"> Contraseña incorrecta </Alert>
                    ))}
                </Col>
                <Col xs={3} md={2} lg={2}/>
            </Row>
        </Container>
    )
}

export default LoginForm;
