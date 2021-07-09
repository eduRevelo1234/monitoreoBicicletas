import React,{useEffect,useState} from 'react'
import {GoogleMap,withScriptjs, withGoogleMap, Marker} from "react-google-maps";
import uuid from 'react-uuid';
import { helpHttp } from '../helpers/helpHttp';
import logo from "../icon-bicycle.svg";


const MapaGoogle = ({markers, setBicycle,cedula}) => {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(null);
    const [idDispositivo, setIdDispositivo] = useState("0");

    useEffect(() => {
        console.log(cedula);
        let url =`https://wz0z3ny13j.execute-api.eu-west-2.amazonaws.com/ModifyStatus/Transaction_Proccessor_7`;
        helpHttp().get(url).then((res)=> {
            if(!res.err){
                if(!res.err){
                    res = JSON.parse(res.data.replace(/Decimal[(]/g,"").replace(/[)]/g,"").replace(/[']/g,`"`));
                    console.log(res);
                    res.map((el) => {
                        
                        console.log(cedula);
                        if(el.Cedula == cedula){
                            setIdDispositivo(el.Id);
                            console.log(el.Id);
                        }
                    })
                    setUsuarios(res);
                    setError(null);
                    
                }else{
                    setUsuarios(null);
                    setError(res);
                }
            }else{

            }
        })    
    }, []);

    useEffect(() => {
        markers.map((el)=> {
        })
    }, [markers]);
    
    const handleClick = (el) => {
        console.log(el);
    }

    return (
        <div>
            {markers.length === 0 ? <h1>Cargando</h1> : 
                <GoogleMap
                className="map"
                defaultZoom={10}
                defaultCenter={{lat:-0.3508, lng: -78.452}}
                >

                    {markers.map( (el) => (
                                <>
                                    <Marker 
                                        onClick= { ()=> setBicycle(el)}
                                        key = {uuid()} 
                                        position = {{lat: parseFloat(el.latitude), lng: parseFloat(el.longitude)}}
                                        icon = {{url: logo, scaledSize: new window.google.maps.Size(40, 40),}}
                                    > 
                                    </Marker>                
                                </>
                            ))}
                    {idDispositivo && (
                       (idDispositivo == "0" 
                        )?(
                            markers.map( (el) => (
                                <>
                                    <Marker 
                                        onClick= { ()=> setBicycle(el)}
                                        key = {uuid()} 
                                        position = {{lat: parseFloat(el.latitude), lng: parseFloat(el.longitude)}}
                                        icon = {{url: logo, scaledSize: new window.google.maps.Size(40, 40),}}
                                    > 
                                    </Marker>                
                                </>
                            )) 
                        ):( 
                            markers.map(el => 
                                <>
                                    <Marker 
                                        onClick= { ()=> setBicycle(el)}
                                        key = {uuid()} 
                                        position = {{lat: parseFloat(el.latitude), lng: parseFloat(el.longitude)}}
                                        icon = {{url: logo, scaledSize: new window.google.maps.Size(40, 40),}}
                                    > 
                                    </Marker>                
                                </>
                            )
                        )     
                    )} 
                </GoogleMap>
            }
        </div>
    )
}


export default withScriptjs(
    withGoogleMap(
        MapaGoogle
    )
);
