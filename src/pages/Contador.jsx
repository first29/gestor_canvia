import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';


import axios from 'axios';

const Contador = ({ token, usuarioId }) => {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechafin, setFechafin] = useState('');
    const [Correos, setCorreos] = useState([]);
    const [proyecto, setProyecto] = useState('');
    const [pais, setPais] = useState('');
    const [remitente, setRemitente] = useState('');
    const [asunto, setAsunto] = useState('');
    const [fecha, setFecha] = useState('');
    const [tipoGestion, setTipoGestion] = useState('');
    const [ticket, setTicket] = useState('');
    const [mensajeExito, setMensajeExito] = useState('');
    const [mensajeError, setMensajeError] = useState('');
    const [selectedCorreo, setSelectedCorreo] = useState(null);

    document.title = "Contador de Correos";
    const data = {
        proyecto: proyecto,
        sede: pais,
        remitente: remitente,
        asunto: asunto,
        fecha: fecha,
        tipo_gestion: tipoGestion,
        ticket: ticket,
    };

    async function fetchUserTags() {
        try {
            const response = await axios.get(`https://10.70.131.130:3000/Correo/` + usuarioId,{
                headers: {
                  Authorization: token,
                },
              });
            const newData = response.data;
            if (JSON.stringify(newData) !== JSON.stringify(data)) {
                setCorreos(newData);
            }
        } catch (error) {
                setMensajeError("el token expiro");
                setTimeout(() => {
                    window.location.reload(); // Recargar la página después de 10 segundos
                }, 5000);
        }
    }
    useEffect(()=>{fetchUserTags()},[]);
    useEffect(() => {
        if (selectedCorreo) {
            setProyecto(selectedCorreo.proyecto);
            setPais(selectedCorreo.sede);
            setRemitente(selectedCorreo.remitente);
            setAsunto(selectedCorreo.asunto);
            setTicket(selectedCorreo.ticket);
            setTipoGestion(selectedCorreo.tipo_gestion);
            setFecha(selectedCorreo.fecha_formato);
            setMensajeError('');
            setMensajeExito('');
        }
    }, [selectedCorreo]);

    const deleteCorreo = async (id) => {
        try {
            await axios.delete(`http://10.70.131.130:3000/Correo/${id}`,{
                headers: {
                  Authorization: token,
                },
              });
            setProyecto('');
            setRemitente('');
            setAsunto('');
            setFecha('');
            setMensajeExito('Relevo eliminado exitosamente');

            // Realiza cualquier acción adicional después de la eliminación exitosa
        } catch (error) {
            try {
                await axios.delete(`http://localhost:3000/Correo/${id}`,{
                    headers: {
                      Authorization: token,
                    },
                  });
                setProyecto('');
                setRemitente('');
                setAsunto('');
                setFecha('');
                setMensajeError('');
                setMensajeExito('Relevo eliminado exitosamente');
                // Realiza cualquier acción adicional después de la eliminación exitosa
            } catch (error) {
                setMensajeError('Error al eliminar el relevo');
                // Maneja el error de eliminación según tus necesidades
            }
        }
        fetchUserTags();
        setSelectedCorreo(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCorreo) {
            if (!proyecto || !pais || !remitente || !asunto || !fecha || !tipoGestion) {
                setMensajeExito('');
                setMensajeError('Todos los campos son obligatorios');
                return;
            }
            try {
                await axios.post(`http://10.70.131.130:3000/correo`, data, {
                    headers: {
                        Authorization: token,
                    },
                });
                setMensajeExito('Correo creado exitosamente');
                setMensajeError('');
                setFecha('');
                setProyecto('');
                setTicket('');
                setPais('');
                setRemitente('');
                setAsunto('');
                setTipoGestion('');
                setTicket('');
            } catch (error) {
                console.log("no se pudo conectar por ip, se conecta intenta por localhost");
                try {
                    await axios.post(`http://localhost:3000/correo`, data, {
                        headers: {
                            Authorization: token,
                        },
                    });
                    console.log("success post");
                    setMensajeExito('Correo creado exitosamente');
                    setMensajeError('');
                    setFecha('');
                    setProyecto('');
                    setTicket('');
                    setPais('');
                    setRemitente('');
                    setAsunto('');
                    setTipoGestion('');
                    setTicket('');
                    setTimeout(() => {
                        window.location.reload(); // Recargar la página después de 10 segundos
                    }, 5000);
                } catch (e) {
                    setMensajeExito('');
                    setMensajeError('Error al crear el Correo');
                    console.error(error);
                    setTimeout(() => {
                        window.location.reload(); // Recargar la página después de 10 segundos
                    }, 5000);
                }
            }
        } else {
            setSelectedCorreo(null);
            try {
                await axios.put(`http://10.70.131.130:3000/Correo/${selectedCorreo.id}`, data, {
                    headers: {
                        Authorization: token,
                    },
                });
                setMensajeExito('Correo modificado exitosamente');
                setMensajeError('');
                setFecha('');
                setProyecto('');
                setTicket('');
                setPais('');
                setRemitente('');
                setAsunto('');
                setTipoGestion('');
                setTicket('');
            } catch (error) {
                console.log("no se pudo conectar por ip, se conecta intenta por localhost");
                try {
                    await axios.put(`http://localhost:3000/Correo/${selectedCorreo.id}`, data, {
                        headers: {
                            Authorization: token,
                        },
                    });
                    console.log("success put");
                    setMensajeExito('Correo modificado exitosamente');
                    setMensajeError('');
                    setFecha('');
                    setProyecto('');
                    setTicket('');
                    setPais('');
                    setRemitente('');
                    setAsunto('');
                    setTipoGestion('');
                    setTicket('');
                    setTimeout(() => {
                      window.location.reload(); // Recargar la página después de 10 segundos
                    }, 5000);
                } catch (e) {
                    setMensajeExito('');
                    setMensajeError('Error al modificar correo');
                    console.error(error);
                    setTimeout(() => {
                        window.location.reload(); // Recargar la página después de 10 segundos
                    }, 5000);
                }
            }
        }
        fetchUserTags()
    };

    const handleExport = async () => {
        try {
            const response = await axios.get(`http://10.70.131.130:3000/Correo/${fechaInicio}/${fechafin}`, {
                headers: {
                    Authorization: token,
                },
            });
            const data = response.data; 
            const formattedData = data.map(item => ({
                ...item,
                fecha: new Date(item.fecha),
            }));
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(formattedData);
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
            const fileName = "reporte_de_correos.xlsx";
            XLSX.writeFile(workbook, fileName);
        } catch (error) {
            console.error("Error al exportar los datos:", error);
        }
    }
    const handleChangeFecha = (e) => {
        const fechaSeleccionada = e.target.value;
        setFecha(fechaSeleccionada);
    };

    const cancelar = () => {
        setMensajeError('');
        setMensajeExito('');
        setFecha('');
        setProyecto('');
        setTicket('');
        setPais('');
        setRemitente('');
        setAsunto('');
        setTipoGestion('');
        setTicket('');
        setSelectedCorreo('');
    };

    return (
        <>
            <div className='flex flex-col h-screen'>
                {token ? (
                    <div className='flex'>
                        <div className='w-2/5 h-3/5 mx-8 w-md bg-gray-100 p-4 rounded shadow border border-cyan-300 overflow-x-auto overflow-auto'>
                            <div className='mb-4'>
                                <button className='w-auto py-2 px-4 mt-4 bg-cyan-300 text-white rounded cursor-pointer hover:bg-cyan-400' onClick={fetchUserTags}>Mostrar Tickets del día</button>
                            </div>
                            <table className='table-auto min-w-max py-2 px-4 rounded shadow border border-cyan-300'>
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Proyecto</th>
                                        <th>Sede</th>
                                        <th>Remitente</th>
                                        <th>Asunto</th>
                                        <th>Tipo de Gestión</th>
                                        <th>Ticket/Tipo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Correos.map((correo) => (
                                        <tr key={correo.id} onClick={() => setSelectedCorreo(correo)}>
                                            <td className="px-4 py-2">{new Date(correo.fecha_formato).toLocaleString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })} </td>
                                            <td>{correo.proyecto}</td>
                                            <td className="px-4 py-2">{correo.sede}</td>
                                            <td>{correo.remitente}</td>
                                            <td>{correo.asunto}</td>
                                            <td className="px-4 py-2">{correo.tipo_gestion}</td>
                                            <td className="px-4 py-2">{correo.ticket}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="w-2/3 max-w-lg mx-0.5 bg-gray-100 p-8 rounded shadow border border-cyan-300 h-min">
                            <form onSubmit={handleSubmit}>
                                <h1 className="text-2xl font-bold text-center text-cyan-300 mb-8">CheckList Contador de Correos</h1>

                                {mensajeExito && <div className="bg-green-200 text-green-800 py-2 px-4 rounded mb-4">{mensajeExito}</div>}
                                {mensajeError && <div className="bg-red-200 text-red-800 py-2 px-4 rounded mb-4">{mensajeError}</div>}

                                <label htmlFor="proyecto">Proyecto:</label>
                                <select id="proyecto" value={proyecto} onChange={(e) => setProyecto(e.target.value)} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded">
                                    <option value="">Seleccione un proyecto</option>
                                    <option value="UNIQUE">UNIQUE</option>
                                    <option value="VOLCAN">VOLCAN</option>
                                </select>

                                {proyecto === 'UNIQUE' && (
                                    <>
                                        <label htmlFor="pais">País:</label>
                                        <select id="pais" value={pais} onChange={(e) => setPais(e.target.value)} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded">
                                            <option value="">Seleccione un país</option>
                                            <option value="Bolivia">Bolivia</option>
                                            <option value="Colombia">Colombia</option>
                                            <option value="Corporación">Corporación</option>
                                            <option value="España">España</option>
                                            <option value="Ecuador">Ecuador</option>
                                            <option value="Francia">Francia</option>
                                            <option value="Guatemala">Guatemala</option>
                                            <option value="Italia">Italia</option>
                                            <option value="México">México</option>
                                            <option value="Pananamá">Panamá</option>
                                            <option value="Perú">Perú</option>
                                            <option value="Rusia">Rusia</option>
                                            <option value="Suiza">Suiza</option>
                                            <option value="Unique Visión Perú">Unique Visión Perú</option>
                                            <option value="USA">USA</option>
                                            <option value="Venezuela">Venezuela</option>
                                        </select>
                                    </>
                                )}

                                {proyecto === 'VOLCAN' && (
                                    <>
                                        <label htmlFor="pais">Sede Volcan:</label>
                                        <select id="pais" value={pais} onChange={(e) => setPais(e.target.value)} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded">
                                            <option value="">Seleccione una sede</option>
                                            <option value="Alpamarca">Alpamarca</option>
                                            <option value="Cerro">Cerro</option>
                                            <option value="Chungar">Chungar</option>
                                            <option value="Lima">Lima</option>
                                            <option value="Yauli">Yauli</option>
                                        </select>
                                    </>
                                )}

                                <label htmlFor="remitente">Remitente:</label>
                                <input type="text" id="remitente" value={remitente} onChange={(e) => setRemitente(e.target.value)} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded" />

                                <label htmlFor="asunto">
                                    Asunto:
                                    <br />
                                    Indicar el asunto del correo (No olvidar que todo correo gestionado debe estar categorizado):<br />
                                    nro. ticket-REQ-G24// TKXXX-REQ-G24 (requerimiento)<br />
                                    nro. ticket-INC-G24// TKXXX-INC-G24 (incidente)<br />
                                    nro. ticket-GR-G24// TKXXX-GR-G24 (gestión de requerimiento)<br />
                                    nro. ticket-GI-G24// TKXXX-GI-G24 (gestión de incidente)<br />
                                    FID-G24// (falta información y datos)<br />
                                    INF-G24// (informativo)
                                </label>
                                <input type="text" id="asunto" value={asunto} onChange={(e) => setAsunto(e.target.value)} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded" />

                                <label htmlFor="fecha">Fecha y Hora:</label>
                                <input type="datetime-local" id="fecha" value={fecha} onChange={handleChangeFecha} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded" />

                                {proyecto === 'VOLCAN' && (<div>
                                    <label htmlFor="tipoGestion">Tipo de Gestión:</label>
                                    <select id="tipoGestion" value={tipoGestion} onChange={(e) => setTipoGestion(e.target.value)} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded">
                                        <option value="">Seleccione un tipo de gestión</option>
                                        <option value="Falta de información">Falta de información</option>
                                        <option value="Incidente">Incidente</option>
                                        <option value="Informativo">Informativo</option>
                                        <option value="Requerimiento">Requerimiento</option>
                                        <option value="Problema">Problema</option>
                                        <option value="Seguimiento de Ticket">Seguimiento de Ticket</option>
                                    </select>
                                </div>
                                )}

                                {proyecto === 'UNIQUE' && (<div>
                                    <label htmlFor="tipoGestion">Tipo de Gestión:</label>
                                    <select id="tipoGestion" value={tipoGestion} onChange={(e) => setTipoGestion(e.target.value)} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded">
                                        <option value="">Seleccione un tipo de gestión</option>
                                        <option value="Falta de información">Falta de información</option>
                                        <option value="Gestion Incidente">Gestion Incidente</option>
                                        <option value="Gestion requerimiento">Gestion requerimiento</option>
                                        <option value="Incidente">Incidente</option>
                                        <option value="Informativo">Informativo</option>
                                        <option value="Requerimiento">Requerimiento</option>
                                        <option value="Problema">Problema</option>
                                        <option value="Gestion Problema">Gestion Problema</option>
                                    </select>
                                </div>
                                )}

                                {['Seguimiento de Ticket', 'Gestion requerimiento', 'Gestion Incidente', 'Incidente', 'Requerimiento', 'Problema'].includes(tipoGestion) && (
                                    <>
                                        <label htmlFor="ticket">Ticket:</label>
                                        <input type="text" id="ticket" value={ticket} onChange={(e) => setTicket(e.target.value)} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded" />
                                    </>
                                )}

                                {tipoGestion === 'Informativo' && (
                                    <>
                                        <label htmlFor="ticket">Motivo de informativo:</label>
                                        <select id="ticket" value={ticket} onChange={(e) => setTicket(e.target.value)} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded">
                                            <option value="">Seleccione una sede</option>
                                            <option value="TI">TI</option>
                                            <option value="CONTABILIDAD">CONTABILIDAD</option>
                                            <option value="GGHH">GGHH</option>
                                            <option value="FINANZAS">FINANZAS</option>
                                            <option value="LOGISTICA">LOGISTICA</option>
                                            <option value="EXPLORACIONES">EXPLORACIONES</option>
                                            <option value="ENERGIA">ENERGIA</option>
                                            <option value="SEGURIDAD PATRIMONIAL">SEGURIDAD PATRIMONIAL</option>
                                            <option value="ADMINISTRACION">ADMINISTRACION</option>
                                        </select>
                                    </>
                                )}

                                {selectedCorreo ? (
                                    <div className="">
                                        <button id='modificar' type="submit" className="w-2/5 py-2 px-4 ms-7 mt-4 bg-cyan-300 text-white rounded cursor-pointer hover:bg-cyan-400">Modificar</button>
                                        <button id='cancelar' onClick={cancelar} className="w-2/5 py-2 ms-8 px-12 mt-4 bg-cyan-300 text-white rounded cursor-pointer hover:bg-cyan-400">Cancelar</button>
                                        <button id='delete' onClick={() => deleteCorreo(selectedCorreo.id)} className="w-4/5 py-2 px-8 ms-12 mt-4 bg-cyan-300 text-white rounded cursor-pointer hover:bg-cyan-400">Eliminar Relevo</button>
                                    </div>
                                ) : (
                                    <button id='enviar' type="submit" className="w-full py-2 px-4  mt-4 bg-cyan-300 text-white rounded cursor-pointer hover:bg-cyan-400">Enviar</button>
                                )}
                            </form>
                            <br />
                            {usuarioId === 6 ? (<div className="">
                                <div className="">
                                    <label htmlFor="fechaInicio">Fecha de inicio:</label>
                                    <input type="date" id="fechaInicio" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} className="w-1/2 ml-6 py-2 px-4 mb-4 border border-cyan-300 rounded" />
                                </div>
                                <div className=''>
                                    <label htmlFor="fechafin">Fecha fin:</label>
                                    <input type="date" id="fechafin" value={fechafin} onChange={(e) => setFechafin(e.target.value)} className="w-1/2 ml-16 py-2 px-4 mb-4 border border-cyan-300 rounded" />
                                </div>
                                <button className="w-1/5 py-2 px-4  mt-4 bg-cyan-300 text-white rounded cursor-pointer hover:bg-cyan-400 ml-44" onClick={handleExport}>Exportar</button>
                            </div>) : (console.log(""))
                            }
                        </div>
                    </div>
                ) : (
                    <div className='flex justify-center'>
                        <div className="text-2xl ml-12'">Token Expirado</div>
                        {setTimeout(() => {
                            window.location.reload(); 
                        }, 5000)}
                    </div>
                )}

            </div>
        </>

    );
};

export default Contador;
