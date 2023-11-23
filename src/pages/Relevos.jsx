import { useState, useEffect } from 'react';
import axios from 'axios';

const Relevos = ({ token, usuarioId }) => {
  document.title = "Cheklist de Relevos";
  const [relevos, setRelevos] = useState([]);
  const [proyecto, setProyecto] = useState('');
  const [ticket, setTicket] = useState('');
  const [especialista, setEspecialista] = useState('');
  const [resumen, setResumen] = useState('');
  const [mensajeExito, setMensajeExito] = useState(null);
  const [mensajeError, setMensajeError] = useState(null);
  const [fecha, setFecha] = useState('');
  const [selectedRelevo, setSelectedRelevo] = useState(null);


  const data = {
    Fecha: fecha,
    Proyecto: proyecto,
    Ticket: ticket,
    Especialista: especialista,
    Resumen: resumen,
  };

  const fetchUserTags = async () => {
    try {
      const response = await axios.get(`http://10.70.131.130:3000/relevos/` + usuarioId, {
        headers: {
          Authorization: token,
        },
      });
      const newData = response.data;
      if (JSON.stringify(newData) !== JSON.stringify(data)) {
        setRelevos(newData);
      }
    } catch (error) {
      console.error(error);
      setMensajeError('Token expirado');
      setTimeout(() => {
        window.location.reload(); // Recargar la página después de 10 segundos
      }, 5000);
    }
  };
  useEffect(() => { fetchUserTags() }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRelevo) {
      if (!fecha || !proyecto || !ticket || !especialista || !resumen) {
        setMensajeExito('');
        setMensajeError('Todos los campos son obligatorios');
        return;
      }
      try {
        await axios.post(`http://10.70.131.130:3000/relevos`, data, {
          headers: {
            Authorization: token,
          },
        });
        setMensajeExito('Relevo creado exitosamente');
        setMensajeError('');
        setFecha('');
        setProyecto('');
        setTicket('');
        setEspecialista('');
        setResumen('');
      } catch (error) {
        console.log("no se pudo conectar por localhost, se conecta intenta por ip");
        try {
          await axios.post(`http://localhost:3000/relevos`, data, {
            headers: {
              Authorization: token,
            },
          });
          console.log("success post");
          setMensajeExito('Relevo creado exitosamente');
          setMensajeError('');
          setFecha('');
          setProyecto('');
          setTicket('');
          setEspecialista('');
          setResumen('');
          setTimeout(() => {
            window.location.reload(); // Recargar la página después de 10 segundos
          }, 5000);
        } catch (e) {
          setMensajeExito('');
          setMensajeError('Error al crear el relevo');
          console.error(error);
        }
      }
    } else {
      setSelectedRelevo(null);
      try {
        await axios.put(`http://10.70.131.130:3000/relevos/${selectedRelevo.id}`, data, {
          headers: {
            Authorization: token,
          },
        });
        setMensajeExito('Relevo modificado exitosamente');
        setMensajeError('');
        setFecha('');
        setProyecto('');
        setTicket('');
        setEspecialista('');
        setResumen('');
      } catch (error) {
        setMensajeExito('');
        setMensajeError('Error al modificar el relevo');
        console.error(error);
      }
    }
    fetchUserTags();
  };

  const handleChangeFecha = (e) => {
    const fechaSeleccionada = e.target.value;
    setFecha(fechaSeleccionada);
  };

  useEffect(() => {
    if (selectedRelevo) {
      setProyecto(selectedRelevo.proyecto);
      setTicket(selectedRelevo.ticket);
      setEspecialista(selectedRelevo.Especialista);
      setResumen(selectedRelevo.Resumen);
      setFecha(selectedRelevo.fecha_formato);
    } else {
      setProyecto('');
      setTicket('');
      setEspecialista('');
      setResumen('');
      setMensajeError('');
      setMensajeExito('');
    }
  }, [selectedRelevo]);

  const deleteRelevo = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://10.70.131.130:3000/relevos/${id}`);
      setProyecto('');
      setTicket('');
      setEspecialista('');
      setResumen('');
      setMensajeError('');
      setFecha('');
      setMensajeExito('Relevo eliminado exitosamente');

      // Realiza cualquier acción adicional después de la eliminación exitosa
    } catch (error) {
      setMensajeError('Error al eliminar el relevo: ' + error);
      // Maneja el error de eliminación según tus necesidades
    }
    setSelectedRelevo(null);
    fetchUserTags();
  };


  const cancelar = () => {
    setMensajeError('');
    setMensajeExito('');
    setFecha('');
    setProyecto('');
    setTicket('');
    setEspecialista('');
    setResumen('');
    setSelectedRelevo(null);
  };

  return (
    <>
      <div className='flex flex-col h-screen'>
        {token ? (
          <div className='flex'>
            <div className='h-min w-2/5 h-4/5 mx-8 w-md bg-gray-100 p-4 rounded shadow border border-cyan-300 overflow-x-auto' >
              <div className='mb-4'>
                <button className='w-auto py-2 px-4 mt-4 bg-cyan-300 text-white rounded cursor-pointer hover:bg-cyan-400' onClick={fetchUserTags}>Mostrar Tickets del dia</button>
              </div>
              <table className='table-auto min-w-max py-2 px-4 rounded shadow border border-cyan-300'>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Proyecto</th>
                    <th>Ticket</th>
                    <th>Especialista</th>
                    <th>Resumen</th>
                  </tr>
                </thead>
                <tbody>
                  {relevos.map((relevo) => (
                    <tr key={relevo.id} onClick={() => setSelectedRelevo(relevo)}>
                      <td className="px-4 py-2">{new Date(relevo.fecha_formato).toLocaleString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}  </td>
                      <td>{relevo.proyecto}</td>
                      <td className="px-4 py-2">{relevo.ticket}</td>
                      <td>{relevo.Especialista}</td>
                      <td>{relevo.Resumen}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


            <div className="w-2/3 max-w-lg mx-0.5 bg-gray-100 p-8 rounded shadow border border-cyan-300 h-min">
              <form onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold text-center text-cyan-300 mb-8">CheckList de Relevo</h1>

                {mensajeExito && <div className="bg-green-200 text-green-800 py-2 px-4 rounded mb-4">{mensajeExito}</div>}
                {mensajeError && <div className="bg-red-200 text-red-800 py-2 px-4 rounded mb-4">{mensajeError}</div>}

                <label htmlFor="fecha" className="block mb-2">Fecha:</label>
                <input type="datetime-local" id="fecha" value={fecha} onChange={handleChangeFecha} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded" />

                <label htmlFor="proyecto" className="block mb-2">Proyecto:</label>
                <select id="proyecto" value={proyecto} onChange={(e) => setProyecto(e.target.value)} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded">
                  <option value="">Seleccione un proyecto</option>
                  <option value="CANVIA">CANVIA</option>
                  <option value="PACIFICO">PACIFICO</option>
                  <option value="PRIMA">PRIMA</option>
                  <option value="UNIQUE">UNIQUE</option>
                  <option value="VOLCAN">VOLCAN</option>
                  <option value="CAMPOSOL">CAMPOSOL</option>
                  <option value="HABITAT">HABITAT</option>
                </select>

                <label htmlFor="ticket" className="block mb-2">Ticket:</label>
                <input type="text" id="ticket" value={ticket} onChange={(e) => setTicket(e.target.value)} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded" />

                <label htmlFor="especialista" className="block mb-2">Especialista:</label>
                <input type="text" id="especialista" value={especialista} onChange={(e) => setEspecialista(e.target.value)} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded" />

                <label htmlFor="resumen" className="block mb-2">Resumen de Ticket:</label>
                <textarea id="resumen" value={resumen} onChange={(e) => setResumen(e.target.value)} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded"></textarea>
                {selectedRelevo ? <div className="">
                  <button id='modificar' type="submit" className="w-2/5 py-2 px-4 ms-4 mt-4 bg-cyan-300 text-white rounded cursor-pointer hover:bg-cyan-400">Modificar</button>
                  <button id='cancelar' onClick={cancelar} className="w-2/5  py-2 px-8 ms-12 mt-4 bg-cyan-300 text-white rounded cursor-pointer hover:bg-cyan-400">cancelar</button>
                  <button id='delete' onClick={() => deleteRelevo(selectedRelevo.id)} className="w-4/5  py-2 px-8 ms-10 mt-4 bg-cyan-300 text-white rounded cursor-pointer hover:bg-cyan-400">Eliminar Relevo</button>
                </div> : <button id='enviar' type="submit" className="w-full py-2 px-4 mt-4 bg-cyan-300 text-white rounded cursor-pointer hover:bg-cyan-400">Enviar</button>}
              </form>
            </div>
          </div>) : (
          <div className='flex justify-center'>
            <div className="text-2xl ml-12'">Token Expirado</div>
            {setTimeout(() => {
              window.location.reload(); // Recargar la página después de 10 segundos
            }, 10000)}
          </div>
        )}
      </div>
    </>
  );
};

export default Relevos;
