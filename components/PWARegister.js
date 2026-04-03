"use client";
import { useEffect, useState } from "react";

export default function PWARegister() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBtn, setShowBtn] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSHint, setShowIOSHint] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const standalone = window.matchMedia("(display-mode: standalone)").matches;
    if (ios && !standalone) {
      setIsIOS(true);
      setShowIOSHint(true);
    }
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBtn(true);
    });
    window.addEventListener("appinstalled", () => {
      setShowBtn(false);
    });
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setShowBtn(false);
    setDeferredPrompt(null);
  };

  if (isIOS && showIOSHint) {
    return (
      <div className="fixed bottom-20 left-4 right-4 z-50 bg-gray-800 border border-yellow-400 rounded-2xl p-4 shadow-xl text-sm">
        <button onClick={() => setShowIOSHint(false)} className="absolute top-2 right-3 text-gray-400 text-lg">✕</button>
        <p className="text-white font-bold mb-1">📲 Install App</p>
        <p className="text-gray-300">Tap <span className="text-yellow-400">Share</span> → <span className="text-yellow-400">Add to Home Screen</span></p>
      </div>
    );
  }

  if (!showBtn) return null;

  return (
    <button onClick={handleInstall}
      className="fixed bottom-20 right-4 z-50 bg-yellow-400 text-black font-bold px-5 py-3 rounded-2xl shadow-lg text-sm">
      📲 Install App
    </button>
  );
}