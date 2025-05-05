import { useEffect } from 'react';
import useAuth from './auth-provider';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedPage = () => {
    const {isLoading, token } = useAuth();
    const navigate  = useNavigate();


    useEffect(()=>{

        if(!isLoading){
            if(!token){
                
                navigate('/login')
            }
            
        }
        
    }, [ isLoading, token ])

     if(isLoading) {
        return null
     }

    return <Outlet />
}

export default ProtectedPage