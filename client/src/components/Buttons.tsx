interface ButtonProps {
  text: string;
  onClick: () => void;
}

export function ButtonNormal({ text, onClick }: ButtonProps) {
  return (
    <>
      <div className="">
        <button
          className="text-amber-800 bg-orange-300 font-bold text-2xl rounded-full border-3 border-b-6 pl-4 pr-4 pt-2 pb-2 m-4 hover:mt-3 hover:cursor-pointer hover:border-b-8 transition-all active:border-b-3 shadow-sm hover:shadow-md shadow-stone-700/70"
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
          className="text-green-800 bg-lime-300 font-bold text-2xl rounded-full border-3 border-b-6 pl-4 pr-4 pt-2 pb-2 m-4 hover:mt-3 hover:cursor-pointer hover:border-b-8 transition-all active:border-b-3 shadow-sm hover:shadow-md shadow-stone-700/70"
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
          className="text-red-800 bg-rose-300 font-bold text-2xl rounded-full border-red-800 border-3 border-b-6 pl-4 pr-4 pt-2 pb-2 m-4 hover:mt-3 hover:cursor-pointer hover:border-b-8 transition-all active:border-b-3 shadow-sm hover:shadow-md shadow-stone-700/70"
          onClick={onClick}
        >
          {text}
        </button>
      </div>
    </>
  );
}
