export default function ExpiredPage() {
  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <div className="text-5xl mb-4">⏰</div>
        <h1 className="text-2xl font-extrabold text-white mb-2">License Expired</h1>
        <p className="text-gray-400 text-sm mb-6">
          आपका subscription समाप्त हो गया है। दोबारा शुरू करने के लिए संपर्क करें।
        </p>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-3">
          <a
            href="https://wa.me/919996865069?text=Hotel Pro renew करना है"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-500 transition"
          >
            💬 WhatsApp पर Renew करें
          </a>
          <a
            href="tel:+919996865069"
            className="flex items-center justify-center gap-2 bg-gray-800 text-white font-bold py-3 rounded-xl hover:bg-gray-700 transition border border-gray-700"
          >
            📞 9996865069
          </a>
          <a
            href="/login"
            className="text-xs text-gray-500 hover:text-gray-400 transition mt-1"
          >
            ← वापस Login पर जाएँ
          </a>
        </div>
      </div>
    </main>
  );
}