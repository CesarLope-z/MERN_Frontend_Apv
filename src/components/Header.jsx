import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
const Header = () => {
  const { cerrarSesion } = useAuth()
  return (
    <header className="py-10 bg-purple-600">

      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <h1 className=" text-center font-bold text-2xl text-purple-200">Administrador de Pacientes de  
          <span className="text-white"> Veterinaria</span>
        </h1>

        <nav className='flex gap-4 items-center lg:flex-row mt-5 lg:mt-0'>
          <Link to="/admin" className='text-white text-sm uppercase font-bold'>Pacientes</Link>
          <Link to="/admin/perfil" className='text-white text-sm uppercase font-bold'>Perfil</Link>
        </nav>
        <button
          type='button'
          className='text-white text-sm uppercase font-bold'
          onClick={cerrarSesion}
        >Cerrar Sesión</button>

      </div>

    </header>
  )
}

export default Header