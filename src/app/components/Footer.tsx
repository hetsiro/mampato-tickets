import Image from "next/image";
import React from "react";
import { signika } from "../fonts";

export const Footer = () => {
  return (
    <>
      <footer className={`hidden md:flex bg-[var(--primary-dark)] `}>
        <div className="min-w-[980px] max-w-[980px] mx-auto py-4 px-4">
          <div className="flex py-4 justify-center items-center">
            <section className="flex flex-col justify-center text-white text-2xl w-full">
              <a
                href="https://www.mampato.cl/trabaja-con-nosotros"
                className="duration-500 hover:text-[var(--primary-light)]"
              >
                Trabaja con Nosotros
              </a>
              <a
                href="https://www.mampato.cl/horarios-precios"
                className="duration-500 hover:text-[var(--primary-light)]"
              >
                Sucursales
              </a>
              <a
                href="https://www.mampato.cl/preguntas-frecuentes"
                className="duration-500 hover:text-[var(--primary-light)]"
              >
                Preguntas Frecuentes
              </a>
            </section>

            <section className="flex flex-col gap-6 w-full justify-center items-center">
              <Image
                src="/pngs/siguenos.png"
                alt="mampato-logo-inferior"
                width={568}
                height={80}
                className="w-3/4 h-auto mx-auto"
              />
              <div className="flex w-full justify-center items-center gap-4">
                <a
                  href="https://www.facebook.com/mampato"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform duration-300"
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="#fff"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                </a>
                <a
                  href="https://www.instagram.com/mampato_oficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform duration-300"
                >
                  <div className="w-14 h-14 p-2 bg-white rounded-full flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="var(--primary-dark)"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                </a>
                <a
                  href="https://www.youtube.com/channel/JuegosMampato"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform duration-300"
                >
                  <div className="w-14 h-14 p-2 bg-white rounded-full flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="var(--primary-dark)"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </div>
                </a>
              </div>
              <Image
                src="/pngs/mampato-logo-inferior.png"
                alt="mampato-logo-inferior"
                width={550}
                height={256}
                className="w-2/3 h-auto md:block hidden"
              />
            </section>
            <form
              className={`${signika.className} flex flex-col justify-center items-center w-full`}
            >
              <span className="text-white text-center text-xl">
                Conoce nuestras novedades
              </span>
              <span className="text-white font-bold text-center text-3xl">
                REGÍSTRATE
              </span>
              <label className="text-white text-center text-xl">
                Ingresa tu dirección de email
              </label>
              <input
                type="email"
                placeholder="nombre@ejemplo.com"
                className="w-full bg-white rounded-full p-2 my-4 justify-center items-center text-center text-xl"
              />
              <button className="bg-[var(--secondary)] text-white rounded-full px-6 py-1 text-2xl w-fit hover:bg-[var(--primary-light)] cursor-pointer duration-500">
                Suscribirse
              </button>
            </form>
          </div>
          <span className="hidden md:block text-white text-center">
            Derechos Reservados 2015 - Mampato Parque de Entretenciones
          </span>
        </div>
      </footer>

      <footer
        className={`flex flex-col md:hidden bg-[var(--primary-dark)] pt-12 pb-4 justify-center items-center w-full px-4`}
      >
        <Image
          src="/pngs/mampato-logo-inferior.png"
          alt="mampato-logo-inferior"
          width={550}
          height={256}
          className="w-1/2 h-auto"
        />
        <form
          className={`${signika.className} flex flex-col justify-center items-center w-full pt-8`}
        >
          <span className="text-white text-center text-[6vw]">
            Conoce nuestras novedades
          </span>
          <span className="text-white font-bold text-center text-[10vw]">
            REGÍSTRATE
          </span>
          <label className="text-white text-center text-[6vw]">
            Ingresa tu dirección de email
          </label>
          <input
            type="email"
            placeholder="nombre@ejemplo.com"
            className="w-full bg-white rounded-full p-2 my-4 justify-center items-center text-center text-[5vw]"
          />
          <button className="bg-[var(--secondary)] text-white rounded-full px-6 py-1 text-[7vw] w-fit">
            Suscribirse
          </button>
        </form>
        <section className="flex flex-col gap-6 w-full pt-12">
          <Image
            src="/pngs/siguenos.png"
            alt="mampato-logo-inferior"
            width={568}
            height={80}
            className="w-3/4 h-auto mx-auto"
          />
          <div className="flex w-full justify-center items-center gap-4 pb-6">
            <a
              href="https://www.facebook.com/mampato"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-300"
            >
              <div className="w-[16vw] h-[16vw] rounded-full flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
            </a>
            <a
              href="https://www.instagram.com/mampato_oficial"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-300"
            >
              <div className="w-[16vw] h-[16vw] p-2 bg-white rounded-full flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="var(--primary-dark)"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
            </a>
            <a
              href="https://www.youtube.com/channel/JuegosMampato"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-300"
            >
              <div className="w-[16vw] h-[16vw] p-2 bg-white rounded-full flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="var(--primary-dark)"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
            </a>
          </div>
        </section>

        <div className="flex flex-col justify-center items-center text-white text-[6vw] font-semibold w-full border-y-1 py-2">
          <a href="https://www.mampato.cl/trabaja-con-nosotros">
            Trabaja con Nosotros
          </a>
          <a href="https://www.mampato.cl/horarios-precios">Sucursales</a>
          <a href="https://www.mampato.cl/preguntas-frecuentes">
            Preguntas Frecuentes
          </a>
        </div>
        <span className="text-white text-center">
          Derechos Reservados 2015 - Mampato Parque de Entretenciones
        </span>
      </footer>
    </>
  );
};
