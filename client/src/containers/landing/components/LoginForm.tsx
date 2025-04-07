import { CredentialResponse } from "@react-oauth/google";
import { ButtonGreen } from "../../../components/Buttons";
import { GoogleButton } from "./GoogleButton";
import { useState } from "react";

interface GoogleButtonProps {
  onSucces: (response: CredentialResponse) => void;
  onError: () => void;
  handleLogin: (email: string, password: string) => void;
}

export default function LoginForm(props: GoogleButtonProps) {
  const [[email, password], setLoginValues] = useState<[string, string]>([
    "",
    "",
  ]);

  const handleEmailChange = (val: string) => {
    setLoginValues((prev) => [val, prev[1]]);
  };

  const handlePasswordChange = (val: string) => {
    setLoginValues((prev) => [prev[0], val]);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center w-full border-2 border-slate-800 m-6 p-4 rounded-4xl shadow-md shadow-gray-500">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center w-full"
        >
          <div className="flex flex-col items-start justify-center w-full">
            <div className="flex flex-row items-center justify-between w-full">
              <p className="font-bold text-slate-800 underline text-2xl m-2">
                Email:
              </p>
              <input
                onChange={(e) => handleEmailChange(e.target.value)}
                className="p-3 m-2 rounded-xl bg-gray-400 text-black inset-shadow-gray-600 inset-shadow-sm"
                type="text"
                placeholder="email ..."
              />
            </div>
            <div className="flex flex-row items-center justify-between w-full">
              <p className="font-bold text-slate-800 underline text-2xl m-2">
                Password:
              </p>
              <input
                onChange={(e) => handlePasswordChange(e.target.value)}
                className="p-3 m-2 rounded-xl bg-gray-400 text-black inset-shadow-gray-600 inset-shadow-sm"
                type="text"
                placeholder="password ..."
              />
            </div>
          </div>
          <div className="w-full flex flex-row items-center justify-end">
            <GoogleButton onSucces={props.onSucces} onError={props.onError} />
            <ButtonGreen
              text="login"
              onClick={() => props.handleLogin(email, password)}
            />
          </div>
        </form>
      </div>
    </>
  );
}
