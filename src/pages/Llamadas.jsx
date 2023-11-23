import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';


function Llamadas({ token }) {
    document.title = "Control de Calidad";
    const { reset, register, handleSubmit, formState: { errors } } = useForm();
    const [mensaje, setMensaje] = useState("");
    const onSubmit = handleSubmit(async (data) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // Desplazamiento suave
        });
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (key === 'audio') {
                formData.append(key, data[key][0]);
            } else {
                formData.append(key, data[key]);
            }
        });
        try {
            await axios.post(`http://10.70.131.130:3000/audio`, formData);
            setMensaje("Archivo enviado correctamente");
        } catch (error) {
            console.log("Error: " + error);
            setMensaje("Error al subir Archivo: " + error);
        }
        reset();
    })

    useEffect(() => {
        if (mensaje !== "") {
            setTimeout(() => {
                setMensaje("");
            }, 8000);
        }
    }, [mensaje]);

    return (
        <>
            {token ? (
                <div className='flex justify-center h-screen'>
                    <form onSubmit={onSubmit} className="h-min w-2/5 h-4/5 mx-8 w-md bg-gray-100 p-4 rounded shadow border border-cyan-300 overflow-x-auto'">
                        <h1 className="text-2xl font-bold text-center text-cyan-300 mb-8">Evaluacion de Calidad</h1>
                        {mensaje !== "" && <div className="bg-green-200 text-center text-green-800 py-2 px-4 rounded mb-4">{mensaje}</div>}

                        <label htmlFor="proyecto"> Proyecto:</label>
                        <select id="proyecto" name="proyecto" {...register("proyecto", { required: { value: true, message: "Este campo es requerido" } })} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded">
                            <option value="">Seleccionar</option>
                            <option value="canvia">Canvia</option>
                            <option value="unique">Unique</option>
                            <option value="volcan">Volcan</option>
                            <option value="pacifico">Pacifico</option>
                            <option value="prima">Prima</option>
                            <option value="habitat">Habitat</option>
                        </select>
                        {errors.proyecto && <span className="text-red-500">{errors.proyecto.message}</span>}
                        <br></br>

                        <label htmlFor="evaluado">Evaluado:</label>
                        <select id="evaluado" name="evaluado" {...register("evaluado", { required: { value: true, message: "Este campo es requerido" } })} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded">
                            <option value="">Seleccionar</option>
                            <option value="3">EHH</option>
                            <option value="4">JHA</option>
                            <option value="5">JMC</option>
                            <option value="1">RCC</option>
                        </select>
                        {errors.evaluado && <span className="text-red-500">{errors.evaluado.message}</span>}
                        <br></br>

                        <label htmlFor="fecha">Fecha: </label>
                        <input type="date" id="fecha" name="fecha" {...register("fecha", { required: { value: true, message: "Este campo es requerido" } })} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded" />
                        {errors.fecha && <span className="text-red-500">{errors.fecha.message}</span>}
                        <br></br>

                        <label htmlFor="codigo_grabacion">Código grabación:  </label>
                        <input type="text" id="codigo_grabacion" name="codigo_grabacion" {...register("codigo_grabacion", { required: { value: true, message: "Este campo es requerido" } })} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded" />
                        {errors.codigo_grabacion && <span className="text-red-500">{errors.codigo_grabacion.message}</span>}
                        <br></br>

                        <label htmlFor="nro_ticket"> Nro Ticket: </label>
                        <input type="text" id="nro_ticket" name="nro_ticket" {...register("nro_ticket", { required: { value: true, message: "Este campo es requerido" } })} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded" />
                        {errors.nro_ticket && <span className="text-red-500">{errors.nro_ticket.message}</span>}
                        <br></br>

                        <label htmlFor="motivo_llamada"> Motivo llamada:</label>
                        <input type="text" id="motivo_llamada" name="motivo_llamada" {...register("motivo_llamada", { required: { value: true, message: "Este campo es requerido" } })} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded" />
                        {errors.motivo_llamada && <span className="text-red-500">{errors.motivo_llamada.message}</span>}
                        <br></br>

                        <label htmlFor="duracion_llamada">Duración llamada (formato HH:MM:SS):</label>
                        <input type="text" id="duracion_llamada" name="duracion_llamada" {...register("duracion_llamada", { required: { value: true, message: "Este campo es requerido" } })} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded" />
                        {errors.duracion_llamada && <span className="text-red-500">{errors.duracion_llamada.message}</span>}
                        <br></br>

                        <label htmlFor="tipo_ticket"> Tipo ticket:</label>
                        <select id="tipo_ticket" name="tipo_ticket" {...register("tipo_ticket", { required: { value: true, message: "Este campo es requerido" } })} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded">
                            <option value="">Seleccionar</option>
                            <option value="0">Solicitud</option>
                            <option value="1">Incidente</option>
                        </select>
                        {errors.tipo_ticket && <span className="text-red-500">{errors.tipo_ticket.message}</span>}
                        <br></br>

                        <label htmlFor="cumple_procedimiento"> Cumple procedimiento:</label>
                        <select id="cumple_procedimiento" name="cumple_procedimiento" {...register("cumple_procedimiento", { required: { value: true, message: "Este campo es requerido" } })} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded">
                            <option value="">Seleccionar</option>
                            <option value="Cumple">Cumple</option>
                            <option value="No realiza descartes">No realiza descartes</option>
                            <option value="No sondea motivo de problema">No sondea motivo de problema</option>
                            <option value="Realiza transferencia/derivación incorrecta">Realiza transferencia/derivación incorrecta</option>
                            <option value="No informa sobre transferencia">No informa sobre transferencia</option>
                            <option value="No indica protocolo de atención">No indica protocolo de atención</option>
                            <option value="No explica a usuario para autogestión">No explica a usuario para autogestión</option>
                            <option value="No verifica aplicativo (genera duplicidad">No verifica aplicativo (genera duplicidad)</option>
                        </select>
                        {errors.cumple_procedimiento && <span className="text-red-500">{errors.cumple_procedimiento.message}</span>}
                        <br></br>

                        <label htmlFor="validacion">Validación:</label>
                        <select id="validacion" name="validacion" {...register("validacion", { required: { value: true, message: "Este campo es requerido" } })} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded">
                            <option value="">Seleccionar</option>
                            <option value="Cumple">Cumple</option>
                            <option value="No valida datos">No valida datos</option>
                            <option value="No solicita autorización">No solicita autorización para acceso remoto</option>
                            <option value="Infringe datos personales">Infringe datos personales</option>
                        </select>
                        {errors.validacion && <span className="text-red-500">{errors.validacion.message}</span>}
                        <br></br>

                        <label htmlFor="registro_tickets">Registro de tickets: </label>
                        <select id="registro_tickets" name="registro_tickets" {...register("registro_tickets", { required: { value: true, message: "Este campo es requerido" } })} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded">
                            <option value="">Seleccionar</option>
                            <option value="Cumple">Cumple</option>
                            <option value="No cumple">No cumple</option>
                        </select>
                        {errors.registro_tickets && <span className="text-red-500">{errors.registro_tickets.message}</span>}
                        <br></br>

                        <label htmlFor="respeto_usuario">Respeto al usuario:</label>
                        <select id="respeto_usuario" name="respeto_usuario" {...register("respeto_usuario", { required: { value: true, message: "Este campo es requerido" } })} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded">
                            <option value="">Seleccionar</option>
                            <option value="Cumple">Cumple</option>
                            <option value="Levanta el tono de voz">Levanta el tono de voz</option>
                            <option value="Se muestra ofensivo y/o sarcástico">Se muestra ofensivo y/o sarcástico</option>
                            <option value="Abandona atención">Abandona atención</option>
                            <option value="Corta llamada">Corta llamada</option>
                            <option value="Interrumpe de manera abrupta">Interrumpe de manera abrupta</option>
                            <option value="No contesta llamada oportunamente">No contesta llamada oportunamente</option>
                            <option value="Tutea al usuario">Tutea al usuario</option>
                            <option value="No tiene headset puesto">No tiene headset puesto</option>
                        </select>
                        {errors.respeto_usuario && <span className="text-red-500">{errors.respeto_usuario.message}</span>}
                        <br></br>

                        <label htmlFor="actitud_servicio">Actitud de servicio:</label>
                        <select id="actitud_servicio" name="actitud_servicio" {...register("actitud_servicio", { required: { value: true, message: "Este campo es requerido" } })} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded">
                            <option value="">Seleccionar</option>
                            <option value="Cumple">Cumple</option>
                            <option value="Se muestra impaciente">Se muestra impaciente</option>
                            <option value="Solicita repetir información brindada">Solicita repetir información brindada</option>
                            <option value="Se muestra distraído">Se muestra distraído</option>
                            <option value="No tiene escucha activa">No tiene escucha activa</option>
                            <option value="Transmite desgano">Transmite desgano</option>
                        </select>
                        {errors.actitud_servicio && <span className="text-red-500">{errors.actitud_servicio.message}</span>}
                        <br></br>

                        <label htmlFor="gestion_tiempos"> Gestión de tiempos:</label>
                        <select id="gestion_tiempos" name="gestion_tiempos" {...register("gestion_tiempos", { required: { value: true, message: "Este campo es requerido" } })} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded" >
                            <option value="">Seleccionar</option>
                            <option value="Cumple">Cumple</option>
                            <option value="No explica motivo de espera">No explica motivo de espera</option>
                            <option value="Excede el tiempo solicitado">Excede el tiempo solicitado</option>
                            <option value="Demora en contestar">Demora en contestar la llamada</option>
                        </select>
                        {errors.gestion_tiempos && <span className="text-red-500">{errors.gestion_tiempos.message}</span>}
                        <br></br>

                        <label htmlFor="informacion_brindada">Información brindada: </label>
                        <select id="informacion_brindada" name="informacion_brindada" {...register("informacion_brindada", { required: { value: true, message: "Este campo es requerido" } })} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded">
                            <option value="">Seleccionar</option>
                            <option value="Cumple">Cumple</option>
                            <option value="No cumple">No cumple</option>
                        </select>
                        {errors.informacion_brindada && <span className="text-red-500">{errors.informacion_brindada.message}</span>}
                        <br></br>

                        <label htmlFor="protocolos_imagen">Protocolos/Imagen: </label>
                        <select id="protocolos_imagen" name="protocolos_imagen" {...register("protocolos_imagen", { required: { value: true, message: "Este campo es requerido" } })} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded">
                            <option value="">Seleccionar</option>
                            <option value="Cumple">Cumple</option>
                            <option value="No saluda adecuadamente">No saluda adecuadamente</option>
                            <option value="No se despide adecuadamente">No se despide adecuadamente</option>
                            <option value="Realiza comentario negativo hacia empresa o pares">Realiza comentario negativo hacia empresa o pares</option>
                        </select>
                        {errors.protocolos_imagen && <span className="text-red-500">{errors.protocolos_imagen.message}</span>}
                        <br></br>

                        <label htmlFor="proactividad">Proactividad: </label>
                        <select id="proactividad" name="proactividad" {...register("proactividad", { required: { value: true, message: "Este campo es requerido" } })} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded">
                            <option value="">Seleccionar</option>
                            <option value="Cumple">Cumple</option>
                            <option value="No confirma solicitud adicional">No confirma solicitud adicional</option>
                            <option value="No orienta sobre cuidados">No orienta sobre cuidados</option>
                            <option value="No explica procedimiento realizado (solución)">No explica procedimiento realizado (solución)</option>
                            <option value="No orienta al uso del portal PSS">No orienta al uso del portal PSS</option>
                        </select>
                        {errors.proactividad && <span className="text-red-500">{errors.proactividad.message}</span>}
                        <br></br>

                        <label htmlFor="personalizacion">Personalización: </label>
                        <select id="personalizacion" name="personalizacion" {...register("personalizacion", { required: { value: true, message: "Este campo es requerido" } })} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded">
                            <option value="">Seleccionar</option>
                            <option value="Cumple">Cumple</option>
                            <option value="No personaliza al usuario">No personaliza al usuario</option>
                            <option value="Utiliza nombre o apellido incorrecto">Utiliza nombre o apellido incorrecto</option>
                        </select>
                        {errors.personalizacion && <span className="text-red-500">{errors.personalizacion.message}</span>}
                        <br></br>

                        <label htmlFor="comunicacion">Comunicación: </label>
                        <select id="comunicacion" name="comunicacion" {...register("comunicacion", { required: { value: true, message: "Este campo es requerido" } })} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded">
                            <option value="">Seleccionar</option>
                            <option value="Cumple">Cumple</option>
                            <option value="Utiliza muletillas">Utiliza muletillas</option>
                            <option value="Utiliza diminutivos">Utiliza diminutivos</option>
                            <option value="Emplea tecnicismos">Emplea tecnicismos</option>
                            <option value="Utiliza entonación inadecuada">Utiliza entonación inadecuada</option>
                        </select>
                        {errors.comunicacion && <span className="text-red-500">{errors.comunicacion.message}</span>}
                        <br></br>

                        <label htmlFor="observaciones_evaluador"> Observaciones finales del evaluador: </label>
                        <textarea id="observaciones_evaluador" name="observaciones_evaluador" {...register("observaciones_evaluador", { required: { value: true, message: "Este campo es requerido" } })} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded" />
                        {errors.observaciones_evaluador && <span className="text-red-500">{errors.observaciones_evaluador.message}</span>}
                        <br></br>

                        <label htmlFor="estatus_notificacion"> Estatus Notificación:(dejar en Pendiente) </label>
                        <input type="text" id="estatus_notificacion" value="Pendiente" name="estatus_notificacion" {...register("estatus_notificacion")} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded" />

                        <br></br>

                        <label htmlFor="audio">Importar audio</label>
                        <input type="file" name="audio" {...register('audio')} className="w-full py-2 px-4 mb-4 border border-cyan-300 rounded" />
                        <input type="submit" value="Enviar" className="w-full py-2 px-4  mt-4 bg-cyan-300 text-white rounded cursor-pointer hover:bg-cyan-400" />
                    </form>
                </div>) : (
                <div className=''>
                    <div className="text-2xl ml-12'">Token Expirado</div>
                    {setTimeout(() => {
                        window.location.reload(); // Recargar la página después de 10 segundos
                    }, 5000)}
                </div>
            )}
        </>

    );
}

export default Llamadas;
