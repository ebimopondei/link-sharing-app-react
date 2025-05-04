import { useEffect } from 'react';
import useAuth from './auth-provider';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedPage = () => {
    const {isLoading, accessToken } = useAuth();
    const navigate  = useNavigate();


    useEffect(()=>{

        if(!isLoading){
            if(!accessToken){
                
                navigate('/login')
            }
            
        }
        
    }, [ isLoading, accessToken ])

     if(isLoading) {
        return null
     }

    return <Outlet />
}

export default ProtectedPage