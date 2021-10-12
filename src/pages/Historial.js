
import { useParams } from 'react-router';
import TablaHistorial from '../components/TablaHistorial';
import React, { useEffect, useState } from 'react';
import { helpHttp } from '../helpers/helpHttp';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

const Historial = () => {
    const [data, setData] = useState([]);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    let {cedula}= useParams();

    useEffect(()=>{
        console.log(cedula);
        let url = "https://jgqsjs7u7c.execute-api.eu-west-2.amazonaws.com/Get_History/transactions?usuario_in=" + cedula;
        console.log(url);
        helpHttp().get(url).then((res) => {
            if(!res.err){
                setResponse(JSON.parse(res.data.replace(/Decimal[(]/g,"").replace(/[)]/g,"").replace(/[']/g,`"`)));
                setError(null);
            }else{
                setResponse(null);
                setError(res);
            }
        });
    },[]);
    return (
        <div>
            <Container>
                <Row>
                    <Col lg={10} md={10} sm={10} xs={10}>
                        {!response ? (<Alert variant="primary" >No tiene datos</Alert>):(<h1>{<TablaHistorial response={response} />}</h1>) }
                    </Col>
                </Row>
            </Container>
            
        </div>
    )
}

export default Historial;
