import { basicApi } from "../api/api";
import useAuth from "../contexts/AuthContext"



export default function useLogout (){
    const {resetUserAuth} = useAuth();
    
    return async ()=>{
        try {
            await basicApi.get("/auth/logout", {withCredentials: true})
        } catch (error) {
            console.log(error)
        } finally{
            resetUserAuth()
        }
    }
}