import { AnimatePresence, motion } from "motion/react";
import LoginForm from "./components/LoginForm";
import { ButtonNormal } from "../../components/Buttons";
import { useState } from "react";

export default function Landing() {
  const [login, setLogin] = useState<boolean>(false);
  const [register, setRegister] = useState<boolean>(false);

  const handleRegForm = () => {
    setLogin(false);
    setRegister((state) => !state);
  };

  const handleLoginform = () => {
    setLogin((state) => !state);
    setRegister(false);
  };

  const handlePlayAsGuest = () => {};

  return (
    <>
      <motion.div
        className="flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: "100%", scale: 0 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-8xl font-extrabold text-amber-800 border-b-8 border-3 rounded-3xl p-5 hover:border-b-3 hover:mt-1.5 transition-all">
          SWITCHER
        </h1>
        <div className="flex flex-row">
          <ButtonNormal text="login" onClick={() => handleLoginform()} />
          <ButtonNormal text="register" onClick={() => handleRegForm()} />
          <ButtonNormal
            text="play as guest"
            onClick={() => handlePlayAsGuest()}
          />
        </div>
        <AnimatePresence>
          {login && (
            <motion.div
              className="flex items-center justify-center"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 100 }}
              exit={{ y: "100%", opacity: 0 }}
            >
              <LoginForm />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {register && (
            <motion.div
              className="flex items-center justify-center"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 100 }}
              exit={{ y: "100%", opacity: 0 }}
            >
              <LoginForm />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
