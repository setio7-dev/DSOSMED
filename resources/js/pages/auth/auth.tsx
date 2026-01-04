import React from 'react';
import { Eye, EyeOff, Zap, Lock, User, ArrowRight } from 'lucide-react';
import useAuthHooks from '@/hooks/authHooks';

export default function Auth() {
  const { isLogin, showPassword, setShowPassword, toggleMode, handleChange, handleSubmit, setIsLogin, formData, errors, iconData } = useAuthHooks();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white flex items-center justify-center p-4">
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      <div className="relative w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        <div className="hidden lg:block animate-slideIn">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center">
                <Zap className="w-8 h-8" />
              </div>
              <span className="text-3xl font-bold">DSOSMED</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Solusi Terlengkap
              </span>
              <br />
              Nokos & Suntik Sosmed
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              Bergabunglah dengan ribuan reseller sukses yang sudah mempercayai platform kami
            </p>

            <div className="space-y-4 pt-4">
              {iconData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <item.icon className="w-6 h-6 text-purple-400 flex-shrink-0" />
                  <span className="text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="animate-fadeIn">
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8 md:p-10 shadow-2xl">

            <div className="lg:hidden flex items-center justify-center space-x-2 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center">
                <Zap className="w-7 h-7" />
              </div>
              <span className="text-2xl font-bold">DSOSMED</span>
            </div>

            <div className="flex gap-2 bg-gray-900/50 p-1.5 rounded-xl mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${isLogin
                    ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                  }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${!isLogin
                    ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                  }`}
              >
                Register
              </button>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {isLogin ? 'Selamat Datang Kembali!' : 'Buat Akun Baru'}
              </h2>
              <p className="text-gray-400">
                {isLogin
                  ? 'Masukkan kredensial Anda untuk melanjutkan'
                  : 'Isi data di bawah untuk memulai'}
              </p>
            </div>

            <div className="space-y-5">

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full bg-gray-900/50 border ${errors.username ? 'border-red-500' : 'border-gray-700'
                      } rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none input-focus transition-all`}
                    placeholder="Masukkan username"
                  />
                </div>
                {errors.username && (
                  <p className="mt-1.5 text-sm text-red-400">{errors.username}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full bg-gray-900/50 border ${errors.password ? 'border-red-500' : 'border-gray-700'
                      } rounded-xl pl-12 pr-12 py-3.5 text-white placeholder-gray-500 focus:outline-none input-focus transition-all`}
                    placeholder="Masukkan password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-sm text-red-400">{errors.password}</p>
                )}
              </div>              

              <button
                onClick={handleSubmit}
                className="group w-full bg-gradient-to-r from-purple-600 to-purple-800 py-3.5 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                {isLogin ? 'Login Sekarang' : 'Daftar Sekarang'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>                          
              <p className="text-center text-sm text-gray-400 mt-6">
                {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  {isLogin ? 'Daftar sekarang' : 'Login di sini'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}