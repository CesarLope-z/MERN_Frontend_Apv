
import { useEffect, useState } from "react"
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"

import Alerta from "../components/Alerta"
const editarPerfil = () => {

  const { auth, actualizarPerfil } = useAuth()
  const [ perfil, setPerfil ] = useState({})
  const [ alerta, setAlerta ] = useState({})

  useEffect(() => {

    setPerfil(auth)

  }, [auth])
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    const { nombre, email } = perfil

    if([nombre, email].includes('')){
      setAlerta({
        msg: 'Email y Nombre son obligatorios',
        error: true
      })
      return;
    }

    const resultado = await actualizarPerfil(perfil)
    setAlerta(resultado)

  };

  const { msg } = alerta

  return (
    <>
      <AdminNav/>

      <h2 className="font-bold text-3xl text-center mt-10">Configuracion</h2>
      <p className="text-xl mt-5 mb-10 text-center"> Modifica tu 
          <span className="text-purple-600 font-bold"> Perfil</span> 
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          { msg && <Alerta alerta={alerta}/> }
          <form
            onSubmit={handleSubmit}
          >

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600"
              >nombre</label>
              <input 
                className="border bg-gray-50 w-full p-2 mt-5" 
                type="text" 
                name="nombre" 
                value={perfil.nombre || ''}
                onChange={ e => setPerfil({
                  ...perfil,
                  [e.target.name] : e.target.value
                }) }
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600"
              >email</label>
              <input 
                className="border bg-gray-50 w-full p-2 mt-5" 
                type="text" 
                name="email" 
                value={perfil.email || ''}
                onChange={ e => setPerfil({
                  ...perfil,
                  [e.target.name] : e.target.value
                }) }
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600"
              >telefono</label>
              <input 
                className="border bg-gray-50 w-full p-2 mt-5" 
                type="text" 
                name="telefono" 
                value={perfil.telefono || ''}
                onChange={ e => setPerfil({
                  ...perfil,
                  [e.target.name] : e.target.value
                }) }
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600"
              >Sitio web</label>
              <input 
                className="border bg-gray-50 w-full p-2 mt-5" 
                type="text" 
                name="web" 
                value={perfil.web || ''}
                onChange={ e => setPerfil({
                  ...perfil,
                  [e.target.name] : e.target.value
                }) }
              />
            </div>

            <input 
              type="submit" 
              value="Guardar cambios"
              className="bg-purple-700 mt-5 px-10 py-3 rounded-lg font-bold text-white uppercase w-full"
            />

          </form>
        </div>
      </div>

    </>
  )
}

export default editarPerfil