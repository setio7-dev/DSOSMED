import API from '@/server/API';
import { CustomerServiceProps } from '@/types'
import { SwalMessage } from '@/utils/SwalMessage';
import React, { useEffect, useState } from 'react'

export default function useCustomerServiceHooks() {
    const [customerServiceData, setCustomerServiceData] = useState<CustomerServiceProps[]>([]);
    const [customerServiceForm, setCustomerServiceForm] = useState({
        name: "",
        desc: "",
        phone: ""
    });
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCustomerService = async() => {
            try {
                const response = await API.get("/customer/customer-service", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setCustomerServiceData(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchCustomerService();
    }, [token]);

    const handleUpdateCustomerService = async() => {
        try {
            const response = await API.put("/admin/customer-service/1", {
                name: customerServiceForm.name,
                desc: customerServiceForm.desc,
                phone: customerServiceForm.phone,
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

    const handleChangeCustomerService = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

            setCustomerServiceForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return {
        customerServiceData,
        handleUpdateCustomerService,
        handleChangeCustomerService,
        customerServiceForm,
        setCustomerServiceForm
    }
}
