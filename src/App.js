
import './App.css';
import Map from './components/Map';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  HashRouter,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import NavBar from './components/NavBar';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Registrarse from './pages/Registrarse';
import Reservar from './pages/Reservar';
import Historial from './pages/Historial';



function App() {
  return (
    <div >
      <HashRouter>
        <NavBar/>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/registro" component={Registrarse}/>
          <PrivateRoute exact path="/home/:cedula" component={Home}/>
          <PrivateRoute exact path="/Reservar/:cedula" component={Reservar}/>
          <PrivateRoute exact path="/historial/:cedula" component={Historial}/>
        </Switch>
      </HashRouter>

      {/* <Map/> */}
    </div>
  );
}

export default App;
