import { User, UserResponse } from "../../../types/user"
import API from "../../api-config"

export default function profileApiCall () {
    const { apiPrivate } = API()

    const getProfileDetails = async ():Promise<UserResponse> => {

        try {

            const response = await apiPrivate.get('/user/profile', {})
            return response.data


        }catch(err:any) {
            return { success: false, data:null, message: err.message}
        }
    }
    
    const updateProfleDetails = async (userProfile:Partial<User | null>, avatar: File | string) => {
        try {
            const response = await apiPrivate.postForm('/user/profile', {
                ...userProfile, avatar

            })

            return response.data
            
        }catch( err:any ) {
            return { success: false, data:null, message: err.message}
        }
    }

    return {

        getProfileDetails,
        updateProfleDetails

    }
}