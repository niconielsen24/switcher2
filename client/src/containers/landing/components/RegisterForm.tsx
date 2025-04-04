import { useState } from "react";
import { GoogleButton } from "./GoogleButton";
import { ButtonGreen } from "../../../components/Buttons";
import { CredentialResponse } from "@react-oauth/google";

interface RegisterProps {
  onSucces: (response: CredentialResponse) => void;
  onError: () => void;
  handleRegister: (username: string, email: string, password: string) => void;
}

export default function RegisterForm(props: RegisterProps) {
  const [[username, email, password], setRegisterValues] = useState<
    [string, string, string]
  >(["", "", ""]);
  const [_password, setSecondPsw] = useState<string>("");

  const handleUsernameChange = (val: string) => {
    setRegisterValues((prev) => [val, prev[1], prev[2]]);
  };

  const handleEmailChange = (val: string) => {
    setRegisterValues((prev) => [prev[0], val, prev[2]]);
  };

  const handlePasswordChange = (val: string) => {
    setRegisterValues((prev) => [prev[0], prev[1], val]);
  };

  const comparePasswords = () => _password === password;

  const onRegister = () => {
    if (!comparePasswords()) return;
    props.handleRegister(username, email, password);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center w-full bg-stone-300 border-6 border-stone-700 m-6 p-4 rounded-xl shadow-lg shadow-stone-900">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center w-full"
        >
          <div className="flex flex-col items-start justify-center w-full">
            <div className="flex flex-row items-center justify-between w-full">
              <p className="font-bold text-stone-700 underline text-2xl m-2">
                Username:
              </p>
              <input
                onChange={(e) => handleUsernameChange(e.target.value)}
                className="p-3 m-2 rounded-xl bg-stone-400 text-black inset-shadow-stone-900 shadow-sm"
                type="text"
                placeholder="username ..."
              />
            </div>
            <div className="flex flex-row items-center justify-between w-full">
              <p className="font-bold text-stone-700 underline text-2xl m-2">
                Email:
              </p>
              <input
                onChange={(e) => handleEmailChange(e.target.value)}
                className="p-3 m-2 rounded-xl bg-stone-400 text-black inset-shadow-stone-900 shadow-sm"
                type="text"
                placeholder="email ..."
              />
            </div>
            <div className="flex flex-row items-center justify-between w-full">
              <p className="font-bold text-stone-700 underline text-2xl m-2">
                Password:
              </p>
              <input
                onChange={(e) => handlePasswordChange(e.target.value)}
                className="p-3 m-2 rounded-xl bg-stone-400 text-black inset-shadow-stone-900 shadow-sm"
                type="text"
                placeholder="password ..."
              />
            </div>
            <div className="flex flex-row items-center justify-between w-full">
              <p className="font-bold text-stone-700 underline text-2xl m-2">
                Repeat Password:
              </p>
              <input
                onChange={(e) => setSecondPsw(e.target.value)}
                className="p-3 m-2 rounded-xl bg-stone-400 text-black inset-shadow-stone-900 shadow-sm"
                type="text"
                placeholder="password ..."
              />
            </div>
          </div>
          <div className="w-full flex flex-row items-center justify-end">
            <GoogleButton onSucces={props.onSucces} onError={props.onError} />
            <ButtonGreen text="register" onClick={onRegister} />
          </div>
        </form>
      </div>
    </>
  );
}
