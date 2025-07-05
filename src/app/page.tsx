"use client";

import { useState, useEffect } from "react";
import { CardLocationPark } from "./components/CardLocationPark";
import { MainLoading } from "./components/MainLoading";
import api from "@/lib/axios";
import { OficinaVentaResponse } from "@/types/api";
import { nombreToSlug } from "@/utils/parque";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [oficinas, setOficinas] = useState<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any

  // Cargar datos inmediatamente
  useEffect(() => {
    const fetchOficinas = async () => {
      try {
        const response = await api.get<OficinaVentaResponse>(
          "/api/OficinaVenta/ListarWeb"
        );
        setOficinas(response.data.data);
      } catch (error) {
        console.error("Error fetching oficinas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOficinas();
  }, []);

  return (
    <>
      <MainLoading loading={loading} />

      {/* Contenido principal */}
      <main className="flex flex-col justify-center items-center gap-6 p-6 rounded-lg">
        <h1 className="text-2xl font-bold bg-[var(--secondary)] text-white px-4 py-2 rounded-md w-full text-center flex flex-col md:flex-row items-center justify-center md:gap-2">
          Selecciona tu parque
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="w-auto h-[10vw] md:w-8 md:h-8"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M5.08884 12.7055C5.26942 12.2784 5.69482 12 6.16669 12H9V5C9 4.44772 9.44772 4 10 4H14C14.5523 4 15 4.44771 15 5V12H17.8333C18.3052 12 18.7306 12.2784 18.9112 12.7055C19.0917 13.1326 18.9919 13.6241 18.6583 13.951L12.825 19.6653C12.3693 20.1116 11.6307 20.1116 11.175 19.6653L5.34174 13.951C5.00808 13.6241 4.90826 13.1326 5.08884 12.7055Z"
                fill="#ffffff"
              ></path>{" "}
            </g>
          </svg>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {oficinas.map((oficina) => (
            <CardLocationPark
              key={oficina.OficinaVentaId}
              buttonText={oficina.Nombre}
              imageSrc={oficina.ImagenPortada}
              oficinaId={oficina.OficinaVentaId}
              slug={nombreToSlug(oficina.Nombre)}
            />
          ))}
        </div>
      </main>
    </>
  );
}
