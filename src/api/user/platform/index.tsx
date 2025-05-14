import API from "../../api-config"

export default function platformApiCall() {
    const { apiPrivate } = API();
    
    const getPlatforms = async () => {
        try {
            const response = await apiPrivate.get('/user/platforms')
            return response.data

        }catch (err: any){
            return { success: false, message: err.message, data: []  }
        }
    }

    return {
        getPlatforms

    }
}