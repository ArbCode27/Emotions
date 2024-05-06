import Image from "next/image";
import React from "react";

export const Error = () => {
  return (
    <div className="w-full flex flex-col items-center text-center">
      <h2 className="text-white font-semibold mb-8">
        Ocurrio un error, volviendo a intentar
      </h2>
      <figure>
        <Image src={"/others.png"} alt="emoji" width={200} height={200} />
      </figure>
    </div>
  );
};
