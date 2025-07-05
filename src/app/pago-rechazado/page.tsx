"use client";

import Link from "next/link";

export default function PagoRechazadoPage() {
  return (
    <main className="flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Icono de error */}
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Pago Rechazado
        </h1>

        {/* Mensaje */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          Lo sentimos, tu pago no pudo ser procesado. Esto puede deberse a:
        </p>

        {/* Lista de posibles causas */}
        <div className="text-left mb-8 space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm text-gray-600">
              Fondos insuficientes en tu cuenta
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm text-gray-600">
              Tarjeta bloqueada o vencida
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm text-gray-600">
              Datos de la tarjeta incorrectos
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm text-gray-600">
              Problemas temporales del sistema
            </p>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-[var(--primary-dark)] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[var(--primary)] transition-colors"
          >
            Intentar Nuevamente
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
            Si crees que esto es un error, por favor contacta a nuestro equipo de soporte.
          </p>
        </div>
      </div>
    </main>
  );
} 