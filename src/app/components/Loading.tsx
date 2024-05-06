import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

export const Loading = () => {
  return (
    <div className="pb-[100px]">
      <p className="text-center text-2xl text-white font-bold">
        Cargando resultados...
      </p>
      <motion.figure
        animate={{
          rotate: [0, 360, 0],
          scale: [0.5, 1, 0.5],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          times: [0, 1, 1.5],
          repeat: Infinity,
          repeatDelay: 3,
        }}
      >
        <Image src={"/joy.png"} alt={"emoji"} width={150} height={150} />
      </motion.figure>
      <motion.figure
        animate={{
          rotate: [0, 360, 0],
          scale: [0.5, 1, 0.5],
          opacity: [0, 1, 0],
        }}
        transition={{
          delay: 1,
          duration: 1.5,
          ease: "easeInOut",
          times: [0, 1, 1.5],
          repeat: Infinity,
          repeatDelay: 2,
        }}
      >
        <Image src={"/fear.png"} alt={"emoji"} width={150} height={150} />
      </motion.figure>
      <motion.figure
        animate={{
          rotate: [0, 360, 0],
          scale: [0.5, 1, 0.5],
          opacity: [0, 1, 0],
        }}
        transition={{
          delay: 2,
          duration: 1.5,
          ease: "easeInOut",
          times: [0, 1, 1.5],
          repeat: Infinity,
          repeatDelay: 1,
        }}
      >
        <Image src={"/others.png"} alt={"emoji"} width={150} height={150} />
      </motion.figure>
    </div>
  );
};
