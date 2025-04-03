import { AnimatePresence, motion } from "motion/react";
import LoginForm from "./components/LoginForm";
import { CredentialResponse } from "@react-oauth/google";
import { googleLogin, login, register } from "../../services/apiCalls";
import { useState } from "react";
import { WaitingServerModal } from "./components/WaitServerModal";
import RegisterForm from "./components/RegisterForm";

export default function Landing() {
  const [waitingServer, setWaiting] = useState<boolean>(false);
  const [currentForm, setCurrentForm] = useState<"login" | "register">("login");

  const handleLoginSuccesGoogle = async (response: CredentialResponse) => {
    setWaiting(true);
    try {
      if (response.credential) {
        const serverResponse = await googleLogin(response.credential);
        console.log(serverResponse);
        setWaiting(false);
      } else {
        setWaiting(false);
      }
    } catch (error) {
      console.error(error);
      setWaiting(false);
    }
  };

  const handleLoginErrorGoogle = () => {
    console.log("error de google todo mal");
  };

  const handleLogin = async (email: string, password: string) => {
    if (email === "" || password === "") return;
    setWaiting(true);
    try {
      const response = await login(email, password);
      console.log(response);
      setWaiting(false);
    } catch (error) {
      console.error(error);
      setWaiting(false);
    }
  };

  const handleRegister = async (
    username: string,
    email: string,
    password: string,
  ) => {
    if (username === "" || email === "" || password === "") return;
    setWaiting(true);
    try {
      const response = await register(username, email, password);
      console.log(response);
      setWaiting(false);
    } catch (error) {
      console.error(error);
      setWaiting(false);
    }
  };

  return (
    <>
      {/* MODAL POPS UP WHEN WAITING FOR SERVER */}
      <WaitingServerModal isLoading={waitingServer} />

      {/* MAIN DIV CONTAINER */}
      <motion.div
        className="flex flex-col items-center h-screen justify-center mt-30"
        initial={{ opacity: 0, y: "100%", scale: 0 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1 }}
      >
        {/* TITLE CONTAINER */}
        <div className="text-8xl font-extrabold text-amber-800 border-b-8 border-3 rounded-3xl p-5 mb-20 flex flex-row items-baseline">
          <h1>SWITCHER</h1>
          <h1 className="text-9xl text-indigo-500 ml-3">2</h1>
        </div>

        {/* LOGIN AND REGISTER TABS*/}
        <div className="relative flex w-full text-3xl font-bold text-amber-800">
          {["login", "register"].map((tab) => (
            <div
              key={tab}
              className="w-1/2 text-center cursor-pointer relative p-3"
              onClick={() => setCurrentForm(tab as "login" | "register")}
            >
              {tab.toUpperCase()}
              {currentForm === tab && (
                <motion.div
                  layoutId="underline"
                  className="absolute pb-2 bottom-0 left-0 right-0 h-1 bg-indigo-500"
                  transition={{ type: "tween", stiffness: 300, damping: 20 }}
                />
              )}
            </div>
          ))}
        </div>

        {/* LOGIN AND REGISTER FORMS */}
        <div className="w-ful h-full">
          {currentForm === "login" && (
            <AnimatePresence>
              <motion.div
                className="flex items-center justify-center"
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "tween" }}
              >
                <LoginForm
                  onSucces={handleLoginSuccesGoogle}
                  onError={handleLoginErrorGoogle}
                  handleLogin={handleLogin}
                />
              </motion.div>
            </AnimatePresence>
          )}
          {currentForm === "register" && (
            <AnimatePresence>
              <motion.div
                className="flex items-center justify-center"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ type: "tween" }}
              >
                <RegisterForm
                  onSucces={handleLoginSuccesGoogle}
                  onError={handleLoginErrorGoogle}
                  handleRegister={handleRegister}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </>
  );
}
