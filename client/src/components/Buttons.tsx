interface ButtonProps {
  text: string;
  onClick: () => void;
}

export function ButtonNormal({ text, onClick }: ButtonProps) {
  return (
    <>
      <div className="">
        <button
          className="text-slate-800 bg-indigo-300 inset-shadow-sm inset-shadow-indigo-400 font-bold text-2xl rounded-2xl p-2 m-4 hover:cursor-pointer hover:inset-shadow-transparent hover:shadow-md hover:shadow-gray-400 active:inset-shadow-md active:inset-shadow-indigo-500 active:shadow-transparent transition-all"
          onClick={onClick}
        >
          {text}
        </button>
      </div>
    </>
  );
}

export function ButtonGreen({ text, onClick }: ButtonProps) {
  return (
    <>
      <div className="">
        <button
          className="text-green-900 bg-lime-300 font-bold text-2xl rounded-lg pl-4 pr-4 pt-2 pb-2 m-4 hover:cursor-pointer transition-all shadow-sm hover:shadow-md active:shadow-none shadow-stone-700/70"
          onClick={onClick}
        >
          {text}
        </button>
      </div>
    </>
  );
}

export function ButtonRed({ text, onClick }: ButtonProps) {
  return (
    <>
      <div className="">
        <button
          className="text-red-900 bg-rose-300 font-bold text-2xl rounded-lg pl-4 pr-4 pt-2 pb-2 m-4 hover:cursor-pointer transition-all shadow-sm hover:shadow-md active:shadow-none shadow-stone-700/70"
          onClick={onClick}
        >
          {text}
        </button>
      </div>
    </>
  );
}
