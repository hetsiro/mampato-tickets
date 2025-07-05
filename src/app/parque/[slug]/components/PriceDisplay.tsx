interface PriceDisplayProps {
  precioTotal: number;
  totalTickets: number;
  show: boolean;
}

export function PriceDisplay({ precioTotal, totalTickets, show }: PriceDisplayProps) {
  if (!show) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm text-gray-600">
              {totalTickets} {totalTickets === 1 ? 'ticket seleccionado' : 'tickets seleccionados'}
            </p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">
              Total: {formatPrice(precioTotal)}
            </p>
          </div>
          
          <div className="text-center sm:text-right">
            <p className="text-sm text-gray-600 mb-2 hidden sm:block">
              Precio por ticket desde {formatPrice(Math.min(...[precioTotal / totalTickets]))}
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('formulario-usuario');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold transition-colors w-full sm:w-auto"
            >
              Continuar con la compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 