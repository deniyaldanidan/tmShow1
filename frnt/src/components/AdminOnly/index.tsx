import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../../contexts/AuthContext"


const AdminOnly = ()=>{
    const {isAdmin} = useAuth()
    
    return !isAdmin() ? <Navigate to="/" /> : <Outlet/>
}

export default AdminOnly;