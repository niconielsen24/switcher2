import { ButtonGreen, ButtonRed } from "../../../components/Buttons";

export default function LoginForm() {
  return (
    <>
      <div className="flex flex-row items-center justify-center w-full bg-orange-300 border-6 border-amber-800 m-6 p-4 rounded-3xl">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center w-full"
        >
          <div className="flex flex-col items-start justify-center w-full">
            <div className="flex flex-row items-center justify-between w-full">
              <p className="font-bold text-amber-800 text-2xl m-2">Username:</p>
              <input
                className="p-3 m-2 rounded-full bg-amber-700 border-amber-800"
                type="text"
                placeholder="username ..."
              />
            </div>
            <div className="flex flex-row items-center justify-between w-full">
              <p className="font-bold text-amber-800 text-2xl m-2">Email: </p>
              <input
                className="p-3 m-2 rounded-full bg-amber-700 border-amber-800"
                type="text"
                placeholder="email ..."
              />
            </div>
          </div>
          <div className="w-full flex flex-row items-center justify-end">
            <ButtonGreen text="login" onClick={() => {}} />
            <ButtonRed text="close" onClick={() => {}} />
          </div>
        </form>
      </div>
    </>
  );
}
