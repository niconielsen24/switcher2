import { useState } from "react";
import { motion } from "motion/react";

const tabColors = {
  "create game": "bg-lime-300 border-2",
  search: "bg-fuchsia-300 border-2",
  filter: "bg-purple-300 border-2",
};

export function Buttons({
  handleCreateGame,
}: {
  handleCreateGame: () => void;
}) {
  const [currentTab, setCurrentTab] = useState<
    "create game" | "search" | "filter"
  >("create game");
  const nextTab = () => {
    return currentTab === "create game"
      ? "search"
      : currentTab === "search"
        ? "filter"
        : "filter";
  };
  const prevTab = () => {
    return currentTab === "filter"
      ? "search"
      : currentTab === "search"
        ? "create game"
        : "create game";
  };

  return (
    <div className="m-10 flex flex-row text-slate-800 items-center">
      <div
        className="hover:-translate-x-4 p-3 rounded-full hover:bg-gray-300 hover:cursor-pointer transition"
        onClick={() => setCurrentTab(prevTab())}
      >
        <div className="size-8 border-b-6 border-l-6 border-slate-800 rotate-z-45" />
      </div>
      {["create game", "search", "filter"].map((tab) => (
        <div
          key={tab}
          className="p-4 relative text-slate-800 font-bold text-2xl group"
          onClick={() =>
            setCurrentTab(tab as "create game" | "search" | "filter")
          }
        >
          {tab === "create game" && (
            <button
              className="group-hover:cursor-pointer"
              onClick={handleCreateGame}
            >
              {tab}
            </button>
          )}
          {tab === "search" && <input placeholder={tab} />}
          {tab === "filter" && (
            <select className="group-hover:cursor-pointer">
              <option selected>{tab}</option>
              {[
                "public",
                "private",
                "waiting",
                "active",
                "max. players 2",
                "max. players 3",
                "max. players 4",
              ].map((option) => (
                <option>{option}</option>
              ))}
            </select>
          )}
          {tab === currentTab && (
            <motion.div
              layoutId="background"
              className={`z-[-1] absolute left-0 right-0 top-0 ${tabColors[tab]} h-full rounded-3xl`}
              transition={{ type: "tween", stiffness: 300, damping: 20 }}
            />
          )}
        </div>
      ))}
      <div
        className="hover:translate-x-4 p-3 rounded-full hover:bg-gray-300 hover:cursor-pointer transition"
        onClick={() => setCurrentTab(nextTab())}
      >
        <div className="size-8 border-b-6 border-r-6 border-slate-800 -rotate-z-45" />
      </div>
    </div>
  );
}
