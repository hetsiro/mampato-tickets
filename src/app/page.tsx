"use client";

import { useState, useEffect } from "react";
import { CardLocationPark } from "./components/CardLocationPark";
import { MainLoading } from "./components/MainLoading";
import api from "@/lib/axios";
import { OficinaVentaResponse } from "@/types/api";
import { nombreToSlug } from "@/utils/parque";

export default function Page() {
  const [showLoading, setShowLoading] = useState(true);
  const [oficinas, setOficinas] = useState<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [dataLoaded, setDataLoaded] = useState(false);

  // Cargar datos inmediatamente
  useEffect(() => {
    const fetchOficinas = async () => {
      try {
        const response = await api.get<OficinaVentaResponse>("/api/OficinaVenta/ListarWeb");
        setOficinas(response.data.data);
        setDataLoaded(true);
      } catch (error) {
        console.error("Error fetching oficinas:", error);
        setDataLoaded(true);
      }
    };

    fetchOficinas();
  }, []);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  return (
    <>
      {/* Loading por encima */}
      {showLoading && (
        <MainLoading onComplete={handleLoadingComplete} dataReady={dataLoaded} />
      )}
      
      {/* Contenido principal */}
      <main className="flex flex-col justify-center items-center gap-6 p-6 rounded-lg">
        <h1 className="text-3xl font-bold text-[var(--secondary)]">Selecciona tu parque</h1>
        
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
