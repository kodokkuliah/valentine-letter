import React, { useState, useRef } from "react";
import musicFile from "./assets/lagu-kita.mp3"; // Pastikan nama file lagu sesuai

// Teks tombol No (Versi Bahasa Indonesia)
const NO_TEXTS = [
  "Yakinnn?",
  "Ah yang bener?",
  "Gak mau ya?",
  "Masih gak mau?",
  "Please deh...",
  "Sedihhh :(",
  "Terakhir ya, pleaseeee?",
];

const MAX_GROWTH = 40; 

export default function App() {
  const [phase, setPhase] = useState("game"); 
  const [noCount, setNoCount] = useState(0);
  const [yesWidth, setYesWidth] = useState(50);
  const [isOpening, setIsOpening] = useState(false);

  // Inisialisasi Audio
  const audioRef = useRef(new Audio(musicFile));

  // Handle klik tombol No
  const handleNoClick = () => {
    const nextCount = noCount + 1;
    setNoCount(nextCount);

    if (nextCount <= NO_TEXTS.length) {
      const growthPerStep = MAX_GROWTH / NO_TEXTS.length;
      setYesWidth(50 + growthPerStep * nextCount);
    } else {
      setYesWidth(100); 
    }
  };

  // Handle klik tombol Yes
  const handleYesClick = () => {
    setPhase("letter");
    createConfetti();

    // Play Music
    if (audioRef.current) {
      audioRef.current.volume = 0.6; 
      audioRef.current.loop = true;  
      audioRef.current.play().catch((e) => console.log("Gagal play audio:", e));
    }

    setTimeout(() => setIsOpening(true), 500);
  };

  const getNoText = () => {
    return noCount === 0
      ? "No"
      : NO_TEXTS[Math.min(noCount - 1, NO_TEXTS.length - 1)];
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center px-4 overflow-hidden relative">
      
      {/* PHASE 1: GAME */}
      {phase === "game" && (
        <div className="mix-blend-multiply flex flex-col items-center w-full max-w-md transition-all duration-500">
          <div class="tenor-gif-embed" data-postid="3437054553925604281" data-share-method="host" data-aspect-ratio="1" data-width="100%"><a href="https://tenor.com/view/gojill-the-meow-please-pleading-plead-gif-3437054553925604281">Gojill The Meow Please Sticker</a>from <a href="https://tenor.com/search/gojill+the+meow-stickers">Gojill The Meow Stickers</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
          {/* <img
            src="https://tenor.com/view/gojill-the-meow-please-pleading-plead-gif-3437054553925604281"
            alt="Cute Cat"
            className="w-48 h-48 rounded-2xl shadow-xl mb-6 object-cover"
          /> */}

          <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Will you be my Valentine?
          </h1>

          <div className="flex w-full h-16 gap-2 relative">
            {/* Yes Button */}
            <button
              onClick={handleYesClick}
              className="bg-red-500 hover:bg-red-600 text-white font-bold text-lg rounded-xl flex items-center justify-center shadow-lg overflow-hidden whitespace-nowrap z-10 transition-all duration-300 ease-out"
              style={{ width: `${yesWidth}%` }}
            >
              Yes
            </button>

            {/* No Button */}
            {yesWidth < 100 && (
              <button
                onClick={handleNoClick}
                className={`
                  bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold rounded-xl flex items-center justify-center shadow-lg px-1 text-center 
                  whitespace-normal leading-none wrap-break-word overflow-hidden transition-all duration-300 ease-out z-20
                  ${noCount >= NO_TEXTS.length - 1 ? "text-[0.6rem]" : "text-xs"}
                `}
                style={{ width: `${100 - yesWidth}%` }}
              >
                {getNoText()}
              </button>
            )}
          </div>
        </div>
      )}

      {/* PHASE 2: LOVE LETTER */}
      {phase === "letter" && (
        <div className="envelope-wrapper flex flex-col items-center transition-opacity duration-1000 mt-12">
          <div className={`envelope ${isOpening ? "open" : ""}`}>
            
            {/* Kertas Surat: Flex Column + Scrollable */}
            <div className="letter text-center rounded-lg border border-gray-200 flex flex-col items-center p-4">
              
              <h2 className="text-lg font-bold text-red-500 mb-2 mt-1 handwriting shrink-0">
                Dear Dila Sayangg,
              </h2>

              {/* Isi Surat Scrollable */}
              <div className="flex-1 w-full overflow-y-auto text-gray-700 text-xs handwriting leading-relaxed px-2 text-center">
                <p>
                  Makasih udah mau jadi Valentine aku. <br /><br />
                  
                  Tombol "No"-nya nyebelin ya? wkwkwk <br />
                  Itu tandanya kamu emang gak punya pilihan lain selain jadi Valentine aku 😋<br/><br/>
                  
                  Selama aku ngoding, benerin <i>error</i> kodingan itu memang susah, tapi lebih susah nahan kangen sama kamu yang jauh disana<br/><br/>
                  
                  Tapi kamu perlu tau meskipun raga kita kepisah jarak, tapi percayalah frekuensi hati aku selalu nyambung ke kamu<br/><br/>
                  
                  Makasih udah hebat menjaga hati disana. Aku tahu ini gak mudah <br />
                  Aku janji bakal terus berusaha jadi yang terbaik buat kamu <br />
                  Tapi aku ga janji bakal berhenti buat nyebelin ke kamu yaa hehe... 😜 <br /><br />
                  
                  Sehat-sehat ya Sayangg di sana! <br /> I Love You! ❤️
                </p>
              </div>

              <div className="mt-2 text-[10px] text-gray-400 font-sans shrink-0">
                Screenshot ini & kirim ke aku
              </div>

            </div>
          </div>
          
          {/* Tombol Mute */}
          <button 
            onClick={() => {
              if (audioRef.current.paused) audioRef.current.play();
              else audioRef.current.pause();
            }}
            className="mt-12 text-white text-xs underline z-50 opacity-50 hover:opacity-100"
          >
            Mute/Play Music
          </button>
        </div>
      )}
    </div>
  );
}

// Confetti Function
function createConfetti() {
  const colors = ["❤️", "🌹", "💌", "✨", "🎀"];
  const interval = setInterval(() => {
    const el = document.createElement("div");
    el.innerText = colors[Math.floor(Math.random() * colors.length)];
    el.style.position = "fixed";
    el.style.left = Math.random() * 100 + "vw";
    el.style.top = "-50px";
    el.style.fontSize = "2rem";
    el.style.transition = "top 4s linear, opacity 3s ease";
    el.style.zIndex = "9999";
    document.body.appendChild(el);
    setTimeout(() => {
      el.style.top = "110vh";
      el.style.opacity = "0";
    }, 100);
    setTimeout(() => el.remove(), 4000);
  }, 200);
  setTimeout(() => clearInterval(interval), 5000);
}