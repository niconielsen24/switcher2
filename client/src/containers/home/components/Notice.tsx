import { useState } from "react";

export default function Notice() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed z-99 bg-gray-500/60 h-screen w-screen top-0 left-0 flex items-center justify-center">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-6 text-center border border-gray-700">
        <h2 className="text-2xl font-bold text-red-500">
          🚨 Quick Heads-Up! 🚨
        </h2>
        <p className="mt-4 text-2xl">
          Hey there! Just so you know, **this project is purely for learning and
          fun**—I’m not making money from it, and it’s not an official version
          of the real game.
        </p>
        <p className="mt-2 text-2xl">
          I’m **not affiliated** with the original creators, and they own all
          rights to their game. This is just my way of learning and
          experimenting with coding.
        </p>
        <p className="mt-2 text-2xl">
          {
            "If you're looking for the **real deal**, check out the official game here: "
          }
          <a
            href="https://maldon.com.ar/blog/projects/el-switcher/"
            target="_blank"
            className="text-blue-400 underline hover:text-blue-300"
          >
            {"El Switcher"}
          </a>
          {" by Maldón"}
        </p>
        <button
          onClick={() => setDismissed(true)}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}
