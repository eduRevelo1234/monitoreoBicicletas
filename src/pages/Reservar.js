import React from 'react';
import Map from '../components/Map';
import { useParams,useHistory } from 'react-router';

const Reservar = () => {
    let {cedula} = useParams();
    
   
    return (
        <Map cedula={cedula}/>
    )
}

export default Reservar;
