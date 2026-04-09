"use client";

const HOTEL_PWA_URL = "https://hotel.nishantsoftwares.in";
const HOTEL_EXE_URL = "https://pub-f773dd480900429baad9123bdff7a15f.r2.dev/Nishant%20Hotel%20Pro%20Setup%200.1.0.exe";

const features = [
  { icon: "🛏️", title: "कमरा प्रबंधन", desc: "सभी कमरों की तत्काल उपलब्धता — सिंगल, डबल, सुइट। एक नज़र में पूरा हाल।" },
  { icon: "📅", title: "बुकिंग और चेक-इन/आउट", desc: "अग्रिम बुकिंग, सीधे आकर चेक-इन, और झटपट चेक-आउट — सब कुछ दो क्लिक में।" },
  { icon: "🧾", title: "बिलिंग और रसीद", desc: "कमरे का किराया, रेस्टोरेंट, धुलाई — सब एक बिल में। जीएसटी-तैयार रसीद छापो।" },
  { icon: "🍽️", title: "रेस्टोरेंट बिलिंग", desc: "होटल के रेस्टोरेंट के ऑर्डर कमरे से जोड़ो। चेकआउट पर अपने आप मिल जाएं।" },
  { icon: "👨‍💼", title: "कर्मचारी प्रबंधन", desc: "हाउसकीपिंग, रिसेप्शन, हिसाब-किताब — हर कर्मचारी का काम देखो।" },
  { icon: "📊", title: "रिपोर्ट और आंकड़े", desc: "रोज़ की भराई, कमाई, महीने का हिसाब — सब एक डैशबोर्ड पर।" },
  { icon: "📴", title: "बिना इंटरनेट चले", desc: "नेट नहीं है तो भी काम नहीं रुकेगा। सारा डेटा डिवाइस पर सुरक्षित।" },
  { icon: "📱", title: "मोबाइल और कंप्यूटर", desc: "मोबाइल पर भी चलाओ, कंप्यूटर पर भी — एक ही सॉफ्टवेयर।" },
];

export default function HotelPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white font-sans flex flex-col">

      {/* Top bar */}
      <div className="bg-amber-500 py-2 px-4 text-center text-sm font-bold text-white flex flex-col sm:flex-row justify-center items-center gap-3">
        <a href="tel:+919996865069" className="hover:underline">📞 9996865069</a>
        <span className="hidden sm:inline">|</span>
        <a href="https://wa.me/919996865069" target="_blank" rel="noopener noreferrer" className="hover:underline">💬 व्हाट्सऐप पर बात करें</a>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="font-extrabold text-white text-lg">🖥️ <span className="text-amber-400">निशांत</span> सॉफ्टवेयर</a>
          <a href="/" className="text-xs text-gray-400 hover:text-white border border-gray-700 px-3 py-1.5 rounded-lg transition">← सभी उत्पाद</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-16 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="text-6xl mb-4">🏨</div>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-3">निशांत होटल प्रो</h1>
        <p className="text-amber-400 text-lg font-bold mb-2">भारतीय होटलों के लिए बना सॉफ्टवेयर</p>
        <p className="text-gray-400 max-w-xl mb-6 text-base leading-relaxed">
          कमरे की बुकिंग से लेकर चेक-आउट तक, बिलिंग से लेकर कर्मचारी प्रबंधन तक —
          सब कुछ एक जगह। हिंदी में, बिना इंटरनेट के भी, और जीएसटी के साथ।
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
          <div className="bg-gray-800 rounded-2xl px-5 py-3 text-center">
            <p className="text-2xl font-extrabold text-pink-400">₹६,९९९</p>
            <p className="text-gray-500 text-xs mt-1">पहले साल</p>
          </div>
          <div className="bg-gray-800 rounded-2xl px-5 py-3 text-center">
            <p className="text-2xl font-extrabold text-green-400">₹२,४९९</p>
            <p className="text-gray-500 text-xs mt-1">नवीनीकरण / साल</p>
          </div>
          <div className="bg-gray-800 rounded-2xl px-5 py-3 text-center">
            <p className="text-2xl font-extrabold text-blue-400">मुफ्त</p>
            <p className="text-gray-500 text-xs mt-1">डेमो उपलब्ध</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={HOTEL_EXE_URL}
            className="inline-block bg-pink-600 hover:bg-pink-500 text-white font-bold text-lg px-8 py-3 rounded-2xl shadow-lg transition"
          >
            🖥️ Windows पर Download करें (.exe)
          </a>
          <div className="flex flex-col items-center">
            <a
              href={HOTEL_PWA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-500 text-white font-bold text-lg px-8 py-3 rounded-2xl shadow-lg transition"
            >
              📱 Android पर Install करें
            </a>
            <p className="text-xs mt-1 text-gray-500">👉 Chrome menu ⋮ → Add to Home Screen</p>
          </div>
        </div>
        <p className="text-gray-600 text-xs mt-3">Windows 10 / 11 पर चलेगा • ७ दिन मुफ्त में आज़माएं</p>
      </section>

      {/* Features */}
      <section className="px-4 py-14 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-extrabold text-center text-white mb-2">क्या-क्या मिलेगा?</h2>
          <p className="text-center text-gray-500 text-base mb-10">होटल प्रो की सभी खूबियाँ</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 hover:border-pink-500/40 rounded-2xl p-5 transition">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-white text-base mb-1">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Nishant */}
      <section className="px-4 py-14 bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-extrabold text-white mb-2">निशांत होटल प्रो क्यों?</h2>
          <p className="text-gray-500 text-base mb-10">बाकी होटल सॉफ्टवेयर से बेहतर क्यों है</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-left">
            {[
              { icon: "💸", title: "सबसे सस्ता", desc: "बाज़ार के बाकी होटल सॉफ्टवेयर से कई गुना सस्ता — छोटे होटलों के बजट में।" },
              { icon: "🇮🇳", title: "भारत के लिए बना", desc: "जीएसटी रसीद, हिंदी में इस्तेमाल, भारतीय भुगतान — सब तैयार।" },
              { icon: "📞", title: "सीधा सम्पर्क", desc: "कोई आईवीआर नहीं — व्हाट्सऐप पर सीधे बनाने वाले से बात करो।" },
            ].map((w, i) => (
              <div key={i} className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
                <div className="text-3xl mb-2">{w.icon}</div>
                <h3 className="font-bold text-white text-base mb-1">{w.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="px-4 py-14 bg-gray-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-center text-white mb-2">कैसे इस्तेमाल करें?</h2>
          <p className="text-center text-gray-500 text-base mb-10">तीन आसान कदम</p>
          <div className="flex flex-col gap-5">
            {[
              { step: "१", title: "डाउनलोड करें", desc: "ऊपर दिए बटन से सॉफ्टवेयर डाउनलोड करें। फ़ाइल का नाम होगा — Nishant Hotel Pro Setup.exe" },
              { step: "२", title: "इंस्टॉल करें", desc: "फ़ाइल पर दो बार क्लिक करें और Next → Install → Finish दबाते जाएं। कुछ ही मिनट में इंस्टॉल हो जाएगा।" },
              { step: "३", title: "शुरू करें", desc: "डेस्कटॉप पर बना आइकन खोलें। पहली बार में होटल का नाम और अपना नंबर डालें — बस हो गया।" },
            ].map((s, i) => (
              <div key={i} className="flex gap-4 bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center font-extrabold text-white text-lg flex-shrink-0">{s.step}</div>
                <div>
                  <h3 className="font-bold text-white text-base mb-1">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Warning — Hindi */}
      <section className="px-4 py-8 bg-gray-900 border-y border-gray-800">
        <div className="max-w-3xl mx-auto bg-amber-950/40 border border-amber-600/30 rounded-2xl p-6">
          <p className="font-extrabold text-amber-400 text-base mb-3">⚠️ इंस्टॉल करते समय यह संदेश आ सकता है — घबराएं नहीं</p>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            विंडोज़ में <strong className="text-white">स्मार्ट ऐप कंट्रोल</strong> नाम की एक सुरक्षा है जो नए सॉफ्टवेयर को रोकती है।
            यह सॉफ्टवेयर पूरी तरह सुरक्षित है — बस नीचे दिए तरीके से इंस्टॉल करें।
          </p>
          <p className="text-white font-bold text-sm mb-3">यह करें:</p>
          <ol className="text-gray-300 text-sm leading-loose list-none space-y-1">
            <li>१. स्टार्ट बटन में <strong className="text-white">Windows Security</strong> खोजें और खोलें</li>
            <li>२. <strong className="text-white">App &amp; browser control</strong> पर क्लिक करें</li>
            <li>३. <strong className="text-white">Smart App Control</strong> को <strong className="text-white">बंद (Off)</strong> करें</li>
            <li>४. अब सॉफ्टवेयर फिर से इंस्टॉल करें</li>
            <li>५. इंस्टॉल होने के बाद Smart App Control वापस चालू कर सकते हैं</li>
          </ol>
          <p className="text-gray-500 text-xs mt-4">अगर फिर भी दिक्कत हो तो व्हाट्सऐप पर संपर्क करें — हम मदद करेंगे।</p>
        </div>
      </section>

      {/* Installation Warning — English */}
      <section className="px-4 py-8 bg-gray-950 border-b border-gray-800">
        <div className="max-w-3xl mx-auto bg-blue-950/30 border border-blue-600/20 rounded-2xl p-6">
          <p className="font-extrabold text-blue-400 text-base mb-3">⚠️ Windows Installation Warning (English)</p>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Windows 11 has a security feature called <strong className="text-white">Smart App Control</strong> that may block newly downloaded software.
            This software is completely safe. Follow these steps if you see a warning:
          </p>
          <ol className="text-gray-300 text-sm leading-loose list-none space-y-1">
            <li>1. Search for <strong className="text-white">Windows Security</strong> in the Start menu and open it</li>
            <li>2. Click on <strong className="text-white">App &amp; browser control</strong></li>
            <li>3. Turn <strong className="text-white">Smart App Control OFF</strong></li>
            <li>4. Run the installer again</li>
            <li>5. You can turn Smart App Control back ON after installation</li>
          </ol>
          <p className="text-gray-500 text-xs mt-4">If the issue persists, contact us on WhatsApp — we will help you install it remotely.</p>
        </div>
      </section>

      {/* User Manual */}
      <section className="px-4 py-14 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-extrabold text-center text-white mb-2">📖 उपयोगकर्ता पुस्तिका</h2>
          <p className="text-center text-gray-500 text-base mb-10">सॉफ्टवेयर के हर हिस्से को समझें — आसान भाषा में</p>
          <div className="space-y-6">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
              <h3 className="font-extrabold text-pink-400 text-lg mb-3">१. पहली बार सेटअप</h3>
              <ol className="text-gray-300 text-sm leading-loose space-y-2 list-none">
                <li>• सॉफ्टवेयर खोलने पर सबसे पहले होटल का नाम, पता और फ़ोन नंबर डालें।</li>
                <li>• जीएसटी नंबर है तो वह भी डालें — रसीद पर अपने आप आएगा।</li>
                <li>• कमरों की संख्या और प्रकार (सिंगल, डबल, सुइट) सेट करें।</li>
                <li>• हर कमरे का किराया अलग-अलग डालें।</li>
              </ol>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
              <h3 className="font-extrabold text-pink-400 text-lg mb-3">२. कमरा बुकिंग और चेक-इन</h3>
              <ol className="text-gray-300 text-sm leading-loose space-y-2 list-none">
                <li>• नई बुकिंग — मेनू में "बुकिंग" पर जाएं, मेहमान का नाम, फ़ोन, आने की तारीख और कमरा चुनें।</li>
                <li>• अग्रिम बुकिंग — भविष्य की तारीख चुनकर पहले से बुक करें।</li>
                <li>• चेक-इन — मेहमान आने पर उनकी बुकिंग खोलें और "चेक-इन करें" दबाएं।</li>
                <li>• आधार/पहचान पत्र का फ़ोटो भी जोड़ सकते हैं।</li>
              </ol>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
              <h3 className="font-extrabold text-pink-400 text-lg mb-3">३. चेक-आउट और बिलिंग</h3>
              <ol className="text-gray-300 text-sm leading-loose space-y-2 list-none">
                <li>• मेहमान के कमरे पर जाएं और "चेक-आउट" दबाएं।</li>
                <li>• कमरे का किराया, रेस्टोरेंट के बिल अपने आप जुड़ जाएंगे।</li>
                <li>• जीएसटी अपने आप जुड़ेगा।</li>
                <li>• रसीद प्रिंटर से या PDF बनाकर व्हाट्सऐप पर भेजें।</li>
                <li>• नकद, UPI, कार्ड — जो भुगतान आए वह दर्ज करें।</li>
              </ol>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
              <h3 className="font-extrabold text-pink-400 text-lg mb-3">४. रेस्टोरेंट बिलिंग</h3>
              <ol className="text-gray-300 text-sm leading-loose space-y-2 list-none">
                <li>• "रेस्टोरेंट" मेनू में जाएं और नया ऑर्डर बनाएं।</li>
                <li>• ऑर्डर किसी कमरे से जोड़ सकते हैं — चेक-आउट पर बिल में मिल जाएगा।</li>
                <li>• बाहरी ग्राहक के लिए अलग बिल बना सकते हैं।</li>
              </ol>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
              <h3 className="font-extrabold text-pink-400 text-lg mb-3">५. कर्मचारी प्रबंधन</h3>
              <ol className="text-gray-300 text-sm leading-loose space-y-2 list-none">
                <li>• "कर्मचारी" मेनू में नाम, पद और वेतन दर्ज करें।</li>
                <li>• रोज़ की हाज़िरी लगाएं — महीने के अंत में वेतन अपने आप निकलेगा।</li>
                <li>• हाउसकीपिंग को कमरे असाइन करें।</li>
              </ol>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
              <h3 className="font-extrabold text-pink-400 text-lg mb-3">६. रिपोर्ट और आंकड़े</h3>
              <ol className="text-gray-300 text-sm leading-loose space-y-2 list-none">
                <li>• आज की रिपोर्ट — कितने कमरे भरे हैं, कितनी कमाई हुई।</li>
                <li>• महीने की रिपोर्ट — पूरे महीने का हिसाब एक जगह।</li>
                <li>• सभी रिपोर्ट PDF में डाउनलोड कर सकते हैं।</li>
              </ol>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
              <h3 className="font-extrabold text-pink-400 text-lg mb-3">७. डेटा बैकअप</h3>
              <ol className="text-gray-300 text-sm leading-loose space-y-2 list-none">
                <li>• सेटिंग में "बैकअप लें" दबाएं — एक फ़ाइल बन जाएगी।</li>
                <li>• पेनड्राइव या Google Drive में सुरक्षित रखें।</li>
                <li>• कंप्यूटर बदलने पर "बैकअप से पुनः स्थापित करें" से डेटा वापस आएगा।</li>
                <li>• हर हफ्ते बैकअप लेने की आदत बनाएं।</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-14 bg-gray-900 text-center">
        <h2 className="text-2xl font-extrabold text-white mb-3">अभी शुरू करें — मुफ्त में आज़माएं</h2>
        <p className="text-gray-400 text-base mb-8 max-w-lg mx-auto">७ दिन बिल्कुल मुफ्त। कोई क्रेडिट कार्ड नहीं। पसंद आए तो खरीदें।</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={HOTEL_EXE_URL}
            className="bg-pink-600 hover:bg-pink-500 text-white font-bold px-8 py-3 rounded-2xl text-base transition"
          >
            ⬇️ डाउनलोड करें — विंडोज़
          </a>
          <a
            href="https://wa.me/919996865069"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-700 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-2xl text-base transition"
          >
            💬 डेमो देखें — व्हाट्सऐप
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-6 px-4 text-center text-xs text-gray-500 mt-auto">
        <p>कमता प्रसाद तिवारी, तिवारी भवन, ग्राम गहरापुर, पोस्ट पुअरीकलाँ-221202, वाराणसी, उत्तर प्रदेश, भारत</p>
        <p className="mt-1">© 2026 Nishant Softwaress — सर्वाधिकार सुरक्षित</p>
      </footer>

    </main>
  );
}