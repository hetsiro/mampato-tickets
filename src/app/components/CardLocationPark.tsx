import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CardLocationParkProps {
  buttonText: string;
  imageSrc?: string;
  oficinaId?: number;
  slug: string;
}

export const CardLocationPark = ({ 
  buttonText, 
  imageSrc = "/pngs/parque_lo_barnechea.jpeg",
  oficinaId,
  slug,
}: CardLocationParkProps) => {
  return (
    <Link href={`/parque/${slug}`}>
      <article 
        className="group hover:scale-105 transition-all duration-500 cursor-pointer bg-white shadow-gray-400 shadow-md border-gray-300 border rounded-lg overflow-hidden"
        data-oficina-id={oficinaId}
      >
        <figure className="flex flex-col justify-center items-center">
          <Image
            src={imageSrc}
            alt={buttonText}
            width={716}
            height={308}
            // className="py-10"
          />
          <figcaption className="text-center text-[clamp(1rem,6vw,2rem)] bg-[var(--secondary)] text-white w-full group-hover:bg-[var(--primary-dark)] transition-all duration-500 py-4 px-2">
            {buttonText}
          </figcaption>
        </figure>
      </article>
    </Link>
  );
};
