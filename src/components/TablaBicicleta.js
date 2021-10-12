import React, { useState,useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { helpHttp } from '../helpers/helpHttp';

const TablaBicicleta = ({bicycle,cedula,setStatus,status}) => {

    const [data, setData] = useState([]);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [response2, setResponse2] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [errorUsarios, setErrorUsuarios] = useState(null);
    const [validacion, setValidacion] = useState(false);
   
    //https://hdy6jswri1.execute-api.eu-west-2.amazonaws.com/ModifyStatus/Transaction_Proccessor_4?Cedula=1234567890&Status=ON&Id=4D6466

    let {timestamp} = bicycle;
    useEffect(() => {
        validarReserva();
    }, [usuarios])

    const validarReserva= () =>{
        usuarios.map((el) => {
            
            if(el.Cedula  == cedula ){
                console.log(el.Cedula);
                if(el.Status == "ON"){
                    setValidacion(true);
                }
                else{
                    setValidacion(false);
                    
                }
            }
        });
    } 
    useEffect(() => {
        
        
        var timestampI = parseInt(timestamp);
        
        var fecha = new Date (timestampI * 1000);

        
        let url = `https://wz0z3ny13j.execute-api.eu-west-2.amazonaws.com/ModifyStatus/Transaction_Proccessor_7`;

        setData("" 
                    +fecha.getDate()+
                    "/"+(fecha.getMonth()+1)+
                    "/"+fecha.getFullYear()+
                    " "+fecha.getHours()+
                    ":"+fecha.getMinutes()+
                    ":"+fecha.getSeconds()
                );
        helpHttp().get(url).then((res) => {
            if(!res.err){
                setUsuarios(JSON.parse(res.data.replace(/Decimal[(]/g,"").replace(/[)]/g,"").replace(/[']/g,`"`)));
                setErrorUsuarios(null);
                
            }else{
                setUsuarios(null);
                setErrorUsuarios(res);
            }
        });
        
    }, [bicycle,status,response])

    const reservarHandler = (e) => {
        
        console.log(validacion);
        if(validacion === true){
            alert("Ya tiene una reserva Activa");
        }else{
            //url para cambiar el status de la bicicleta
            var aleatorio = Math.random();
            let url = `https://0t7pkxgzl7.execute-api.eu-west-2.amazonaws.com/Modificar_Status/transactions?Cedula=${cedula}&DeviceId=${bicycle.deviceid}`;
            //URL para cambiar el estado del usuario
            let url2 = `https://hdy6jswri1.execute-api.eu-west-2.amazonaws.com/ModifyStatus/Transaction_Proccessor_4?Cedula=${cedula}&Status=ON&Id=${bicycle.deviceid}`;
            helpHttp().get(url).then((res)=>{
                if(!res.err){
                    setStatus(aleatorio);
                    setResponse(res);
                    setError(null);
                    
                    helpHttp().get(url2).then((res)=>{
                        if(!res.err){
                            setResponse2(res);
                            setError(null);
                            alert("Reserva exitosa");
                        }else{
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
        
    }

    const quitarReservaHandler = (e) => {
        var aleatorio = Math.random();
        let url = `https://0t7pkxgzl7.execute-api.eu-west-2.amazonaws.com/Modificar_Status/transactions?Cedula=0&DeviceId=${bicycle.deviceid}`;

        let url2 = `https://hdy6jswri1.execute-api.eu-west-2.amazonaws.com/ModifyStatus/Transaction_Proccessor_4?Cedula=${cedula}&Status=OFF&Id=0`
        
        helpHttp().get(url).then((res)=>{
            if(!res.err){
                setStatus(aleatorio);
                setResponse(res);
                setError(null);
                helpHttp().get(url2).then((res) => {
                    if(!res.err){
                        setResponse2(res);
                        setError(null);
                        
                        alert("Reserva finalizada");
                    }else{
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
        <div>
            <Form >
                <Table className="map" variant="dark" striped bordered hover responsive size="xs">
                    <thead>
                        <tr>
                            <th>Id dispositivo</th>
                            <th>Latitud</th>
                            <th>Longitud</th>
                            <th>SOS</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{bicycle.deviceid}</td>
                            <td>{bicycle.latitude}</td>
                            <td>{bicycle.longitude}</td>
                            <td>{bicycle.SOS}</td>
                            <td>{data}</td>
                            {bicycle.status == "0" ? <td><Button onClick={reservarHandler} >Reservar</Button></td> : <h6>No Disponible</h6>}
                        </tr>        
                    </tbody>
                </Table>
            </Form>
            
        </div>
    )
}

export default TablaBicicleta;
