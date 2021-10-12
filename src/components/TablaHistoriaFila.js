import React, { useEffect, useState } from 'react'

const TablaHistoriaFila = ({el}) => {
    let {timestamp} = el;
    const [data, setData] = useState([]);

    useEffect(() => {
        var timestampI = parseInt(timestamp);
        var fecha = new Date (timestampI * 1000);
        setData("" 
                    +fecha.getDate()+
                    "/"+(fecha.getMonth()+1)+
                    "/"+fecha.getFullYear()+
                    " "+fecha.getHours()+
                    ":"+fecha.getMinutes()+
                    ":"+fecha.getSeconds()
                );
        
    }, [])

    return (
        <tr>
            <td>{el.deviceid}</td>
            <td>{el.latitude}</td>
            <td>{el.longitude}</td>
            <td>{data}</td>
        </tr>
    )
}

export default TablaHistoriaFila;
