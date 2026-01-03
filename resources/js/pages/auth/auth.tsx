import React from 'react';
import { Eye, EyeOff, Zap, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';
import useAuthHooks from '@/hooks/authHooks';

export default function Auth() {
  const { isLogin, showPassword, setShowPassword, toggleMode, handleChange, handleSubmit, setIsLogin, formData, errors } = useAuthHooks();
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
              {[
                { icon: CheckCircle, text: 'Proses otomatis 24/7' },
                { icon: CheckCircle, text: 'Harga kompetitif & fleksibel' },
                { icon: CheckCircle, text: 'Support responsif' },
                { icon: CheckCircle, text: '50+ layanan tersedia' }
              ].map((item, idx) => (
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

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Konfirmasi Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full bg-gray-900/50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-700'
                        } rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none input-focus transition-all`}
                      placeholder="Ulangi password"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1.5 text-sm text-red-400">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-700 bg-gray-900/50 text-purple-600 focus:ring-2 focus:ring-purple-600 focus:ring-offset-0"
                    />
                    <span className="text-sm text-gray-400">Ingat saya</span>
                  </label>
                  <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                    Lupa password?
                  </button>
                </div>
              )}

              <button
                onClick={handleSubmit}
                className="group w-full bg-gradient-to-r from-purple-600 to-purple-800 py-3.5 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                {isLogin ? 'Login Sekarang' : 'Daftar Sekarang'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-800/50 text-gray-400">atau lanjutkan dengan</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center py-3 bg-gray-900/50 border border-gray-700 rounded-xl hover:bg-gray-900 hover:border-purple-500 transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center py-3 bg-gray-900/50 border border-gray-700 rounded-xl hover:bg-gray-900 hover:border-purple-500 transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.37h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center py-3 bg-gray-900/50 border border-gray-700 rounded-xl hover:bg-gray-900 hover:border-purple-500 transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </button>
              </div>

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

          <p className="text-center text-xs text-gray-500 mt-6 px-4">
            Dengan melanjutkan, Anda menyetujui{' '}
            <button className="text-purple-400 hover:text-purple-300">Terms of Service</button>
            {' '}dan{' '}
            <button className="text-purple-400 hover:text-purple-300">Privacy Policy</button>
            {' '}kami
          </p>
        </div>

      </div>
    </div>
  );
}