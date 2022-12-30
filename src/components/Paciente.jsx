import usePacientes from '../hooks/usePacientes'

const Paciente = ({ paciente }) => {
  
    const { editar, eliminar } = usePacientes()
    const { email, fecha, nombre, propietario, sintomas, _id } = paciente
  
    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es-MX', {dateStyle: 'long'}).format(nuevaFecha)
    }

    return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
        <p className="font-bold uppercase text-purple-500"> Nombre:
            <span className="font-normal normal-case text-black">{nombre}</span>
        </p>  
        <p className="font-bold uppercase text-purple-500"> propietario:
            <span className="font-normal normal-case text-black">{propietario}</span>
        </p>  
        <p className="font-bold uppercase text-purple-500"> email:
            <span className="font-normal normal-case text-black">{email}</span>
        </p>  
        <p className="font-bold uppercase text-purple-500"> fecha:
            <span className="font-normal normal-case text-black">{formatearFecha(fecha)}</span>
        </p>  
        <p className="font-bold uppercase text-purple-500"> sintomas:
            <span className="font-normal normal-case text-black">{sintomas}</span>
        </p>     

        <div className="flex justify-between my-5">
            <button
                onClick={() => editar(paciente)}
                type="button"
                className="py-2 px-10 font-bold rounded-lg bg-purple-600 text-white hover:bg-purple-800 uppercase"
            >Editar</button>

            <button
                onClick={() => eliminar(_id)}
                type="button"
                className="py-2 px-10 font-bold rounded-lg bg-red-600 text-white hover:bg-red-800 uppercase"
            >Eliminar</button>
        </div>

    </div>
  )
}

export default Paciente