import { HeaderProps } from "../types/types";

export default function Header(props: HeaderProps) {
  return (
    <div className="fixed flex flex-row items-center justify-between top-0 left-0 bg-gray-200/30 w-screen pl-10 pr-10 pb-4 pt-4 border-b-2 border-slate-800">
      <div className="relative flex flex-row items-baseline w-fit pb-3">
        <h3 className="font-extrabold text-3xl text-slate-800">switcher</h3>
        <h3 className="font-extrabold text-4xl text-fuchsia-400">2</h3>
        <div className="absolute w-full h-2 bottom-0 header-title-underline" />
      </div>
      <div className="">
        <p className="text-slate-800 text-2xl font-bold">{props.username}</p>
      </div>
    </div>
  );
}
