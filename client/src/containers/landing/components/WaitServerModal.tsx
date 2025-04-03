import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Spinner } from "../../../components/Spinner";

export const WaitingServerModal = ({ isLoading }: { isLoading: boolean }) => {
  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "auto";
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
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
            <Spinner />
            <p className="text-xl font-bold text-stone-800">
              Waiting for server response...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
