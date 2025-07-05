export interface OficinaVentaResponse {
  codigo: number;
  mensaje: string;
  data: OficinaVentaCompleta[];
}

export interface OficinaVentaCompleta {
  OficinaVentaId: number;
  Nombre: string;
  PasarelaPagoId: number;
  TextoInfoPaginaVenta: string | null;
  TerminosCondicionesVenta: string;
  MaximoTicketsPorVenta: number;
  JornadaPorDefectoInicio: string;
  JornadaPorDefectoTermino: string;
  JornadaPorDefectoCupos: number;
  CerradoLunes: "SI" | "NO";
  CerradoMartes: "SI" | "NO";
  CerradoMiercoles: "SI" | "NO";
  CerradoJueves: "SI" | "NO";
  CerradoViernes: "SI" | "NO";
  CerradoSabado: "SI" | "NO";
  CerradoDomingo: "SI" | "NO";
  ImagenPortada: string;
}

// Tipos para la API de productos
export interface RangoHorario {
  Rangohorarioid: number;
  Oficinaventaid: number;
  Fecha: string;
  FechaStr: string;
  Horainicio: string;
  Horafin: string;
  Cupos: number;
  Utilizados: number;
}

export interface ProductosResponse {
  codigo: number;
  mensaje: string;
  data: {
    Productos: Producto[];
    JornadaExclusiva: unknown | null;
    CupoTotal: number;
    PermiteComprarSinRangoHorario: "SI" | "NO";
    RangosHorariosFecha: RangoHorario[];
  };
}

export interface Producto {
  OficinaVentaId: number;
  ProductoId: number;
  Nombre: string;
  Descripcion: string;
  Precio: number;
  Categoria: string;
  AfectoDescuento: "SI" | "NO";
  ColorFondo: string;
  ImagenFondo: string | null;
  OrdenPublicacion: number;
  ColorInterior: string;
}

// Tipos para la API de comunas
export interface ComunasResponse {
  codigo: number;
  mensaje: string;
  data: Comuna[];
}

export interface Comuna {
  ComunaId: number;
  Nombre: string;
}

// Tipo para react-select (transformado)
export interface ComunaOption {
  value: string;
  label: string;
}

// Tipos para el formulario de usuario
export interface UserFormData {
  nombre: string;
  apellidos: string;
  rut: string;
  email: string;
  confirmarEmail: string;
  telefono: string;
  comuna: ComunaOption;
  aceptaTerminos: boolean;
  aceptaPromociones: boolean;
}

// Tipos para el manejo de cantidades de tickets
export interface TicketQuantities {
  [productId: number]: number;
}

// Tipo para el request de productos
export interface ListaProductosRequest {
  OficinaVentaId: number;
  FechaAsistencia: string;
}

// Tipos para la API de límites de fechas
export interface ParamsFechasResponse {
  codigo: number;
  mensaje: string;
  data: {
    MaximoDiasAnticipacionCompra: number;
    FechasParqueCerrado: string[];
  };
}

// Tipo para los límites del calendario
export interface CalendarLimits {
  maxDaysAhead: number;
  closedDates: Date[];
}

// Tipos para la API de códigos de descuento
export interface CheckDiscountRequest {
  OficinaVentaId: number;
  Codigo: string;
}

export interface CheckDiscountResponse {
  codigo: number;
  mensaje: string;
  data: unknown; // Se actualizará cuando sepamos la estructura exacta
}

// Tipos para la API de WebPay
export interface ClientePago {
  NombreCompleto: string;
  Apellido: string;
  Rut: string;
  Email: string;
  Email2: string;
  Telefono: string;
  Comuna: string;
  AceptaRecibirInfo: "SI" | "NO";
  AceptaTerminos: "SI" | "NO";
}

export interface ProductoPago {
  Producto: string;
  ProductoId: number;
  Cantidad: number;
  Precio: number;
  AfectaDescuento: boolean;
}

export interface GenerarPagoRequest {
  Cliente: ClientePago;
  Descuento: unknown; // Se actualizará cuando sepamos la estructura del descuento
  FechaAsiste: string;
  HoraAsisteIni: string;
  HoraAsisteFin: string;
  OficinaVentaId: number;
  Productos: ProductoPago[];
  SubTotal: number;
  TotalDescuento: number;
  Total: number;
  TC: string;
}

export interface GenerarPagoResponse {
  codigo: number;
  mensaje: string;
  data: {
    UrlAction: string;
    Token: string;
  };
}