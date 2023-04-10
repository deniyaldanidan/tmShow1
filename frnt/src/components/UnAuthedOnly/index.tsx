import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../../contexts/AuthContext"


const UnAuthedOnly = ()=>{
    const {isAuthed} = useAuth()
    
    return isAuthed() ? <Navigate to="/" /> : <Outlet/>
}

export default UnAuthedOnly;