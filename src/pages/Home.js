import Button from 'react-bootstrap/Button';
import React,{useState,useEffect} from 'react';
import { useParams,useHistory } from 'react-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { helpHttp } from '../helpers/helpHttp';

const Home = () => {
    const [idDispositivo, setIdDispositivo] = useState([]);
    const [response, setResponse] = useState(null);
    
    const [response2, setResponse2] = useState(null);
    const [error, setError] = useState(null);
    let history = useHistory();
    let {cedula} = useParams();
    const reservarHandler = () => {
        history.push(`/Reservar/${cedula}`)
    }

    useEffect(() => {
        let url =`https://wz0z3ny13j.execute-api.eu-west-2.amazonaws.com/ModifyStatus/Transaction_Proccessor_7`;
        helpHttp().get(url).then((res)=> {
            if(!res.err){
                res = JSON.parse(res.data.replace(/Decimal[(]/g,"").replace(/[)]/g,"").replace(/[']/g,`"`));
                setError(null);
                res.forEach( async (el) => {
                    if(el.Cedula == cedula){
                        setIdDispositivo(el.Id);
                        console.log(idDispositivo);
                    }
                })
            }else{
                setError(res);
            }
    })
    }, [])

    const quitarReservaHandler = () => {
        let url = `https://0t7pkxgzl7.execute-api.eu-west-2.amazonaws.com/Modificar_Status/transactions?Cedula=0&DeviceId=${idDispositivo}`;
        let url2 = `https://hdy6jswri1.execute-api.eu-west-2.amazonaws.com/ModifyStatus/Transaction_Proccessor_4?Cedula=${cedula}&Status=OFF&Id=0`;

        helpHttp().get(url).then((res)=>{
            if(!res.err){
                setResponse(res);
                setError(null);
                helpHttp().get(url2).then((res) => {
                    if(!res.err){
                        setResponse2(res);
                        setError(null);
                        
                        alert("Reserva finalizada");
                    }else{
                        alert("No tiene reservas");
                        setResponse2(null);
                        setError(res);
                    }
                })
            }else{
                setResponse(null);
                setError(res);
            }
            
        });

    }   

    return (
        <Container>
            <Row>
                <Col xs={5} md={3} lg={4}/>
                <Col xs={4} md={5} lg={5}>
                    <Button className="buttons" onClick={reservarHandler}>Reservar</Button>
                    <Button className="buttons" onClick={quitarReservaHandler}>Quitar reserva</Button>
                </Col>
                <Col xs={3} md={2} lg={2}/>
            </Row>
        </Container>
    )
}

export default Home;
