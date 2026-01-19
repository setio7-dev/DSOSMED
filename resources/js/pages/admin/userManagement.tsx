/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, User, Shield, Wallet, Eye, EyeOff, X } from 'lucide-react';
import AdminDashboard from '@/components/admin/adminDashboard';

const UserModal = ({ isOpen, onClose, user, mode }: any) => {
    const [formData, setFormData] = useState({
        username: user?.username || '',
        password: '',
        saldo: user?.saldo || '',
        isAdmin: user?.isAdmin || false
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = () => {
        console.log('Submit:', mode, formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/30 border border-gray-700/50 rounded-2xl w-full max-w-md shadow-2xl">
                <div className="bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white">
                            {mode === 'add' ? 'Tambah User Baru' : 'Edit User'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-400" />
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Username
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                placeholder="Masukkan username"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Password {mode === 'edit' && <span className="text-xs text-gray-500">(Kosongkan jika tidak ingin mengubah)</span>}
                        </label>
                        <div className="relative">
                            <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-12 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                placeholder="Masukkan password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Saldo
                        </label>
                        <div className="relative">
                            <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="number"
                                name="saldo"
                                value={formData.saldo}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                placeholder="Masukkan saldo"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between bg-gray-800/30 border border-gray-700/50 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">Admin Access</p>
                                <p className="text-xs text-gray-400">Berikan hak akses admin</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="isAdmin"
                                checked={formData.isAdmin}
                                onChange={handleInputChange}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 bg-gray-700/50 hover:bg-gray-700 text-white rounded-lg transition-all"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium rounded-lg transition-all shadow-lg shadow-purple-500/20"
                        >
                            {mode === 'add' ? 'Tambah' : 'Simpan'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function UserManagement() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [selectedUser, setSelectedUser] = useState(null);

    const users = [
        {
            id: 1,
            username: 'admin',
            saldo: 5000000,
            isAdmin: true,
            created_at: '2024-01-15'
        },
        {
            id: 2,
            username: 'user001',
            saldo: 250000,
            isAdmin: false,
            created_at: '2024-01-16'
        },
        {
            id: 3,
            username: 'johndoe',
            saldo: 1500000,
            isAdmin: false,
            created_at: '2024-01-18'
        },
        {
            id: 4,
            username: 'manager',
            saldo: 3000000,
            isAdmin: true,
            created_at: '2024-01-20'
        },
        {
            id: 5,
            username: 'customer01',
            saldo: 75000,
            isAdmin: false,
            created_at: '2024-01-22'
        }
    ];

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddUser = () => {
        setModalMode('add');
        setSelectedUser(null);
        setIsModalOpen(true);
    };

    const handleEditUser = (user) => {
        setModalMode('edit');
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleDeleteUser = (userId) => {
        console.log('Delete user:', userId);
    };

    const formatRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <AdminDashboard>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-purple-300">Total Users</p>
                            <User className="w-5 h-5 text-purple-400" />
                        </div>
                        <p className="text-3xl font-bold text-white">{users.length}</p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-blue-300">Total Admin</p>
                            <Shield className="w-5 h-5 text-blue-400" />
                        </div>
                        <p className="text-3xl font-bold text-white">{users.filter(u => u.isAdmin).length}</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-green-300">Total Saldo</p>
                            <Wallet className="w-5 h-5 text-green-400" />
                        </div>
                        <p className="text-2xl font-bold text-white">
                            {formatRupiah(users.reduce((sum, user) => sum + user.saldo, 0))}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari username..."
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        />
                    </div>
                    <button
                        onClick={handleAddUser}
                        className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
                    >
                        <Plus className="w-5 h-5" />
                        Tambah User
                    </button>
                </div>

                <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-700/50">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Username</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Saldo</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Role</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Tanggal Dibuat</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700/50">
                                {filteredUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-gray-800/30 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                    {user.username.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">{user.username}</p>
                                                    <p className="text-xs text-gray-400">ID: {user.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Wallet className="w-4 h-4 text-green-400" />
                                                <span className="text-sm font-semibold text-white">{formatRupiah(user.saldo)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.isAdmin ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs font-medium border border-purple-500/30">
                                                    <Shield className="w-3.5 h-3.5" />
                                                    Admin
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-600/20 text-gray-300 rounded-full text-xs font-medium border border-gray-500/30">
                                                    <User className="w-3.5 h-3.5" />
                                                    User
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-300">{formatDate(user.created_at)}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleEditUser(user)}
                                                    className="p-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 rounded-lg transition-all"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="p-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-lg transition-all"
                                                    title="Hapus"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredUsers.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-400">Tidak ada user ditemukan</p>
                        </div>
                    )}
                </div>               
            </div>

            <UserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                user={selectedUser}
                mode={modalMode}
            />
        </AdminDashboard>
    );
}