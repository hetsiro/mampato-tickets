import { Producto, TicketQuantities } from '@/types/api';

interface TicketSelectorProps {
  productos: Producto[];
  ticketQuantities: TicketQuantities;
  onQuantityChange: (productId: number, quantity: number) => void;
  cupoTotal: number;
  totalSelected: number;
  maxTicketsPorVenta: number;
}

export function TicketSelector({
  productos,
  ticketQuantities,
  onQuantityChange,
  cupoTotal,
  totalSelected,
  maxTicketsPorVenta
}: TicketSelectorProps) {
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getTextColor = (backgroundColor: string) => {
    // Convertir hex a RGB
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calcular luminancia
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Retornar color de texto apropiado
    return luminance > 0.5 ? 'text-black' : 'text-white';
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-4 text-center">
        <div>Cupo disponible: {cupoTotal - totalSelected} / {cupoTotal}</div>
        <div>Máximo tickets por venta: {totalSelected} / {maxTicketsPorVenta}</div>
      </div>
      
      {productos.map((producto) => {
        const cantidad = ticketQuantities[producto.ProductoId] || 0;
        const maxQuantity = Math.min(
          cupoTotal - totalSelected + cantidad,
          maxTicketsPorVenta - totalSelected + cantidad
        );
        
        return (
          <div
            key={producto.ProductoId}
            className="rounded-lg p-6 shadow-md border-2 border-gray-200 hover:border-gray-300 hover:scale-105 transition-all duration-500"
            style={{ backgroundColor: producto.ColorInterior }}
          >
            <div className={`space-y-4 ${getTextColor(producto.ColorInterior)}`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{producto.Nombre}</h3>
                  <p className="text-sm mb-3">{producto.Descripcion}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{formatPrice(producto.Precio)}</span>
                    <span className="text-lg font-bold px-2 py-1 bg-white rounded-md" style={{ color: producto.ColorInterior }}>
                      {producto.Categoria}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Contador de cantidad */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Cantidad:</span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onQuantityChange(producto.ProductoId, cantidad - 1)}
                    disabled={cantidad <= 0}
                    className="w-10 h-10 rounded-full bg-white hover:bg-[var(--primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer flex items-center justify-center transition-colors"
                  >
                    <span className="text-xl font-bold" style={{ color: producto.ColorInterior }}>-</span>
                  </button>
                  
                  <span className="text-xl font-bold w-8 text-center">{cantidad}</span>
                  
                  <button
                    onClick={() => onQuantityChange(producto.ProductoId, cantidad + 1)}
                    disabled={cantidad >= maxQuantity}
                    className="w-10 h-10 rounded-full bg-white hover:bg-[var(--primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer flex items-center justify-center transition-colors"
                  >
                    <span className="text-xl font-bold" style={{ color: producto.ColorInterior }}>+</span>
                  </button>
                </div>
              </div>
              
              {/* Subtotal */}
              {cantidad > 0 && (
                <div className="pt-2 border-t border-white">
                  <div className="flex justify-between items-center">
                    <span className="text-md">Subtotal:</span>
                    <span className="text-xl font-bold">{formatPrice(producto.Precio * cantidad)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
} 