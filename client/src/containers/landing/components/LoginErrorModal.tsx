import { motion, AnimatePresence } from "motion/react";
import { ButtonRed } from "../../../components/Buttons";

export default function LoginErrorModal({
  loginError,
  setLoginError,
}: {
  loginError: { error: unknown } | null;
  setLoginError: () => void;
}) {
  return (
    <AnimatePresence>
      {loginError != null && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-stone-800/50 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-3xl shadow-lg flex flex-col items-center gap-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <p className="text-slate-800 text-2xl">
              {"An error ocurred when attempting to log in."}
            </p>
            <p className="text-slate-800 text-2xl">{"Try again later"}</p>
            <ButtonRed text="close" onClick={() => setLoginError()} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
