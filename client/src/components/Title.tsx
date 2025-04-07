export default function Title() {
  return (
    <div className="relative group flex flex-row items-baseline p-6 rounded-4xl bg-gray-200 inset-shadow-sm inset-shadow-gray-500">
      <p className="text-8xl font-extrabold m-2 text-slate-800">SWITCHER</p>
      <p className="text-9xl font-extrabold m-2 text-fuchsia-400">2</p>
      <div className="absolute w-full h-full z-[-1] rounded-4xl bg-gradient-to-tr from-cyan-800 via-gray-300 to-purple-800 left-0 top-0 scale-x-103 scale-y-104 group-hover:from-purple-800 group-hover:via-cyan-900 group-hover:to-gray-300 transition-colors duration-500 shadow-md shadow-gray-500" />
    </div>
  );
}
