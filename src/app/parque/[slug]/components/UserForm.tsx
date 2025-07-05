"use client";

import { useForm } from "react-hook-form";
import { ComunaOption, UserFormData } from "@/types/api";
import { useState, useMemo } from "react";

interface UserFormProps {
  comunas: ComunaOption[];
  onSubmit: (data: UserFormData) => void;
  disabled: boolean;
  // Props para el resumen de compra
  totalTicketsSelected?: number;
  precioTotal?: number;
  precioFinal?: number;
  descuentoAplicado?: number;
  codigoDescuento?: string;
  onCodigoDescuentoChange?: (value: string) => void;
  onAplicarDescuento?: () => void;
  loadingDescuento?: boolean;
  loadingPago?: boolean;
  productos?: any[];
  ticketQuantities?: { [key: number]: number };
  selectedDate?: Date;
}

export function UserForm({
  comunas,
  onSubmit,
  disabled,
  totalTicketsSelected = 0,
  precioTotal = 0,
  precioFinal = 0,
  descuentoAplicado = 0,
  codigoDescuento = "",
  onCodigoDescuentoChange,
  onAplicarDescuento,
  loadingDescuento = false,
  loadingPago = false,
  productos = [],
  ticketQuantities = {},
  selectedDate,
}: UserFormProps) {
  const [showComunas, setShowComunas] = useState(false);
  const [comunaInput, setComunaInput] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    watch,
    setValue,
  } = useForm<UserFormData>({
    mode: "onSubmit",
  });

  const email = watch("email");

  // Filtrar comunas basado en el input
  const filteredComunas = useMemo(() => {
    if (!comunaInput.trim()) return comunas.slice(0, 10); // Mostrar solo las primeras 10 si no hay input

    return comunas
      .filter((comuna) =>
        comuna.label.toLowerCase().includes(comunaInput.toLowerCase())
      )
      .slice(0, 10); // Limitar a 10 resultados
  }, [comunas, comunaInput]);

  const handleComunaSelect = (comuna: ComunaOption) => {
    setValue("comuna", comuna);
    setComunaInput(comuna.label);
    setShowComunas(false);
  };

  const handleComunaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setComunaInput(value);
    setShowComunas(true);

    // Si el usuario borra todo, limpiar la selección
    if (!value.trim()) {
      setValue("comuna", {} as ComunaOption);
    }
  };

  const formatRut = (value: string) => {
    // Remover caracteres no numéricos excepto K
    const cleanValue = value.replace(/[^0-9kK]/g, "");

    // Limitar a 9 caracteres (8 dígitos + 1 dígito verificador)
    if (cleanValue.length > 9) return value.slice(0, -1);

    // Formatear con puntos y guión
    if (cleanValue.length <= 1) return cleanValue;

    const body = cleanValue.slice(0, -1);
    const dv = cleanValue.slice(-1);

    // Agregar puntos cada 3 dígitos
    const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `${formattedBody}-${dv}`;
  };

  const validateRut = (value: string) => {
    // Remover puntos y guión para validar
    const cleanRut = value.replace(/[.-]/g, "");

    // Verificar longitud
    if (cleanRut.length < 8 || cleanRut.length > 9) {
      return "El RUT debe tener entre 8 y 9 dígitos";
    }

    // Verificar formato básico
    const rutPattern = /^[0-9]{7,8}[0-9kK]$/;
    if (!rutPattern.test(cleanRut)) {
      return "Formato de RUT inválido";
    }

    // Validar dígito verificador
    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1).toUpperCase();

    // Calcular dígito verificador
    let suma = 0;
    let multiplicador = 2;

    for (let i = body.length - 1; i >= 0; i--) {
      suma += parseInt(body[i]) * multiplicador;
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resto = suma % 11;
    let dvCalculado: string;

    if (resto === 0) {
      dvCalculado = "0";
    } else if (resto === 1) {
      dvCalculado = "K";
    } else {
      dvCalculado = (11 - resto).toString();
    }

    if (dv !== dvCalculado) {
      return "El dígito verificador no es válido";
    }

    return true;
  };

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatRut(e.target.value);
    setValue("rut", formattedValue, {
      shouldValidate: isSubmitted, // Solo validar si ya se ha hecho submit
    });
  };

  return (
    <form
      id="formulario-usuario"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      {/* Nombre */}
      <div>
        <label
          htmlFor="nombre"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nombre *
        </label>
        <input
          id="nombre"
          type="text"
          {...register("nombre", {
            required: "El nombre es obligatorio",
            minLength: {
              value: 2,
              message: "El nombre debe tener al menos 2 caracteres",
            },
          })}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.nombre ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Ingresa tu nombre"
        />
        {errors.nombre && (
          <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>
        )}
      </div>

      {/* Apellidos */}
      <div>
        <label
          htmlFor="apellidos"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Apellidos *
        </label>
        <input
          id="apellidos"
          type="text"
          {...register("apellidos", {
            required: "Los apellidos son obligatorios",
            minLength: {
              value: 2,
              message: "Los apellidos deben tener al menos 2 caracteres",
            },
          })}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.apellidos ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Ingresa tus apellidos"
        />
        {errors.apellidos && (
          <p className="mt-1 text-sm text-red-600">
            {errors.apellidos.message}
          </p>
        )}
      </div>

      {/* RUT */}
      <div>
        <label
          htmlFor="rut"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          RUT *
        </label>
        <input
          id="rut"
          type="text"
          {...register("rut", {
            required: "El RUT es obligatorio",
            validate: validateRut,
          })}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.rut ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="12345678-9"
          onChange={handleRutChange}
        />
        {errors.rut && (
          <p className="mt-1 text-sm text-red-600">{errors.rut.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email *
        </label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "El email es obligatorio",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Formato de email inválido",
            },
          })}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="ejemplo@correo.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Confirmar Email */}
      <div>
        <label
          htmlFor="confirmarEmail"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Confirmar Email *
        </label>
        <input
          id="confirmarEmail"
          type="email"
          {...register("confirmarEmail", {
            required: "La confirmación de email es obligatoria",
            validate: (value) => value === email || "Los emails no coinciden",
          })}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.confirmarEmail ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Repite tu email"
        />
        {errors.confirmarEmail && (
          <p className="mt-1 text-sm text-red-600">
            {errors.confirmarEmail.message}
          </p>
        )}
      </div>

      {/* Teléfono */}
      <div>
        <label
          htmlFor="telefono"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Teléfono *
        </label>
        <input
          id="telefono"
          type="tel"
          {...register("telefono", {
            required: "El teléfono es obligatorio",
            pattern: {
              value: /^[0-9]{8,9}$/,
              message: "El teléfono debe tener 8 o 9 dígitos",
            },
          })}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.telefono ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="912345678"
        />
        {errors.telefono && (
          <p className="mt-1 text-sm text-red-600">{errors.telefono.message}</p>
        )}
      </div>

      {/* Comuna */}
      <div className="relative">
        <label
          htmlFor="comuna"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Comuna *
        </label>
        <input
          id="comuna"
          type="text"
          value={comunaInput}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.comuna ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Buscar o escribir comuna..."
          onFocus={() => setShowComunas(true)}
          onBlur={() => setTimeout(() => setShowComunas(false), 200)}
          onChange={handleComunaInputChange}
        />

        {/* Dropdown de autocompletado */}
        {showComunas && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {filteredComunas.length > 0 ? (
              filteredComunas.map((comuna) => (
                <button
                  key={comuna.value}
                  type="button"
                  className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  onClick={() => handleComunaSelect(comuna)}
                >
                  {comuna.label}
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500">
                No se encontraron comunas
              </div>
            )}
          </div>
        )}

        {errors.comuna && (
          <p className="mt-1 text-sm text-red-600">{errors.comuna.message}</p>
        )}
      </div>

      {/* Términos y Condiciones */}
      <div className="space-y-3">
        <div className="flex items-start space-x-2">
          <input
            id="aceptaTerminos"
            type="checkbox"
            {...register("aceptaTerminos", {
              required: "Debe aceptar los términos y condiciones",
            })}
            className="mt-1"
          />
          <label htmlFor="aceptaTerminos" className="text-sm text-gray-700">
            Acepto los términos y condiciones *
          </label>
        </div>
        {errors.aceptaTerminos && (
          <p className="text-sm text-red-600">
            {errors.aceptaTerminos.message}
          </p>
        )}

        <div className="flex items-start space-x-2">
          <input
            id="aceptaPromociones"
            type="checkbox"
            {...register("aceptaPromociones")}
            className="mt-1"
          />
          <label htmlFor="aceptaPromociones" className="text-sm text-gray-700">
            Acepto recibir promociones y novedades
          </label>
        </div>
      </div>

      {/* Resumen de Compra */}
      <div className="mt-6 p-4 bg-[var(--primary-dark)] text-white rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-center">
          Resumen de Compra
        </h3>

        {totalTicketsSelected > 0 ? (
          <>
            {/* Desglose de tickets */}
            <div className="space-y-2 mb-4">
              {productos.map((producto: any) => {
                const cantidad = ticketQuantities[producto.ProductoId] || 0;
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

            {/* Código de Descuento */}
            <div className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={codigoDescuento}
                  onChange={(e) => onCodigoDescuentoChange?.(e.target.value)}
                  placeholder="Código de descuento (opcional)"
                  className="flex-1 px-3 py-2 rounded-lg text-gray-800 text-sm bg-white w-full"
                />
                <button
                  type="button"
                  onClick={onAplicarDescuento}
                  disabled={loadingDescuento}
                  className={`px-4 py-2 font-semibold rounded-lg text-sm transition-colors ${
                    loadingDescuento
                      ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                      : 'bg-yellow-300 hover:bg-yellow-100 cursor-pointer text-[var(--primary-dark)]'
                  }`}
                >
                  {loadingDescuento ? 'Validando...' : 'Aplicar'}
                </button>
              </div>
            </div>

            {/* Subtotal y Descuento */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Subtotal:</span>
                <span className="font-semibold">
                  ${precioTotal.toLocaleString("es-CL")}
                </span>
              </div>
              {descuentoAplicado > 0 && (
                <div className="flex justify-between items-center text-green-300">
                  <span className="text-sm">Descuento:</span>
                  <span className="font-semibold">
                    -${descuentoAplicado.toLocaleString("es-CL")}
                  </span>
                </div>
              )}
            </div>

            {/* Línea divisoria */}
            <div className="border-t border-white/20 mb-3"></div>

            {/* Total Final */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm">
                  {totalTicketsSelected} ticket
                  {totalTicketsSelected !== 1 ? "s" : ""} en total
                </p>
                {selectedDate && (
                  <p className="text-xs opacity-75">
                    Fecha: {selectedDate.toLocaleDateString("es-CL")}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">
                  ${precioFinal.toLocaleString("es-CL")}
                </p>
                <p className="text-sm opacity-75">Total a pagar</p>
              </div>
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={disabled || loadingPago}
              className={`w-full py-3 px-4 rounded-md font-semibold transition-colors ${
                disabled || loadingPago
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-300 hover:bg-yellow-100 cursor-pointer"
              }`}
              style={{
                color: "var(--primary-dark)",
              }}
            >
              {loadingPago
                ? "Procesando pago..."
                : disabled
                ? "Selecciona tickets para continuar"
                : "Proceder al Pago"}
            </button>
          </>
        ) : (
          /* Mensaje cuando no hay tickets seleccionados */
          <div className="text-center py-8">
            <div className="text-4xl mb-3">🎫</div>
            <p className="text-lg font-medium mb-2">Por favor selecciona tickets</p>
            <p className="text-sm opacity-75">
              Ve arriba y elige la cantidad de tickets que deseas comprar
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
