"use client";
import React, { useState } from "react";
import { evogria } from "../fonts";
import Image from "next/image";
import { ButtonHeaderLarge } from "./ButtonHeaderLarge";
import { ButtonHeaderShort } from "./ButtonHeaderShort";

// ===== CONFIGURACIÓN DE BOTONES =====
const LARGE_BUTTONS = [
  {
    buttonText: "PARQUE LAS VIZCACHAS",
    url: "https://www.mampato.cl/parque-las-vizcachas",
  },
  {
    buttonText: "PARQUE LO BARNECHEA",
    url: "https://www.mampato.cl/parque-lo-barnechea",
  },
];

const SHORT_BUTTONS = [
  {
    buttonText: "HORARIOS Y PRECIOS",
    url: "https://www.mampato.cl/horarios-precios",
  },
  {
    buttonText: "CUMPLEAÑOS",
    url: "https://www.mampato.cl/pronto-cumpleaños",
  },
  {
    buttonText: "BOWLING",
    url: "https://www.mampato.cl/bowling-mampato",
  },
  {
    buttonText: "VENTAS CORPORATIVAS",
    url: "https://www.mampato.cl/ventas-corporativas",
  },
  {
    buttonText: "FIESTAS DE NAVIDAD",
    url: "https://www.mampato.cl/fiestas-de-navidad",
  },
  {
    buttonText: "NUESTRA HISTORIA",
    url: "https://www.mampato.cl/historia",
  },
];

// ===== CONFIGURACIÓN GENERAL =====
const HEADER_CONFIG = {
  logo: {
    src: "/pngs/mampato-logo.png",
    alt: "mampato-logo",
    width: 532,
    height: 159,
    url: "https://www.mampato.cl",
  },
  tickets: {
    src: "/pngs/tickets.png",
    alt: "tickets",
    width: 694,
    height: 237,
    url: "https://tickets.mampato.cl",
  },
  homeUrl: "https://www.mampato.cl",
};

// ===== TODOS LOS BOTONES PARA MÓVIL =====
const ALL_MOBILE_BUTTONS = [...LARGE_BUTTONS, ...SHORT_BUTTONS];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Bloquear/desbloquear scroll del body
  React.useEffect(() => {
    if (isMenuOpen) {
      // Bloquear scroll del body
      document.body.style.overflow = "hidden";
    } else {
      // Restaurar scroll del body
      document.body.style.overflow = "unset";
    }

    // Cleanup: restaurar scroll cuando el componente se desmonte
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`${evogria.className} text-sm flex-col justify-center items-center gap-4 hidden md:flex md:w-[980px] mx-auto mb-5`}
      >
        <a href={HEADER_CONFIG.logo.url}>
          <Image
            alt={HEADER_CONFIG.logo.alt}
            src={HEADER_CONFIG.logo.src}
            width={HEADER_CONFIG.logo.width}
            height={HEADER_CONFIG.logo.height}
            className="w-[295px] h-auto"
          />
        </a>
        <nav className="grid grid-cols-3 gap-2 justify-center items-center">
          <div className="col-span-2 flex flex-col gap-2">
            <div className="flex gap-4">
              <a href={HEADER_CONFIG.homeUrl}>
                <svg
                  fill="#fff"
                  className="p-2 bg-[var(--primary-dark)] rounded-md hover:scale-110 hover:bg-[var(--secondary)] transition-all duration-500"
                  height="45px"
                  width="44px"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 330.242 330.242"
                  xmlSpace="preserve"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path d="M324.442,129.811l-41.321-33.677V42.275c0-6.065-4.935-11-11-11h-26c-6.065,0-11,4.935-11,11v14.737l-55.213-44.999 c-3.994-3.254-9.258-5.047-14.822-5.047c-5.542,0-10.781,1.782-14.753,5.019L5.8,129.81c-6.567,5.351-6.173,10.012-5.354,12.314 c0.817,2.297,3.448,6.151,11.884,6.151h19.791v154.947c0,11.058,8.972,20.053,20,20.053h62.5c10.935,0,19.5-8.809,19.5-20.053 v-63.541c0-5.446,5.005-10.405,10.5-10.405h42c5.238,0,9.5,4.668,9.5,10.405v63.541c0,10.87,9.388,20.053,20.5,20.053h61.5 c11.028,0,20-8.996,20-20.053V148.275h19.791c8.436,0,11.066-3.854,11.884-6.151C330.615,139.822,331.009,135.161,324.442,129.811z"></path>{" "}
                  </g>
                </svg>
              </a>
              {LARGE_BUTTONS.map((button, index) => (
                <ButtonHeaderLarge
                  key={index}
                  buttonText={button.buttonText}
                  url={button.url}
                />
              ))}
            </div>
            <div className="flex gap-2">
              {SHORT_BUTTONS.map((button, index) => (
                <ButtonHeaderShort
                  key={index}
                  buttonText={button.buttonText}
                  url={button.url}
                />
              ))}
            </div>
          </div>
          <a href={HEADER_CONFIG.tickets.url}>
            <Image
              alt={HEADER_CONFIG.tickets.alt}
              src={HEADER_CONFIG.tickets.src}
              width={HEADER_CONFIG.tickets.width}
              height={HEADER_CONFIG.tickets.height}
              className="col-span-1 hover:brightness-120 transition-all duration-500"
            />
          </a>
        </nav>
      </header>

      {/* Version Mobile */}
      <header
        className={`${evogria.className} flex md:hidden justify-between items-center p-4 w-full`}
      >
        {/* Logo */}
        <div className="flex flex-col flex-grow px-4">
          <a
            href={HEADER_CONFIG.logo.url}
            className="flex flex-grow justify-center items-center"
          >
            <Image
              alt={HEADER_CONFIG.logo.alt}
              src={HEADER_CONFIG.logo.src}
              width={532}
              height={159}
              className="w-2/3 h-auto"
            />
          </a>
          {/* Tickets */}
          <a href={HEADER_CONFIG.tickets.url}>
            <Image
              alt={HEADER_CONFIG.tickets.alt}
              src={HEADER_CONFIG.tickets.src}
              width={HEADER_CONFIG.tickets.width}
              height={HEADER_CONFIG.tickets.height}
              className="w-full h-auto"
            />
          </a>
        </div>
        <button
          onClick={toggleMenu}
          className="fixed top-4 right-4 z-10 p-3 bg-white rounded-full shadow-lg"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--primary-dark)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-10 transition-opacity duration-300"
            onClick={closeMenu}
          />
        )}

        {/* Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-[80vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header del drawer */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2
              className={`${evogria.className} text-lg font-bold text-[var(--primary-dark)]`}
            >
              MENÚ
            </h2>
            <button
              onClick={closeMenu}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Contenido del drawer */}
          <nav className="flex flex-col p-4 space-y-2 pb-8">
            {ALL_MOBILE_BUTTONS.map((button, index) => (
              <a
                key={index}
                href={button.url}
                onClick={closeMenu}
                className={`${evogria.className} w-full p-4 text-[5vw] font-medium text-[var(--primary-dark)] rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md`}
              >
                {button.buttonText}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
};

// export const HeaderMobile = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   // Bloquear/desbloquear scroll del body
//   React.useEffect(() => {
//     if (isMenuOpen) {
//       // Bloquear scroll del body
//       document.body.style.overflow = "hidden";
//     } else {
//       // Restaurar scroll del body
//       document.body.style.overflow = "unset";
//     }

//     // Cleanup: restaurar scroll cuando el componente se desmonte
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isMenuOpen]);

//   return (
//     <>
//       <header
//         className={`${evogria.className} flex justify-between items-center p-4 md:hidden w-full`}
//       >
//         {/* Logo */}
//         <div className="flex flex-col flex-grow px-4">
//           <a
//             href={HEADER_CONFIG.logo.url}
//             className="flex flex-grow justify-center items-center"
//           >
//             <Image
//               alt={HEADER_CONFIG.logo.alt}
//               src={HEADER_CONFIG.logo.src}
//               width={532}
//               height={159}
//               className="w-2/3 h-auto"
//             />
//           </a>
//           {/* Tickets */}
//           <a href={HEADER_CONFIG.tickets.url}>
//             <Image
//               alt={HEADER_CONFIG.tickets.alt}
//               src={HEADER_CONFIG.tickets.src}
//               width={HEADER_CONFIG.tickets.width}
//               height={HEADER_CONFIG.tickets.height}
//               className="w-full h-auto"
//             />
//           </a>
//         </div>
//       </header>

//       {/* Botón hamburguesa sticky */}
//       <button
//         onClick={toggleMenu}
//         className="fixed top-4 right-4 z-10 p-3 bg-white rounded-full shadow-lg md:hidden"
//       >
//         <svg
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="var(--primary-dark)"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <line x1="3" y1="6" x2="21" y2="6"></line>
//           <line x1="3" y1="12" x2="21" y2="12"></line>
//           <line x1="3" y1="18" x2="21" y2="18"></line>
//         </svg>
//       </button>

//       {/* Overlay */}
//       {isMenuOpen && (
//         <div
//           className="fixed inset-0 z-10 transition-opacity duration-300"
//           onClick={closeMenu}
//         />
//       )}

//       {/* Drawer */}
//       <div
//         className={`fixed top-0 right-0 h-full w-[80vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
//           isMenuOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* Header del drawer */}
//         <div className="flex justify-between items-center p-4 border-b border-gray-200">
//           <h2
//             className={`${evogria.className} text-lg font-bold text-[var(--primary-dark)]`}
//           >
//             MENÚ
//           </h2>
//           <button
//             onClick={closeMenu}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
//           >
//             <svg
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <line x1="18" y1="6" x2="6" y2="18"></line>
//               <line x1="6" y1="6" x2="18" y2="18"></line>
//             </svg>
//           </button>
//         </div>

//         {/* Contenido del drawer */}
//         <nav className="flex flex-col p-4 space-y-2 pb-8">
//           {ALL_MOBILE_BUTTONS.map((button, index) => (
//             <a
//               key={index}
//               href={button.url}
//               onClick={closeMenu}
//               className={`${evogria.className} w-full p-4 text-[5vw] font-medium text-[var(--primary-dark)] rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md`}
//             >
//               {button.buttonText}
//             </a>
//           ))}
//         </nav>
//       </div>
//     </>
//   );
// };
