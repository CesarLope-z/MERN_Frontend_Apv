import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import PacientesContext from "../context/PacientesProvider";

const usePacientes = () => {

    return useContext(PacientesContext)

}
export default usePacientes