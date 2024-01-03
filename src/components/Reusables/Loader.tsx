import { Variants, motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="grid place-content-center bg-[#0d7836] px-2 py-2 rounded-full">
      <BarLoader />
    </div>
  );
};

const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1,
      ease: "circIn",
    },
  },
} as Variants;

const BarLoader = () => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-1"
    >
      <motion.div variants={variants} className="h-6 w-1 bg-white" />{" "}
      <motion.div variants={variants} className="h-6 w-1 bg-white" />{" "}
      <motion.div variants={variants} className="h-6 w-1 bg-white" />{" "}
      <motion.div variants={variants} className="h-6 w-1 bg-white" />{" "}
      <motion.div variants={variants} className="h-6 w-1 bg-white" />{" "}
    </motion.div>
  );
};

export default Loader;
