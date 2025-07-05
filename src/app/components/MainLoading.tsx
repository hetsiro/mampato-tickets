"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface MainLoadingProps {
  loading: boolean;
}

export function MainLoading({ loading }: MainLoadingProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Solo ejecutar cuando loading sea false
    if (!loading) {
      const completionTimer = setTimeout(() => {
        setIsVisible(false);
      }, 1000); // 2 segundos adicionales después de que termine la carga

      return () => {
        clearTimeout(completionTimer);
      };
    }
  }, [loading]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-transform duration-1000 ease-in-out ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Fondo */}
      <div className="absolute inset-0 bg-[var(--primary-dark)]"></div>
      
      {/* Contenido centrado */}
      <div className="relative h-full flex items-center justify-center">
        {/* Logo con animación de rotación */}
        <div className="text-center">
          <div className="scale-logo-animation">
            {/* Logo de Mampato */}
            <div className="w-48 h-auto mx-auto mb-6">
              <Image
                src="/pngs/mampato-logo.png"
                alt="Mampato"
                className="w-full h-full object-contain"
                width={532}
                height={159}
              />
            </div>
          </div>
          
          {/* Texto de carga */}
          <div className="text-white text-xl font-semibold">
            Cargando...
          </div>
          
          {/* Spinner adicional */}
          <div className="mt-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}