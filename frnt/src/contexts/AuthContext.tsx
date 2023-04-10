import { useState, createContext, useContext} from 'react';
import jwtDecode from 'jwt-decode';
import validator from 'validator';
import { authUserObj } from '../types/myTypes';
import roles from '../libs/roles';
import useBasicFetch from '../hooks/useBasicFetch';

type authContext = {
    auth: authUserObj | null,
    updUserAuth: (accToken:string)=>void,
    resetUserAuth: Function,
    isAuthed: () => boolean,
    isAdmin: () => boolean
}

const AuthContext = createContext<authContext | null>(null);

export const AuthProvider = (props: { children: JSX.Element }) => {
    const [auth, setAuth] = useState<authUserObj | null>(null);

    // Persistent User Login
    useBasicFetch("/auth/refresh", (data)=>{
        updUserAuth(data?.accessToken)
    })

    const updUserAuth = (accToken: string) => {
        if (validator.isJWT(accToken)) {
            setAuth(() => {
                let decoded: any = jwtDecode(accToken);
                if (decoded?.userId) {
                    return {
                        userId: decoded.userId,
                        username: decoded.username,
                        roles: decoded.roles,
                        accessToken: accToken
                    }
                }
                return null
            });
        }
    }

    const resetUserAuth = () => { setAuth(null) };

    const isAuthed = () => auth?.roles?.User === roles.User;
    const isAdmin = () => auth?.roles?.Admin === roles.Admin;

    return (
        <AuthContext.Provider value={{ auth, updUserAuth, resetUserAuth, isAuthed, isAdmin }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext) as authContext;
}