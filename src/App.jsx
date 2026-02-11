import React, { useState } from "react";

// Different text messages for the "No" button
const NO_TEXTS = [
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Don't do it!",
  "Last chance!",
];

const MAX_GROWTH = 40; // maximum button growth percentage

export default function App() {
  const [phase, setPhase] = useState("game"); // either 'game' or 'letter'
  const [noCount, setNoCount] = useState(0);
  const [yesWidth, setYesWidth] = useState(50);
  const [isOpening, setIsOpening] = useState(false);

  // Handle when user clicks No button
  const handleNoClick = () => {
    const nextCount = noCount + 1;
    setNoCount(nextCount);

    // make Yes button bigger each time No is clicked
    if (nextCount <= NO_TEXTS.length) {
      const growthPerStep = MAX_GROWTH / NO_TEXTS.length;
      setYesWidth(50 + growthPerStep * nextCount);
    } else {
      setYesWidth(100); // max out at 100%
    }
  };

  // Handle when user finally clicks Yes
  const handleYesClick = () => {
    setPhase("letter");
    createConfetti();
    // wait a bit before opening the envelope animation
    setTimeout(() => setIsOpening(true), 500);
  };

  // Figure out what text to show on No button
  const getNoText = () => {
    // If never clicked yet (0), just show "No"
    // Otherwise grab from the array (subtract 1 for index)
    return noCount === 0
      ? "No"
      : NO_TEXTS[Math.min(noCount - 1, NO_TEXTS.length - 1)];
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center px-4 overflow-hidden relative">
      {/* PHASE 1: The Game Part */}
      {phase === "game" && (
        <div className="flex flex-col items-center w-full max-w-md transition-all duration-500">
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpwaXF4ZzRndmN5bmZ5bmZ5bmZ5bmZ5bmZ5bmZ5bmZ5bmZ5JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/c76IJLufpN9Sg/giphy.gif"
            alt="Cute Cat"
            className="w-48 h-48 rounded-2xl shadow-xl mb-6 object-cover"
          />

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

            {/* No Button (disappears when Yes reaches 100%) */}
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

      {/* PHASE 2: Love Letter */}
      {phase === "letter" && (
        <div className="envelope-wrapper flex flex-col items-center transition-opacity duration-1000 mt-12">
          <div className={`envelope ${isOpening ? "open" : ""}`}>
            <div className="letter text-center rounded-lg border border-gray-200">
              <h2 className="text-xl font-bold text-red-500 mb-2 mt-4 handwriting">
                Dear Sayangg,
              </h2>
              <p className="text-gray-700 text-sm handwriting text-lg">
                Makasih udah mau jadi Valentine aku. <br />
                <br />
                Aku tau tombol "No"-nya nyebelin, tapi percayalah aku lebih
                nyebelin 😜.
                <br />
                <br />I Love You! ❤️
              </p>
              <div className="mt-auto mb-4 text-xs text-gray-400 font-sans">
                Screenshot ini & kirim ke aku
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Confetti animation function
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
