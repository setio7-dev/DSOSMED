/* eslint-disable @typescript-eslint/no-explicit-any */
import API from '@/server/API';
import { DepositProps } from '@/types';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function useHistoryDepositHooks() {
    const [deposits, setDeposits] = useState<DepositProps[]>([]);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token');

    const fetchHistory = async () => {
        try {
            setLoading(true);

            const res = await API.get('/history/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setDeposits(res.data.data);
        } catch (err: any) {
            console.error(err);

            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: 'Gagal mengambil riwayat deposit',
                confirmButtonColor: '#9333ea',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    return {
        deposits,
        loading,
        fetchHistory,
    };
}
