import { useState } from "react";
import Alerta from '../components/Alerta'
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"

const CambiarPassword = () => {

  const { guardarPassword } = useAuth();

  const [ alerta, setAlerta ] = useState({})
  const [password, setPassword] = useState({
    pwd_actual: '',
    pwd_nuevo: ''
  })

  const handleSubmit = async (e) => {
     e.preventDefault();

     console.log();

     if( Object.values(password).some(campo => campo === '') ){
        setAlerta({
          msg: 'Todos los campos obligatorios',
          error: true
        })
        return
     }

     if( password.pwd_nuevo.length < 6 ){
        setAlerta({
          msg: 'Password muy corto',
          error: true
        })
        return;
     }

     const respuesta = await guardarPassword(password)
     setAlerta(respuesta)

  };

  const { msg } = alerta

  return (
    <>
      <AdminNav/>

      <h2 className="font-bold text-3xl text-center mt-10">Cambiar Password</h2>
      <p className="text-xl mt-5 mb-10 text-center"> Modifica tu 
          <span className="text-purple-600 font-bold"> Password</span> 
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          { msg && <Alerta alerta={alerta}/> }
          <form
            onSubmit={handleSubmit}
          >

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600"
              >Password Actual</label>
              <input 
                className="border bg-gray-50 w-full p-2 mt-5" 
                type="password" 
                name="pwd_actual"
                onChange={e => setPassword({
                  ...password,
                  [e.target.name] : e.target.value
                })}
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600"
              >Password Nuevo</label>
              <input 
                className="border bg-gray-50 w-full p-2 mt-5" 
                type="password" 
                name="pwd_nuevo"
                onChange={e => setPassword({
                  ...password,
                  [e.target.name] : e.target.value
                })}
              />
            </div>

            <input 
              type="submit" 
              value="Actualizar password"
              className="bg-purple-700 mt-5 px-10 py-3 rounded-lg font-bold text-white uppercase w-full"
            />

          </form>
        </div>
      </div>

    </>
  )
}

export default CambiarPassword