import { useState } from 'react'
import Formulario from '../components/Formulario'
import ListaPacientes from '../components/ListaPacientes'
const AdminPacientes = () => {
  
  const [ showform, setshowform ] = useState(true)
  

  return (
    <div className='flex flex-col md:flex-row'>
      <button 
        type='button' 
        className='bg-purple-600 md:hidden text-white mb-10 font-bold uppercase mx-10 p-3 rounded-md'  
        onClick={() => setshowform(!showform) }
      >{showform ? 'Ocultar Formulario' : 'Mostrar formulario'}</button>
      <div className={`${ showform ? 'block' : 'hidden' } md:block md:w-1/2 lg:w-2/5`}>
        <Formulario/>
      </div>
      <div className='md:w-1/2 lg:w-3/5'>
        <ListaPacientes/>
      </div>
    </div>
  )
}

export default AdminPacientes 