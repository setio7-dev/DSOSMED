import API from '@/server/API';
import { MedanPediaService } from '@/types'
import { useEffect, useState } from 'react'

export default function useSuntikHooks() {
    const [suntikServiceData, setSuntikServiceData] = useState<MedanPediaService[]>([]);

    useEffect(() => {
        const fetchService = async() => {
            try {
                const response = await API.get("/medanpedia/services");
                setSuntikServiceData(response.data.data);
            } catch (error) {
                console.error(error)
            }
        }

        fetchService();
    }, []);

    return {
        suntikServiceData
    }
}
