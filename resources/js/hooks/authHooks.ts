/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export default function useAuthHooks() {
    type Errors = {
        username?: string;
        password?: string;
        confirmPassword?: string;
    };

    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<any>({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<Errors | any>({});

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev: any) => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: Errors = {}; // <-- pakai tipe Errors
        if (!formData.username.trim()) {
            newErrors.username = 'Username harus diisi';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username minimal 3 karakter';
        }

        if (!formData.password) {
            newErrors.password = 'Password harus diisi';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password minimal 6 karakter';
        }

        if (!isLogin) {
            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Konfirmasi password harus diisi';
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Password tidak cocok';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted:', formData);
            alert(isLogin ? 'Login berhasil!' : 'Registrasi berhasil!');
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
        errors
    }
}
