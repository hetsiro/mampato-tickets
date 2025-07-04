import Image from "next/image";
import React from "react";

export const CardLocationPark = ({ buttonText }: { buttonText: string }) => {
  return (
    <article className="group hover:scale-105 transition-all duration-500 cursor-pointer border-[var(--primary-dark)] border-2 rounded-md overflow-hidden">
      <figure className="flex flex-col justify-center items-center">
        <Image
          src="/pngs/parque_lo_barnechea.jpeg"
          alt="mampato-logo"
          width={716}
          height={308}
          className="py-10"
        />
        <figcaption className="text-center text-[clamp(1rem,6vw,2rem)] bg-[var(--secondary)] text-white w-full group-hover:bg-[var(--primary-dark)] transition-all duration-500 py-4 px-2">
          {buttonText}
        </figcaption>
      </figure>
    </article>
  );
};
