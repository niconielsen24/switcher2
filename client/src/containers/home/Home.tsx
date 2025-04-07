import { createGame } from "../../services/apiCalls";
import Notice from "./components/Notice";
import { Buttons } from "./components/HomeButtons";
import { useUserStore } from "../../store/store";
import { useState } from "react";
import CreateRoomModal from "./components/CreateGameModal";
import Title from "../../components/Title";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Home() {
  /*HOOKS*/
  const [createRoomModal, setCreateRoom] = useState<boolean>(false);

  /*STORE*/
  const { user } = useUserStore();

  /*FUNCTION DEFINITIONS*/
  const handleCreateGame = async (name: string) => {
    const response = await createGame(name);
    console.log(response);
  };

  return (
    <>
      {/* OWNER RIGHTS NOTICE */}
      <Notice />

      {/* HEADER BAR */}
      <Header username={user.username} />
      {createRoomModal && (
        <CreateRoomModal
          handleCreateGame={handleCreateGame}
          username={user.username}
          closeModal={() => setCreateRoom(false)}
        />
      )}
      <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center">
        {/*MAIN TITLE*/}
        <Title />
        {/* MAIN CONTAINER */}
        <Buttons handleCreateGame={() => setCreateRoom(true)} />
        {/* GAMES TABLE */}
        <table className="group min-w-200 border-separate text-slate-800 border-spacing-y-2 shadow-md shadow-gray-500 p-4 rounded-4xl">
          <thead>
            <tr className="bg-gradient-to-tr from-purple-300 via-fuchsia-400 to-cyan-300 group-hover:from-cyan-300 group-hover:via-purple-300 group-hover:to-fuchsia-400 transition duration-300">
              <th className="p-3 text-left border-b-3 border-t-3">Game Name</th>
              <th className="p-3 text-left border-b-3 border-t-3">
                Players In-Game
              </th>
              <th className="p-3 text-left border-b-3 border-t-3">Public</th>
              <th className="p-3 text-left border-b-3 border-t-3">Status</th>
              <th className="p-3 text-left border-b-3 border-t-3">
                Max Players
              </th>
              <th className="p-3 text-left border-b-3 border-t-3">Join</th>
            </tr>
          </thead>
          <tbody className="">
            <tr className="bg-gradient-to-t from-gray-300 to-gray-100 shadow-md">
              <td className="p-3 border-r-1 border-l-2">Battle Arena</td>
              <td className="p-3 border-r-1 border-l-1">3</td>
              <td className="p-3 border-r-1 border-l-1">Yes</td>
              <td className="p-3 border-r-1 border-l-1">Active</td>
              <td className="p-3 border-r-1 border-l-1">4</td>
              <td className="p-3 border-r-2 border-l-1 hover:bg-lime-300 hover:cursor-pointer transition duration-300">
                join
              </td>
            </tr>
            <tr className="bg-gradient-to-t from-gray-300 to-gray-100 shadow-md rounded-md">
              <td className="p-3 border-r-1 border-l-2">Battle Arena</td>
              <td className="p-3 border-r-1 border-l-1">3</td>
              <td className="p-3 border-r-1 border-l-1">Yes</td>
              <td className="p-3 border-r-1 border-l-1">Active</td>
              <td className="p-3 border-r-1 border-l-1">4</td>
              <td className="p-3 border-r-2 border-l-1 hover:bg-red-300 hover:cursor-not-allowed transition duration-300">
                join
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}
