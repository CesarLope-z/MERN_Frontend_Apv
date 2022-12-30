import { createContext, useState, useEffect, Children } from "react";
import clienteAxios from '../config/axios'
import useAuth from '../hooks/useAuth'
const PacientesContext = createContext()

export const PacientesProvider = ({children}) => {
    
    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})
    const { auth } = useAuth();

    useEffect(() => {
      const obtenerPacientes = async () => {
         try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            } 

            const { data } = await clienteAxios('/pacientes', config)
            setPacientes(data);//cambiar a setPacientes

         } catch (error) {
            console.log(error)
         }
      };
      obtenerPacientes()

    }, [auth])

    const guardarPacientes = async (paciente) => {

        const token = localStorage.getItem('token');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
            }
        }

        if(paciente.id){
            
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                
                const pacientesActualizados = pacientes.map( pacienteState => paciente._id === data._id ? data : pacienteState)
                setPacientes(pacientesActualizados)
            } catch (error) {
                console.log(error);
            }
            
        }else{
            
            try {
            
                const { data } = await clienteAxios.post(
                    '/pacientes', paciente, config)

                setPacientes([ data, ...pacientes ])
    
            } catch (error) {
                console.log(error)
            }   

        }
        
    };

    const editar = (paciente) => {

        setPaciente(paciente)
         
    };

    const eliminar = async id => {
        const confirmar = confirm('¿El paciente será eliminado permanentemente, deseas confirmar?')

        if (confirmar) {
            
            try {
                
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)
                const pacientesActualizados = pacientes.filter(pacienteState => pacienteState._id !== id)
                setPacientes(pacientesActualizados)
            } catch (error) {
                
            }

        }

    };

    return(
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPacientes,
                editar,
                paciente,
                eliminar
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
};

export default PacientesContext