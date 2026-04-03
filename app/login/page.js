export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🏨</div>
          <h1 className="text-2xl font-extrabold text-white">Hotel Pro</h1>
          <p className="text-gray-400 text-sm mt-1">Hotel Management Software</p>
        </div>
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 flex flex-col gap-4">
          <a href="/api/auth/google"
            className="flex items-center justify-center gap-3 bg-white text-gray-900 font-bold py-3 rounded-xl hover:bg-gray-100 transition">
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.7 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-9 20-20 0-1.3-.1-2.7-.4-4z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 18.9 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4c-7.6 0-14.2 4.1-17.7 10.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5L31.8 33c-2 1.4-4.5 2.2-7.2 2.2-5.2 0-9.6-2.9-11.3-7l-6.6 4.9C9.7 39.8 16.4 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.4-2.5 4.4-4.6 5.8l5.7 5.1C40.4 35.6 44 30.3 44 24c0-1.3-.1-2.7-.4-4z"/>
            </svg>
            Login with Google (Owner)
          </a>
          <div className="relative flex items-center">
            <div className="flex-1 border-t border-gray-700" />
            <span className="px-3 text-gray-500 text-xs">or</span>
            <div className="flex-1 border-t border-gray-700" />
          </div>
          <a href="/login/pin"
            className="flex items-center justify-center gap-2 bg-gray-800 text-white font-bold py-3 rounded-xl hover:bg-gray-700 transition border border-gray-700">
            🔢 PIN Login (Receptionist)
          </a>
        </div>
      </div>
    </main>
  );
}