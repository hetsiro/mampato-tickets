"use client";

import { useState, useEffect } from "react";

interface MainLoadingProps {
  onComplete: () => void;
  dataReady?: boolean;
}

export function MainLoading({ onComplete, dataReady = false }: MainLoadingProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // La rotación ya está activa desde el inicio

    // Si los datos están listos, mantener el loading por 2 segundos adicionales
    if (dataReady) {
      const completionTimer = setTimeout(() => {
        setIsVisible(false);
        
        // Llamar onComplete después de que termine la animación de salida
        setTimeout(() => {
          onComplete();
        }, 500);
      }, 2000); // 2 segundos adicionales después de que los datos estén listos

      return () => {
        clearTimeout(completionTimer);
      };
    }

    // Si los datos no están listos, mantener el loading por 2 segundos
    const completionTimer = setTimeout(() => {
      setIsVisible(false);
      
      // Llamar onComplete después de que termine la animación de salida
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 2000);

    return () => {
      clearTimeout(completionTimer);
    };
  }, [onComplete, dataReady]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-transform duration-500 ease-in-out ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Fondo */}
      <div className="absolute inset-0 bg-[var(--primary-dark)]"></div>
      
      {/* Contenido centrado */}
      <div className="relative h-full flex items-center justify-center">
        {/* Logo con animación de rotación */}
        <div className="text-center">
          <div className="rotate-360">
            {/* Logo de Mampato */}
            <div className="w-32 h-32 mx-auto mb-6">
              <img
                src="/pngs/mampato-logo.png"
                alt="Mampato"
                className="w-full h-full object-contain"
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