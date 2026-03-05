import API from '@/server/API';
import { GuideProps } from '@/types'
import { SwalMessage } from '@/utils/SwalMessage';
import { useEffect, useState } from 'react'

export default function useGuideHooks() {
    const [guideData, setGuideData] = useState<GuideProps | null>(null);
    const [guidesData, setGuidesData] = useState<GuideProps[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const token = localStorage.getItem("token");
    const [guideFormData, setGuideFormData] = useState({
        name: "",
        desc: ""
    }) 

    useEffect(() => {
        const fetchGuide = async() => {
            try {
                const response = await API.get("/admin/guide", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setGuidesData(response.data.data);
            } catch (error) {
                if (error) {
                console.error("Terjadi Kesalahan!")
            };
            }
        }

        const fetchGuideById = async() => {
            try {
                if (!selectedId) return;
                const response = await API.get(`/customer/guide/${selectedId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setGuideData(response.data.data);
            } catch (error) {
                if (error) {
                console.error("Terjadi Kesalahan!")
            };
            }
        }

        fetchGuideById();
        fetchGuide();
    }, [token, selectedId]);

    const handleUpdateGuide = async(type: string) => {
        try {
            const response = await API.put(`/admin/guide/${selectedId}`, {
                name: guideFormData.name,
                desc: guideFormData.desc,
                type
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const message = response.data.message;
            SwalMessage({
                icon: "success",
                title: "Berhasil!",
                text: message
            });

            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            if (error) {
                SwalMessage({
                    icon: "error",
                    title: "Gagal!",
                    text: "Terjadi Kesalahan!"
                })
            }
        }
    }

    const handleChangeGuide = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

            setGuideFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    return {
        guideData,
        setSelectedId,
        handleChangeGuide,
        handleUpdateGuide,
        guideFormData,
        guidesData
    }
}
