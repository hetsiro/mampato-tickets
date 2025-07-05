"use client";

import { useState } from "react";
import Link from "next/link";

export default function DescargaTicketPage() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadTicket = async () => {
    setIsDownloading(true);
    
    try {
      // Aquí iría la lógica real para descargar el ticket
      // Por ahora simulamos una descarga
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Crear un enlace de descarga temporal
      const link = document.createElement('a');
      link.href = '/ticket-ejemplo.pdf'; // Esto sería la URL real del ticket
      link.download = 'ticket-mampato.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert('¡Ticket descargado exitosamente!');
    } catch (error) {
      console.error('Error al descargar ticket:', error);
      alert('Error al descargar el ticket. Por favor intenta nuevamente.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main className="flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Icono de éxito */}
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          ¡Pago Exitoso!
        </h1>

        {/* Mensaje */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          Tu pago ha sido procesado correctamente. Ya puedes descargar tu ticket para el día de tu visita.
        </p>

        {/* Información del ticket */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <h3 className="font-semibold text-gray-900 mb-3">Detalles de tu compra:</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Fecha de visita:</span>
              <span className="font-medium">15 de Enero, 2025</span>
            </div>
            <div className="flex justify-between">
              <span>Parque:</span>
              <span className="font-medium">Mampato Barnechea</span>
            </div>
            <div className="flex justify-between">
              <span>Total pagado:</span>
              <span className="font-medium">$55.000</span>
            </div>
          </div>
        </div>

        {/* Botón de descarga */}
        <button
          onClick={handleDownloadTicket}
          disabled={isDownloading}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors mb-4 ${
            isDownloading
              ? 'bg-gray-400 cursor-not-allowed text-white'
              : 'bg-[var(--primary-dark)] text-white hover:bg-[var(--primary)]'
          }`}
        >
          {isDownloading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Descargando...</span>
            </div>
          ) : (
            'Descargar Ticket'
          )}
        </button>

        {/* Información importante */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-900 mb-2">📱 Importante:</h4>
          <ul className="text-sm text-blue-800 space-y-1 text-left">
            <li>• Guarda tu ticket en tu dispositivo</li>
            <li>• Llévalo el día de tu visita</li>
            <li>• También te enviamos una copia por email</li>
          </ul>
        </div>

        {/* Botones adicionales */}
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Volver al Inicio
          </Link>
          
          <Link
            href="/contacto"
            className="block w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Contactar Soporte
          </Link>
        </div>

        {/* Información adicional */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Si tienes problemas con la descarga, revisa tu email o contacta a nuestro equipo de soporte.
          </p>
        </div>
      </div>
    </main>
  );
} 