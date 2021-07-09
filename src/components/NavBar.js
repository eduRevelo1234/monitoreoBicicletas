import React from 'react'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink,useHistory } from 'react-router-dom'
import auth from "./Auth";

const NavBar = () => {
    let history = useHistory();
    return (
        <>
        <Navbar bg="light" expand="lg">
            <NavLink exact to="/home">
                <h6>Inicio</h6>
            </NavLink>
            <NavLink exact to ="/registro">
                <h6>Registrarse</h6>
            </NavLink>
            <NavLink exact to="/" onClick={() => {
                auth.logout(() => {
                history.push("/");
                });
            }}>
                <h6>Salir</h6>      
            </NavLink>
        </Navbar>
        </>
    )
}

export default NavBar;
