import { queryOptions } from "@tanstack/react-query"
import { PublicUserResponse } from "../../types/user"
import API from "../api-config"

export default function publicApiCall () {
    const { api } = API()

    const getProfileDetails = async ( username: string):Promise<PublicUserResponse> => {

        try {

            const response = await api.get(`/public/users/${username}`)
            return response.data


        }catch(err:any) {
            return { success: false, data:null, message: err.message}
        }
    }

    const getProfileDetailsQueryOptions = (username:string) => {
        return queryOptions( { 
            queryKey: ['public-profile', username],
            queryFn: ()=> getProfileDetails(username)
        } )
    }

    return {

        getProfileDetailsQueryOptions,

    }
}