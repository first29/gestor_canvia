import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Relevos from './pages/Relevos';
import Contador from './pages/Contador';
import Login from './pages/login';
import Navbar from './Componentes/Navbar';
import Llamadas from './pages/Llamadas';

function App() {
 
  const [token, setToken] = useState('');
  const [usuarioID, setUsuarioID] = useState('');
  document.title = "Canvia";
  return (
    <Router>
      {token ? (
        <>
        <Navbar />
        <br />
        <Routes>
        <Route className='justify-center' path='/' element={<div className='grid  justify-center'>
          <h1 className='text-2xl ml-12'>Bienvenido a los aplicativos de canvia</h1>
          <h1  className='text-2xl'>por favor elegir uno de los botones de la barra</h1>
        </div>} />
          <Route path='/relevos' element={<Relevos token={token} usuarioId={usuarioID} />} />
          <Route path="/contador" element={<Contador token={token} usuarioId={usuarioID}/>} />
          <Route path="/Llamadas" element={<Llamadas token={token} usuarioId={usuarioID}/>} />
        </Routes>
        </>
      ): <Login setToken={setToken} setUsuario={setUsuarioID}/>}
    </Router>
  );
}

export default App;

