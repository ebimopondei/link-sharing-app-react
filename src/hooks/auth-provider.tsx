import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import useCookie from "./use-cookie";
import { Props } from "../types";
import API from "../api/api-config";
import { loginProps } from "../types/auth";


type AuthContextType = {
    loginAuth: ( { }: loginProps) => void;
    logoutAuth: () => void;
    accessToken: string;
    refreshToken: string;
    setAccessToken: Dispatch<SetStateAction<string>>;
    setRefreshToken: Dispatch<SetStateAction<string>>;
    isLoggedIn:boolean,
    isLoading:boolean,
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
    loginAuth: () => {},
    logoutAuth: () => {},
    accessToken: "",
    refreshToken: "",
    setAccessToken: ()=> {},
    setRefreshToken: ()=> {},
    isLoggedIn: false,
    isLoading: false,
    setIsLoggedIn: ()=>{}
});

export default function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}: Props){

    const { getCookie, setCookie, resetItem} = useCookie();
    const [ accessToken, setAccessToken] = useState<string>("");
    const [ isLoading, setIsLoading] = useState<boolean>(true);
    const [ refreshToken, setRefreshToken] = useState<string>("");
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);


    const { apiPrivate } = API();

    const loginAuth = ({accessToken, refreshToken}:loginProps) => {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setIsLoggedIn(true);
        setCookie('accessToken', JSON.stringify(accessToken) );
        setCookie('refreshToken', JSON.stringify(refreshToken) );
        setCookie('isLoggedIn', JSON.stringify(true) );
        
    }
    
    const logoutAuth = ()=> {
        setIsLoggedIn(false); 
        resetItem("accessToken");
        resetItem("refreshToken");
        resetItem('isLoggedIn');
    }

    useEffect( ()=>{
        async function checkAuth(){
            await apiPrivate('/auth-check')
            .then((res)=>{
                setIsLoggedIn(res.data.isAuthenticated);
                setIsLoading(false)
            })
            .finally( ()=> setIsLoading(false))
        }
        checkAuth();

    },[])


    useEffect(()=>{
        if(getCookie('accessToken')){
            const temp:string =  String(getCookie('accessToken'));
            setAccessToken(temp);
        }
        
        if(getCookie('isLoggedIn')){
            const temp =  String(getCookie('isLoggedIn'));
            const token  = JSON.parse(temp);
            setIsLoggedIn(Boolean(token));
        }

        if(getCookie('refreshToken')){
            const temp =  String(getCookie('refreshToken'));
            setRefreshToken(temp);
        }

        setIsLoading(false)
    },[])

    return(
        <AuthContext.Provider value={{ isLoggedIn, isLoading, setIsLoggedIn, loginAuth, logoutAuth, accessToken, setAccessToken, refreshToken, setRefreshToken}}>
            {children}
        </AuthContext.Provider>
    )

}