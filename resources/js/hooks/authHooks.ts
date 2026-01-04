/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { SwalMessage } from "@/utils/SwalMessage";
import API from "@/server/API";

export default function useAuthHooks() {
    type Errors = {
        username?: string;
        password?: string;
    };

    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<any>({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<Errors | any>({});
    const iconData = [
        { icon: CheckCircle, text: 'Proses otomatis 24/7' },
        { icon: CheckCircle, text: 'Harga kompetitif & fleksibel' },
        { icon: CheckCircle, text: 'Support responsif' },
        { icon: CheckCircle, text: '50+ layanan tersedia' }
    ]

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev: any) => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            let response;
            if (isLogin) {
                response = await API.post("/login", {
                    username: formData.username,
                    password: formData.password
                });

                const token = response.data.token;
                const user = response.data.user;
                localStorage.setItem("token", token);

                SwalMessage({
                    title: response.data.message,
                    icon: "success"
                });

                if (user.isAdmin) {
                    setTimeout(() => {
                        window.location.href = "/admin/home"
                    }, 3000);
                } else {
                    setTimeout(() => {
                        window.location.href = "/"
                    }, 3000);
                }
                return;
            }

            response = await API.post("/register", {
                username: formData.username,
                password: formData.password
            });

            SwalMessage({
                title: response.data.message,
                icon: "success"
            });

            setTimeout(() => {
                window.location.href = "/auth"
            }, 3000);
        } catch (error: any) {
            SwalMessage({
                title: error.response.data.message,
                icon: "error"
            })
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({ username: '', password: '', confirmPassword: '' });
        setErrors({});
    };

    return {
        handleChange,
        handleSubmit,
        toggleMode,
        isLogin,
        showPassword,
        setShowPassword,
        formData,
        setIsLogin,
        errors,
        iconData
    }
}
