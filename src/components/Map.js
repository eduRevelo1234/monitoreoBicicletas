import React,{useState,useEffect} from 'react'
import { helpHttp } from '../helpers/helpHttp';
import ApiMap from './ApiMap';
import uuid from 'react-uuid';


const Map = ({cedula}) => {
    const [status, setStatus] = useState(null);
    let url2="https://5ueegwgd72.execute-api.eu-west-2.amazonaws.com/Devices/transactions";

    const [data, setData] = useState(null);

    const [error, setError] = useState(null);
    
    useEffect(() => {
        helpHttp().get(url2).then((res) => {
            if(!res.err){
                setData(JSON.parse(res.data.replace(/Decimal[(]/g,"").replace(/[)]/g,"").replace(/[']/g,`"`)));
                setError(null);
            }else{
                setData(null);
                setError(res);
            }
        });
        
    }, [status]);

    return (
        <div>
            { data &&
                <ApiMap
                    data={data}
                    cedula={cedula}
                    status={status}
                    setStatus={setStatus}    
                />
            }
        </div>
    )
}

export default Map;
