import API from "./api-config";

type returnValue = {
    success: boolean,
    message: string,
    data: { 
        accessToken: string,
        refreshToken: string, 
        roles: string[],
    }
}


export default function APICalls (){
//   const {accessToken, refreshToken, logoutAuth, setRefresh} = useAuth();

    const { api } = API();

    const login= async (email:string, password:string):Promise<returnValue> =>{
        // await new Promise( (resolve) => setTimeout(resolve, 5000))

        try{
            const res = await api.post(`/auth/login`, {
             email, password
            }, { withCredentials: true});
            return res.data;
        }catch(err:any){
            if (err.response && err.response.status === 401) {
                return { success: false, message: err.response.data.message, data: { accessToken: "", refreshToken: "", roles: [''] } };
            } else {
                return {success: false, message: err.message, data: {accessToken: "", refreshToken: "", roles: ['']}}
            }
        }
    }
    
    const newRefreshToken= async ():Promise<returnValue> =>{
        try{
            const res = await api.post(`/auth/refresh`, {}, { withCredentials: true });
            return res.data;
        }catch(err:any){
            if (err.response && err.response.status === 401) {
                return { success: false, message: err.response.data.message, data: { accessToken: "", refreshToken: "", roles: [''] } };
            } else {
                return {success: false, message: err.message, data: {accessToken: "", refreshToken: "", roles: ['']}}
            }
        }
    }

    const signUp= async (email:string, username:string, password:string, firstname:string, lastname:string, phone:string, address: string, country: string, dob:string):Promise<returnValue> =>{
        try{
            const res = await api.post(`/auth/signup`, {
             email, username, password, firstname, country, address, lastname, phone, dob
            });
            const data:returnValue = res.data
            return data;
        }catch(err:any){
            if (err.response && err.response.status === 401) {
                return { success: false, message: err.response.data.message, data: { accessToken: "", refreshToken: "", roles: [''] } };
            } else {
                return {success: false, message: err.message, data: {accessToken: "", refreshToken: "", roles: ['']}}
            }
        }
    }




    

    return  { login, signUp, newRefreshToken }

}

