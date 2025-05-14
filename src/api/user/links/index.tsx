import { queryOptions } from "@tanstack/react-query";
import { ShareableLinks } from "../../../types/form";
import API from "../../api-config";

export default function linksApiCall(){

    const { apiPrivate } = API();

    const submitLinks = async ( links:Omit<ShareableLinks, 'id'>[] ) => {

        try {
            const response = await apiPrivate.post('/user/links', links)
            return response.data
        }catch(err:any) {
            return { success: false, message: err.message, data: []  }

        }

    }

    const getLinks = async () => {
        try {
            const response = await apiPrivate.get('/user/links')
            return response.data

        }catch (err: any){
            return { success: false, message: err.message, data: []  }
        }
    }

    const getLinksQueryOptions = () => {
        return queryOptions( { 
            queryKey: ['links'],
            
            queryFn: getLinks
        } )
    }

    return { 
        submitLinks,
        getLinksQueryOptions
    }

}