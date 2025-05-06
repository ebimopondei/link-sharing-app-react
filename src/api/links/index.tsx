import { ShareableLinks } from "../../types/form";
import API from "../api-config";

export default function linksApiCall(){

    const { apiPrivate } = API();

    const submitLinks = async ( { url, platform }:ShareableLinks ) => {
        console.log(url)
        console.log(platform)
        try {
            const response = await apiPrivate.post('/user/links', {
                platform, url
            })
            return response.data
        }catch(err:any) {
            return { success: false, message: err.message, data: []  }

        }

    }

    return { 
        submitLinks
    }

}