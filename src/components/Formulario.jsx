import { useState, useEffect } from "react"
import Alerta from './Alerta'
import usePacientes from "../hooks/usePacientes"

const Formulario = () => {

  const [ id, setId ] = useState('')
  const [ nombre, setNombre ] = useState('')
  const [ propietario, setPropietario ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ fecha, setFecha ] = useState('')
  const [ sintomas, setSintomas ] = useState('')

  const [ alerta, setAlerta ] = useState({})

  const { guardarPacientes, paciente } = usePacientes()

  useEffect(() => {

    if(paciente?.nombre){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(new Date(paciente.fecha).toISOString())
      setId(paciente._id)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])
  

  const handleSubmit = (e) => {
     e.preventDefault()

     if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      setAlerta({
        msg: 'Completa todos los campos',
        error: true
      })
      return;
     }

     
     guardarPacientes({ nombre, propietario, email, fecha, sintomas, id })
     setAlerta({
        msg: "Guardado Correctamente"
     })
     setNombre('')
     setPropietario('')
     setEmail('')
     setFecha('')
     setSintomas('')
     setId('')
  };
  const { msg } = alerta

  return (
    <>
      <p className="text-lg text-center mb-10">
        Agrega tus pacientes y 
        <span className="text-purple-600 font-bold"> Mascotas</span>
      </p>

      <form onSubmit={ handleSubmit } className="bg-white py-10 px-5 mb-10 lg:mb-0 rounded-md shadow-md">
        
        <div className="mb-5">
          <label 
            htmlFor="nombre"
            className="text-gray-700 uppercase font-bold"
          >Nombre Mascota</label>
          <input 
            type="text" 
            id="nombre"
            placeholder="Nombre de la mascota"
            className="rounded-md border-2 w-full p-2 mt-2 placeholder-gray-400"
            value={nombre}
            onChange={e => setNombre(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="propietario"
            className="text-gray-700 uppercase font-bold"
          >Nombre propietario</label>
          <input 
            type="text" 
            id="propietario"
            placeholder="Nombre del propietario"
            className="rounded-md border-2 w-full p-2 mt-2 placeholder-gray-400"
            value={propietario}
            onChange={e => setPropietario(e.target.value)}
            />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="email"
            className="text-gray-700 uppercase font-bold"
          >Email propietario</label>
          <input 
            type="text" 
            id="email"
            placeholder="Email de propietario"
            className="rounded-md border-2 w-full p-2 mt-2 placeholder-gray-400"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="fecha"
            className="text-gray-700 uppercase font-bold"
          >fecha</label>
          <input 
            type="date" 
            id="fecha"
            className="rounded-md border-2 w-full p-2 mt-2 placeholder-gray-400"
            value={fecha}
            onChange={e => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="sintomas"
            className="text-gray-700 uppercase font-bold"
          >Sintomas</label>
          <textarea
            id="sintomas"
            placeholder="Escribe los sintomas"
            className="rounded-md border-2 w-full p-2 mt-2 placeholder-gray-400"
            value={sintomas}
            onChange={e => setSintomas(e.target.value)}
          />
        </div>

        { msg && <Alerta alerta={alerta} /> }

        <input 
          type="submit" 
          className="bg-purple-600 w-full p-3 transition-colors cursor-pointer text-white uppercase font-bold hover:bg-purple-800 "
          value={ id ? 'Actualizar Paciente' : 'Agregar Paciente'}
        />

      </form>



    </>
  )
}

export default Formulario