/* eslint-disable @typescript-eslint/no-explicit-any */
import API from "@/server/API";
import { UserProps } from "@/types";
import { SwalMessage } from "@/utils/SwalMessage";
import { useEffect, useState } from "react";

export default function useUserHook() {
    const [users, setUsers] = useState<UserProps[]>([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await API.get("/admin/users", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(response.data.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [token]);

    const handleUpdateUserStatus = async(id: number, isActive: boolean) => {
        try {
            await API.put(`/admin/users/${id}`, {
                is_active: isActive
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            SwalMessage({
                icon: "success",
                title: "Berhasil!",
                text: "Status pengguna berhasil diperbarui."
            });

            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error: any) {
            if (error) {
                SwalMessage({
                    icon: "error",
                    title: "Gagal!",
                    text: error.message
                })
            }
        }
    }

    return {
        users,
        handleUpdateUserStatus
    }
}
