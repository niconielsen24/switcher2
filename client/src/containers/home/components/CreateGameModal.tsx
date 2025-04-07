import { AnimatePresence, motion } from "motion/react";
import { ButtonGreen, ButtonRed } from "../../../components/Buttons";
import { useState } from "react";
import { CreateRoomModalProps } from "../../../types/types_home";

export default function CreateRoomModal({
  handleCreateGame,
  username,
  closeModal,
}: CreateRoomModalProps) {
  const [playerCount, setPayerCount] = useState<number>(2);
  const [selected, setSelected] = useState<"public" | "private">("public");

  const switchSelection = () => {
    if (selected === "public") {
      setSelected("private");
      return;
    }
    if (selected === "private") {
      setSelected("public");
      return;
    }
  };

  return (
    <motion.div
      className="z-99 flex items-center justify-center left-0 top-0 fixed backdrop-blur-sm w-screen h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col w-150 rounded-4xl bg-gray-200 border-2 border-slate-800">
        <div className="flex flex-row m-4">
          <p className="text-2xl text-slate-800 font-bold m-4 w-1/2">
            {"Game Name"}
          </p>
          <input
            className="w-1/2 bg-gray-300 rounded-full pl-5 text-black text-xl"
            placeholder="game name"
          />
        </div>
        <div className="flex flex-row m-4">
          <p className="text-2xl text-slate-800 font-bold m-4 w-1/2">
            {"Max Players"}
          </p>
          <div className="w-1/2 flex flex-row items-center justify-around">
            <div
              className="size-5 relative border-l-5 border-b-5 border-slate-800 rotate-z-45 hover:cursor-pointer"
              onClick={() =>
                setPayerCount((prev) => (prev == 2 ? 2 : prev - 1))
              }
            />
            <AnimatePresence mode="wait">
              <motion.p
                layoutId="counter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                key={playerCount}
                className="absolute text-slate-800 text-3xl font-bold ml-10 mr-10 "
              >
                {playerCount}
              </motion.p>
            </AnimatePresence>
            <div
              className="size-5 border-r-5 border-b-5 border-slate-800 -rotate-z-45 hover:cursor-pointer"
              onClick={() =>
                setPayerCount((prev) => (prev == 4 ? 4 : prev + 1))
              }
            />
          </div>
        </div>
        <div className="flex flex-row m-4">
          <p className="text-2xl text-slate-800 font-bold m-4 w-1/2">
            {"Private"}
          </p>
          <div className="w-1/2 flex items-center justify-center">
            <p className="text-slate-800 text-3xl font-bold m-4">no</p>
            <div
              className="bg-gray-400 relative w-30 h-15 inset-shadow-sm inset-shadow-gray-600 rounded-full flex items-center justify-between"
              onClick={() => switchSelection()}
            >
              {selected === "public" && (
                <motion.div
                  layoutId="switch"
                  className="absolute size-13 left-1 bg-gray-200 rounded-full"
                ></motion.div>
              )}
              {selected === "private" && (
                <motion.div
                  layoutId="switch"
                  className="absolute size-13 right-1 bg-gray-200 rounded-full"
                ></motion.div>
              )}
            </div>
            <p className="text-slate-800 text-3xl font-bold m-4">yes</p>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {selected === "private" && (
            <motion.div
              className="text-slate-800 flex flex-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: "linear" }}
            >
              <p className="text-slate-800 text-2xl font-bold m-4 w-1/2">
                {"Password"}
              </p>
              <input
                type="text"
                placeholder="password"
                className="w-1/2 bg-gray-300 rounded-full pl-5 text-black text-xl mr-4"
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex flex-row justify-center">
          <ButtonGreen
            text="create"
            onClick={() => handleCreateGame(username)}
          />
          <ButtonRed text="close" onClick={() => closeModal()} />
        </div>
      </div>
    </motion.div>
  );
}
