import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import TablaHistoriaFila from './TablaHistoriaFila';
import Form from 'react-bootstrap/Form';


const TablaHistorial = ({response}) => {
    
    const [history, setHistory] = useState([]);

    useEffect(() => {
        console.log(response);
        if(response){
            setHistory([]);
            const iterator = async () => {
                response.forEach ( async el => {
                    let his = await el;
                    let hist = {
                        deviceid : his.deviceid,
                        latitude : his.latitud,
                        longitude : his.longitud,
                        timestamp : his.timestamp,
                    }
                    setHistory((history) => [...history,hist]);
                })
            }
            iterator();
        }
    }, [response])

    useEffect(() => {
        console.log(history);
    }, [history]);
    
    
    return (
        <div>
            <Table className="map" variant="dark" striped bordered hover responsive size="xs">
                <thead>
                    <tr>
                        <th>Id dispositivo</th>
                        <th>Latitud</th>
                        <th>Longitud</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    { history.length > 0 ? (
                        history.map((el)=> <TablaHistoriaFila key={el.deviceid} el={el} />)
                    ):(
                        <tr>
                            <td colSpan ="3">Sin datos</td>
                        </tr>
                    )}  
                </tbody>
            </Table>       
        </div>
    )
}

export default TablaHistorial;
