import { AnimatePresence, motion } from "motion/react";
import LoginForm from "./components/LoginForm";
import { CredentialResponse } from "@react-oauth/google";
import { googleLogin, login, register } from "../../services/apiCalls";
import { useEffect, useRef, useState } from "react";
import { WaitingServerModal } from "./components/WaitServerModal";
import RegisterForm from "./components/RegisterForm";
import { useUserStore } from "../../store/store";
import { useNavigate } from "react-router";
import Title from "../../components/Title";
import { ApiResponse } from "../../types/types_landing";
import LoginErrorModal from "./components/LoginErrorModal";

async function auth(): Promise<ApiResponse> {
  const response = await fetch("https://localhost:8080/auth/session", {
    method: "GET",
    credentials: "include",
  });
  return response.json();
}

function Tabs({
  currentForm,
  setCurrentForm,
}: {
  currentForm: "login" | "register";
  setCurrentForm: (tab: "login" | "register") => void;
}) {
  return (
    <div className="relative flex w-full h-1/6 items-center text-3xl font-bold text-slate-800">
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
              className="absolute pb-2 bottom-0 left-0 right-0 h-1 bg-slate-800"
              transition={{ type: "tween", stiffness: 300, damping: 20 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Landing() {
  /* HOOKS */
  const [waitingServer, setWaiting] = useState<boolean>(false);
  const [currentForm, setCurrentForm] = useState<"login" | "register">("login");
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<{ error: unknown } | null>(null);
  const sessionRef = useRef<ApiResponse>(null);
  const navigate = useNavigate();

  /* STORE */
  const { setUser } = useUserStore();

  /* EFFECTS */
  useEffect(() => {
    if (loginSuccess) {
      navigate("/home");
    }
  }, [loginSuccess, navigate]);

  useEffect(() => {
    if (sessionRef.current != null) return;

    const authEffect = async () => {
      const response = await auth();
      if (response.username && response.email) {
        setUser({ username: response.username, email: response.email });
        setLoginSuccess(true);
      }
      sessionRef.current = response;
    };
    authEffect();
  }, [sessionRef, setUser, setLoginSuccess]);

  /* FUNCTION DEFINITIONS */
  const handleLoginSuccesGoogle = async (response: CredentialResponse) => {
    setWaiting(true);
    try {
      if (response.credential) {
        const serverResponse = await googleLogin(response.credential);
        setUser(serverResponse.user);
        setWaiting(false);
        setLoginSuccess(true);
      } else {
        setWaiting(false);
      }
    } catch (error) {
      console.error(error);
      setLoginError({ error });
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
      setUser(response.user);
      setWaiting(false);
      setLoginSuccess(true);
    } catch (error) {
      console.error(error);
      setLoginError({ error });
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
      setUser(response.user);
      setWaiting(false);
      setLoginSuccess(true);
    } catch (error) {
      console.error(error);
      setLoginError({ error });
      setWaiting(false);
    }
  };

  return (
    <>
      {/* MODAL POPS UP WHEN WAITING FOR SERVER */}
      <WaitingServerModal isLoading={waitingServer} />

      {/* MODAL POPS UP WHEN THERE IS A LOGIN/REGISTER ERROR */}
      <LoginErrorModal
        loginError={loginError}
        setLoginError={() => setLoginError(null)}
      />

      {/* MAIN DIV CONTAINER */}
      <motion.div
        className="flex flex-col items-center h-screen justify-center"
        initial={{ opacity: 0, y: "100%", scale: 0 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1 }}
      >
        {/* TITLE CONTAINER */}
        <div className="w-full h-1/6 flex items-center justify-center mt-20">
          <Title />
        </div>
        {/* LOGIN AND REGISTER TABS*/}
        <Tabs currentForm={currentForm} setCurrentForm={setCurrentForm} />
        {/* LOGIN AND REGISTER FORMS */}
        <div className="w-full h-2/3 flex flex-col justify-start">
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
