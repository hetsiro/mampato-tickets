import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-[var(--primary-dark)] mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Parque no encontrado
          </h2>
          <p className="text-gray-600 mb-8">
            Lo sentimos, el parque que buscas no existe o ha sido movido.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-block bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Volver al inicio
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>¿Necesitas ayuda? Contáctanos:</p>
            <p>📞 +56 2 2XXX XXXX</p>
            <p>📧 info@mampato.cl</p>
          </div>
        </div>
      </div>
    </main>
  );
} 