import React from "react";
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/LoginPage';
import Registro from './Pages/Register/RegisterPage';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login></Login>}></Route>
      <Route path='/Registro' element={<Registro></Registro>}></Route>
    </Routes>
    </BrowserRouter>
  )

}

export default App;
