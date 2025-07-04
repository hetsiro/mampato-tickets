"use client";

import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import api from "@/lib/axios";
import {
  ProductosResponse,
  ComunasResponse,
  TicketQuantities,
  UserFormData,
  ParamsFechasResponse,
  CalendarLimits,
  OficinaVentaResponse,
  OficinaVentaCompleta,
  ComunaOption,
  CheckDiscountRequest,
  CheckDiscountResponse,
  GenerarPagoRequest,
  GenerarPagoResponse,
  ClientePago,
} from "@/types/api";
import { TicketSelector } from "./components/TicketSelector";
import { UserForm } from "./components/UserForm";
import { DateSelector } from "./components/DateSelector";
import { comunasFallback } from "@/app/utils/comunasFallback";
import { MainLoading } from "@/app/components/MainLoading";
import Link from "next/link";

interface ParquePageProps {
  params: Promise<{
    slug: string; // mampato-barnechea, mampato-vizcachas, etc.
  }>;
}

// Fallback para obtener OficinaVentaId desde slug
const getOficinaIdFromSlug = (slug: string): number | null => {
  const slugToId: { [key: string]: number } = {
    "mampato-barnechea": 1,
    "mampato-vizcachas": 2,
  };
  return slugToId[slug] || null;
};

// Obtener fecha actual en formato requerido
const getCurrentDate = (): string => {
  const today = new Date();
  return today.toISOString().split("T")[0] + "T00:00:00";
};

export default function ParquePage({ params }: ParquePageProps) {
  const { slug } = use(params);

  // Estados
  const [productos, setProductos] = useState<ProductosResponse["data"] | null>(
    null
  );
  const [comunas, setComunas] = useState<ComunaOption[]>([]);
  const [ticketQuantities, setTicketQuantities] = useState<TicketQuantities>(
    {}
  );
  const [precioTotal, setPrecioTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [loadingProductos, setLoadingProductos] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [oficinaId, setOficinaId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarLimits, setCalendarLimits] = useState<CalendarLimits>({
    maxDaysAhead: 40, // Default fallback
    closedDates: [],
  });
  const [horarios, setHorarios] = useState<{
    inicio: string;
    termino: string;
  } | null>(null);
  const [oficinaActual, setOficinaActual] =
    useState<OficinaVentaCompleta | null>(null);
  const [codigoDescuento, setCodigoDescuento] = useState<string>("");
  const [descuentoAplicado, setDescuentoAplicado] = useState<number>(0);
  const [loadingDescuento, setLoadingDescuento] = useState<boolean>(false);
  const [loadingPago, setLoadingPago] = useState<boolean>(false);

  // Obtener OficinaVentaId
  useEffect(() => {
    const id = getOficinaIdFromSlug(slug);
    if (!id) {
      notFound();
    }
    setOficinaId(id);
  }, [slug]);

  // Función para obtener límites del calendario
  const fetchCalendarLimits = async () => {
    if (!oficinaId) return;

    try {
      const response = await api.get<ParamsFechasResponse>(
        `/api/OficinaVenta/listaParamsFechas/${oficinaId}`
      );

      const { MaximoDiasAnticipacionCompra, FechasParqueCerrado } =
        response.data.data;

      // Convertir fechas cerradas a objetos Date
      const closedDates = FechasParqueCerrado.map(
        (fechaStr) => new Date(fechaStr)
      );

      setCalendarLimits({
        maxDaysAhead: MaximoDiasAnticipacionCompra,
        closedDates,
      });
    } catch (err) {
      console.error("Error fetching calendar limits:", err);
      // Mantener valores por defecto en caso de error
      setCalendarLimits({
        maxDaysAhead: 40,
        closedDates: [],
      });
    }
  };

  // Función para obtener productos por fecha
  const fetchProductos = async (fecha: Date) => {
    if (!oficinaId) return;

    try {
      setLoadingProductos(true);

      const fechaFormateada = fecha.toISOString().split("T")[0] + "T00:00:00";

      const productosResponse = await api.post<ProductosResponse>(
        "/api/OficinaVenta/listaProductosWeb",
        {
          OficinaVentaId: oficinaId,
          FechaAsistencia: fechaFormateada,
        }
      );

      setProductos(productosResponse.data.data);

      // Actualizar horarios desde RangosHorariosFecha
      if (
        productosResponse.data.data.RangosHorariosFecha &&
        productosResponse.data.data.RangosHorariosFecha.length > 0
      ) {
        const rangoHorario = productosResponse.data.data.RangosHorariosFecha[0]; // Tomar el primer rango
        setHorarios({
          inicio: rangoHorario.Horainicio,
          termino: rangoHorario.Horafin,
        });
      }

      // Reinicializar cantidades de tickets en 0
      const initialQuantities: TicketQuantities = {};
      productosResponse.data.data.Productos.forEach((producto) => {
        initialQuantities[producto.ProductoId] = 0;
      });
      setTicketQuantities(initialQuantities);
    } catch (err) {
      console.error("Error fetching productos:", err);
      setError("Error al cargar los productos para la fecha seleccionada");
    } finally {
      setLoadingProductos(false);
    }
  };

  // Cargar datos iniciales
  useEffect(() => {
    const fetchInitialData = async () => {
      if (!oficinaId) return;

      try {
        setLoading(true);

        // Realizar peticiones en paralelo
        const [productosResponse, comunasResponse, oficinaResponse] =
          await Promise.all([
            api.post<ProductosResponse>("/api/OficinaVenta/listaProductosWeb", {
              OficinaVentaId: oficinaId,
              FechaAsistencia: getCurrentDate(),
            }),
            api
              .get<ComunasResponse>("/api/webutiles/listaComunas")
              .catch(() => null),
            api.get<OficinaVentaResponse>("/api/OficinaVenta/ListarWeb"),
          ]);

        setProductos(productosResponse.data.data);

        // Actualizar horarios desde RangosHorariosFecha
        if (
          productosResponse.data.data.RangosHorariosFecha &&
          productosResponse.data.data.RangosHorariosFecha.length > 0
        ) {
          const rangoHorario =
            productosResponse.data.data.RangosHorariosFecha[0]; // Tomar el primer rango
          setHorarios({
            inicio: rangoHorario.Horainicio,
            termino: rangoHorario.Horafin,
          });
        }

        // Intentar cargar comunas desde la API, si falla usar fallback
        if (comunasResponse) {
          setComunas(
            comunasResponse.data.data.map((comuna) => ({
              value: comuna.ComunaId.toString(),
              label: comuna.Nombre,
            }))
          );
        } else {
          console.warn("Error cargando comunas desde API, usando fallback");
          setComunas(
            comunasFallback.map((comuna) => ({
              value: comuna.ComunaId.toString(),
              label: comuna.Nombre,
            }))
          );
        }

        // Encontrar la oficina correspondiente y guardar toda la información
        const oficina = oficinaResponse.data.data.find(
          (o) => o.OficinaVentaId === oficinaId
        );
        if (oficina) {
          setOficinaActual(oficina);
        }

        // Inicializar cantidades de tickets en 0
        const initialQuantities: TicketQuantities = {};
        productosResponse.data.data.Productos.forEach((producto) => {
          initialQuantities[producto.ProductoId] = 0;
        });
        setTicketQuantities(initialQuantities);

        // Cargar límites del calendario por separado
        await fetchCalendarLimits();
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error al cargar los datos del parque");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [oficinaId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Efecto para cargar productos cuando cambia la fecha
  useEffect(() => {
    if (oficinaId && !loading) {
      fetchProductos(selectedDate);
    }
  }, [selectedDate, oficinaId, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  // Calcular precio total cuando cambian las cantidades
  useEffect(() => {
    if (!productos) return;

    const total = productos.Productos.reduce((sum, producto) => {
      const cantidad = ticketQuantities[producto.ProductoId] || 0;
      return sum + producto.Precio * cantidad;
    }, 0);

    setPrecioTotal(total);
  }, [ticketQuantities, productos]);

  // Manejar cambios en cantidades de tickets
  const handleQuantityChange = (productId: number, quantity: number) => {
    setTicketQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, quantity),
    }));
  };

  // Manejar cambio de fecha
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  // Manejar aplicación de código de descuento
  const handleAplicarDescuento = async () => {
    if (!codigoDescuento.trim()) {
      alert("Por favor ingresa un código de descuento");
      return;
    }

    if (!oficinaId) {
      alert("Error: No se pudo identificar la oficina de venta");
      return;
    }

    try {
      setLoadingDescuento(true);

      const requestBody: CheckDiscountRequest = {
        OficinaVentaId: oficinaId,
        Codigo: codigoDescuento.trim(),
      };

      const response = await api.post<CheckDiscountResponse>(
        "/api/webutiles/checkDiscount",
        requestBody
      );

      if (response.data.codigo === 1) {
        // Código válido - aquí se procesaría el descuento según la respuesta
        // Por ahora simulamos un descuento del 10%
        const descuento = precioTotal * 0.1;
        setDescuentoAplicado(descuento);
        alert(
          `Código de descuento aplicado: -$${descuento.toLocaleString("es-CL")}`
        );
      } else {
        // Código inválido
        alert(response.data.mensaje || "Código de descuento inválido");
        setDescuentoAplicado(0);
      }
    } catch (error) {
      console.error("Error al validar código de descuento:", error);
      alert(
        "Error al validar el código de descuento. Por favor intenta nuevamente."
      );
      setDescuentoAplicado(0);
    } finally {
      setLoadingDescuento(false);
    }
  };

  // Calcular precio final con descuento
  const precioFinal = precioTotal - descuentoAplicado;

  // Validar cupo total
  const totalTicketsSelected = Object.values(ticketQuantities).reduce(
    (sum, qty) => sum + qty,
    0
  );
  const cupoDisponible = productos?.CupoTotal || 0;
  const excedeCupo = totalTicketsSelected > cupoDisponible;
  const excedeMaxTickets =
    totalTicketsSelected > (oficinaActual?.MaximoTicketsPorVenta || 50);

  // Manejar submit del formulario
  const handleFormSubmit = async (formData: UserFormData) => {
    if (excedeCupo) {
      alert("La cantidad de tickets seleccionados excede el cupo disponible");
      return;
    }

    if (excedeMaxTickets) {
      alert(
        `La cantidad de tickets seleccionados excede el máximo permitido por venta (${
          oficinaActual?.MaximoTicketsPorVenta || 50
        } tickets)`
      );
      return;
    }

    if (totalTicketsSelected === 0) {
      alert("Debe seleccionar al menos un ticket");
      return;
    }

    if (!oficinaId || !productos || !horarios) {
      alert("Error: Faltan datos necesarios para procesar el pago");
      return;
    }

    try {
      setLoadingPago(true);

      // Preparar productos para el pago
      const productosPago = productos.Productos.filter(
        (producto) => (ticketQuantities[producto.ProductoId] || 0) > 0
      ).map((producto) => ({
        Producto: producto.Nombre,
        ProductoId: producto.ProductoId,
        Cantidad: ticketQuantities[producto.ProductoId] || 0,
        Precio: producto.Precio,
        AfectaDescuento: producto.AfectoDescuento === "SI",
      }));

      // Formatear fecha para la API
      const fechaFormateada = selectedDate.toISOString().split("T")[0];

      // Limpiar RUT (remover puntos y guión)
      const rutLimpio = formData.rut.replace(/[.-]/g, "");

      // Preparar datos del cliente
      const cliente: ClientePago = {
        NombreCompleto: formData.nombre,
        Apellido: formData.apellidos,
        Rut: rutLimpio,
        Email: formData.email,
        Email2: formData.confirmarEmail,
        Telefono: formData.telefono,
        Comuna: formData.comuna.label,
        AceptaRecibirInfo: formData.aceptaPromociones ? "SI" : "NO",
        AceptaTerminos: formData.aceptaTerminos ? "SI" : "NO",
      };

      // Preparar request para WebPay
      const requestBody: GenerarPagoRequest = {
        Cliente: cliente,
        Descuento: null, // Se actualizará cuando sepamos la estructura del descuento
        FechaAsiste: fechaFormateada,
        HoraAsisteIni: horarios.inicio,
        HoraAsisteFin: horarios.termino,
        OficinaVentaId: oficinaId,
        Productos: productosPago,
        SubTotal: precioTotal,
        TotalDescuento: descuentoAplicado,
        Total: precioFinal,
        TC: "",
      };

      // Realizar petición a WebPay
      const response = await api.post<GenerarPagoResponse>(
        "/api/wPayPlus/generarPago",
        requestBody
      );

      if (response.data.codigo === 0) {
        // Pago generado exitosamente - redirigir a WebPay
        const { UrlAction, Token } = response.data.data;

        // Crear formulario para redirigir a WebPay
        const form = document.createElement("form");
        form.method = "POST";
        form.action = UrlAction;
        form.style.display = "none";

        // Agregar el token como campo oculto
        const tokenInput = document.createElement("input");
        tokenInput.type = "hidden";
        tokenInput.name = "token_ws";
        tokenInput.value = Token;
        form.appendChild(tokenInput);

        // Agregar formulario al DOM y enviarlo
        document.body.appendChild(form);
        form.submit();
      } else {
        // Error al generar el pago
        alert(response.data.mensaje || "Error al generar el pago");
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Error al procesar el pago. Por favor intenta nuevamente.");
    } finally {
      setLoadingPago(false);
    }
  };

  if (loading) {
    return <MainLoading loading={false} />;
  }

  if (error || !productos) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error || "Error al cargar los datos del parque"}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Sección superior: Calendario y Tickets */}
        <div className="bg-white rounded-lg p-8 mb-12 w-full">
          <Link
            href="/"
            className="bg-[var(--primary-dark)] hover:bg-[var(--secondary)] text-xl text-white transition-all duration-500 cursor-pointer flex justify-center items-center w-full py-3 rounded-md mb-4"
          >
            <svg 
              viewBox="0 0 401.949 401.949" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mr-2"
            >
              <path 
                fill="currentColor" 
                d="M401.947,159.301c0-8.583-6.949-15.742-15.497-15.889l0,0H197.515c-7.021-1.589-12.309-7.886-12.309-15.369V78.976 c0-8.675-5.397-11.163-11.993-5.535L4.948,190.735c-6.598,5.634-6.598,14.847,0,20.479l168.262,117.29 c6.599,5.632,11.996,3.146,11.996-5.528v-49.067c0-8.673,7.097-15.771,15.771-15.771l185.201-0.276 c8.676-0.004,15.771-7.101,15.771-15.771L401.947,159.301z"
              />
            </svg>
            Cambiar de parque
          </Link>
          <div className="flex items-center justify-center gap-4 border-b-2 border-[var(--secondary)] pb-2 mb-4">
            {/* Título de la sección */}
            <h1 className="text-2xl md:text-3xl font-bold text-center text-[var(--secondary)]">
              COMPRA TUS TICKETS -{" "}
              {slug
                .replace("-", " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())
                .toUpperCase()}
            </h1>
          </div>

          {/* Grid para calendario y tickets */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calendario a la izquierda */}
            <div className="flex justify-center">
              <DateSelector
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
                loading={loadingProductos}
                calendarLimits={calendarLimits}
                horarios={horarios}
              />
            </div>

            {/* Tickets a la derecha */}
            <div>
              <h2 className="text-2xl font-semibold text-center mb-2">
                SELECCIONA TUS TICKETS{" "}
              </h2>

              {loadingProductos ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-4 text-gray-600">
                    Cargando tickets para la fecha seleccionada...
                  </p>
                </div>
              ) : (
                <TicketSelector
                  productos={productos.Productos}
                  ticketQuantities={ticketQuantities}
                  onQuantityChange={handleQuantityChange}
                  cupoTotal={productos.CupoTotal}
                  totalSelected={totalTicketsSelected}
                  maxTicketsPorVenta={
                    oficinaActual?.MaximoTicketsPorVenta || 50
                  }
                />
              )}

              {excedeCupo && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  <p>
                    La cantidad seleccionada excede el cupo disponible (
                    {cupoDisponible} tickets)
                  </p>
                </div>
              )}

              {excedeMaxTickets && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  <p>
                    La cantidad seleccionada excede el máximo permitido por
                    venta ({oficinaActual?.MaximoTicketsPorVenta || 50} tickets)
                  </p>
                </div>
              )}

              {/* Precio Total */}
              {totalTicketsSelected > 0 && (
                <div className="mt-6 p-4 bg-[var(--primary-dark)] text-white rounded-lg hover:scale-105 transition-all duration-500">
                  <h3 className="text-lg font-semibold mb-3">
                    Resumen de Compra
                  </h3>

                  {/* Desglose de tickets */}
                  <div className="space-y-2 mb-4">
                    {productos.Productos.map((producto) => {
                      const cantidad =
                        ticketQuantities[producto.ProductoId] || 0;
                      if (cantidad === 0) return null;

                      const subtotal = producto.Precio * cantidad;
                      return (
                        <div
                          key={producto.ProductoId}
                          className="flex justify-between items-center text-sm"
                        >
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{cantidad}x</span>
                            <span>{producto.Nombre}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-xs opacity-75">
                              ${producto.Precio.toLocaleString("es-CL")} c/u
                            </div>
                            <div className="font-semibold">
                              ${subtotal.toLocaleString("es-CL")}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Línea divisoria */}
                  <div className="border-t border-white/20 mb-3"></div>

                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm opacity-90">
                        {totalTicketsSelected} ticket
                        {totalTicketsSelected !== 1 ? "s" : ""} en total
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">
                        ${precioTotal.toLocaleString("es-CL")}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sección inferior: Formulario */}
        <div className="rounded-xl p-8 md:shadow-lg bg-[var(--primary-dark)]">
          <h2 className="text-xl md:text-3xl font-semibold mb-6 text-center text-white">
            Datos del Comprador
          </h2>

          <div className="max-w-2xl mx-auto">
            <UserForm
              comunas={comunas}
              onSubmit={handleFormSubmit}
              disabled={
                excedeCupo || excedeMaxTickets || totalTicketsSelected === 0
              }
              totalTicketsSelected={totalTicketsSelected}
              precioTotal={precioTotal}
              precioFinal={precioFinal}
              descuentoAplicado={descuentoAplicado}
              codigoDescuento={codigoDescuento}
              onCodigoDescuentoChange={setCodigoDescuento}
              onAplicarDescuento={handleAplicarDescuento}
              loadingDescuento={loadingDescuento}
              loadingPago={loadingPago}
              productos={productos?.Productos || []}
              terminosCondiciones={
                oficinaActual?.TerminosCondicionesVenta || ""
              }
              ticketQuantities={ticketQuantities}
              selectedDate={selectedDate}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
