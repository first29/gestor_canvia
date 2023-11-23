import { useState } from "react";
import * as jwt from 'jwt-decode';
import axios from 'axios';

const Login = ({ setToken, setUsuario }) => {
    document.title = "Login";
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            correo,
            contraseña,
        };
        
        const handleLogin = () => {
            axios
                .post(`http://10.70.131.130:3000/login`, data)
                .then((response) => {
                    const { token } = response.data;
                    setToken(token);
                    const decodedToken = jwt.jwtDecode(token);
                    console.log(response);
                    const usuario_id = decodedToken.usuarioId;
                    setUsuario(usuario_id);
                })
                .catch((error) => {
                   setError('Credenciales invalidas');
                        console.error(error);
                    
                });
        };
        
        handleLogin();
    };

    return (
        <form className="login-form w-96 mx-auto p-4 border border-cyan-300 rounded bg-gray-100" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-center text-cyan-300 mb-8 mt-8">Iniciar Sesión</h1>

            {error && <div className="bg-red-200 text-red-800 py-2 px-4 rounded mb-4">{error}</div>}

            <label htmlFor="correo" className="font-bold mb-4">Correo Electrónico:</label>
            <input type="email" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded" />

            <label htmlFor="contraseña" className="font-bold mb-4">Contraseña:</label>
            <input type="password" id="contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded" />

            <button id="login-submit" type="login-submit" className="w-48 ml-20 py-2 px-4 mt-4 bg-cyan-300 text-white rounded cursor-pointer hover:bg-cyan-400">Iniciar sesión</button>
        </form>

    );
};

export default Login;
