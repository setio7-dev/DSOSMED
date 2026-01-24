export default function SpinnerLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/70 z-50 w-full h-screen">
      <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-purple-700 border-b-purple-500 animate-spin"></div>
      <p className="mt-4 text-white font-medium animate-pulse">Memuat...</p>
    </div>
  );
}