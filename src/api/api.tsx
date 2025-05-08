import API from "./api-config";

type returnValue = {
    success: boolean,
    message: string,
    data: { 
        token: string,
        refreshToken: string, 
        roles: string[],
    }
}


export default function APICalls (){
//   const {token, refreshToken, logoutAuth, setRefresh} = useAuth();

    const { api } = API();

    const login= async (email:string, password:string):Promise<returnValue> =>{
        const res = await api.post(`/auth/login`, { email, password } );
        return res.data;
    }
    
    const newRefreshToken= async ():Promise<returnValue> =>{
        try{
            const res = await api.post(`/auth/refresh`, {}, { withCredentials: true });
            return res.data;
        }catch(err:any){
            if (err.response) {
                return { success: false, message: err.response.data.message, data: { token: "", refreshToken: "", roles: [''] } };
            } else {
                return {success: false, message: err.message, data: {token: "", refreshToken: "", roles: ['']}}
            }
        }
    }

    const signUp= async (email:string, password:string ):Promise<returnValue> =>{
        try{
            const res = await api.post(`/auth/signup`, {
             email, password
            }
        );
            const data:returnValue = res.data
            return data;
        }catch(err:any){
            if (err.response) {
                return { success: false, message: err.response.data.message, data: { token: "", refreshToken: "", roles: [''] } };
            } else {
                return {success: false, message: err.message, data: {token: "", refreshToken: "", roles: ['']}}
            }
        }
    }




    

    return  { login, signUp, newRefreshToken }

}

