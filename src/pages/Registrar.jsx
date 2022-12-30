import React from 'react'
import clienteAxios from '../config/axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'

const Registrar = () => {

  const [ nombre, setNombre ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ repetir, setRepetir ] = useState('')

  const [ alerta, setAlerta ] = useState({})

  const handleSubmit = async e => {
    e.preventDefault();

    if([nombre, email, password, repetir].includes('')){
      setAlerta({ msg: 'Hay campos vacios', error: true })
      return;
    }
    if(password !== repetir){
      setAlerta({ msg: 'Contrasenas diferentes', error: true })
      return;
    }
    if(password.length < 7){
      setAlerta({ msg: 'Password muy corto', error: true })
      return;
    }

    setAlerta({})

    //usuario en la api

    try {
      
      await clienteAxios.post('/veterinarios', { nombre, email, password })
      setAlerta({
        msg: 'Creado correctamente , Revisa tu Email',
        error: false
      })


    } catch (error) {
      console.log(error.response.data.msg);
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }

  }

  const { msg } = alerta

  return (
    <>
      <div>
        <h1 
          className="text-indigo-600 font-black text-6xl">
            Crea tu Cuenta y Administra tus 
            <span className="text-black "> pacientes</span> 
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta
          alerta={alerta}
        />}
          <form
            onSubmit={handleSubmit}
          >
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Nombre
              </label>
              <input 
                type="text" 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                placeholder="Ingresa tu nombre"
                value={nombre}
                onChange={ e => setNombre(e.target.value) }
                />
                
            </div>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                E-mail
              </label>
              <input 
                type="email" 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                placeholder="E-mail de registro"
                value={email}
                onChange={ e => setEmail(e.target.value) }
                />
                
            </div>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Password
              </label>
              <input 
                type="password" 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                placeholder="Password"
                value={password}
                onChange={ e => setPassword(e.target.value) }
                />
                
            </div>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Repetir password
              </label>
              <input 
                type="password" 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                placeholder="Repite tu password"
                value={repetir}
                onChange={ e => setRepetir(e.target.value) }
                />
                
            </div>
            {/* 517 */}
            <input 
            type="submit" 
            value="Registrarme" 
            className="bg-indigo-700 w-full p-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            />

          </form>
          <nav className="mt-10">
              <Link 
                className="block text-center my-5 text-gray-500"
                to="/">¿Ya posees una cuenta? Inicia Sesión
              </Link>
            </nav>
        </div>
    </>
  )
}

export default Registrar