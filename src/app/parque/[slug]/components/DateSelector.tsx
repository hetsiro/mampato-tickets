"use client";

import { useState } from "react";
import { CalendarLimits } from "@/types/api";

interface DateSelectorProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  loading?: boolean;
  calendarLimits?: CalendarLimits;
  horarios?: {
    inicio: string;
    termino: string;
  } | null;
}

export function DateSelector({
  selectedDate,
  onDateChange,
  loading = false,
  calendarLimits = { maxDaysAhead: 40, closedDates: [] },
  horarios = null,
}: DateSelectorProps) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-CL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Días del mes anterior para llenar el inicio
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({ date, isCurrentMonth: false });
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({ date, isCurrentMonth: true });
    }

    // Días del mes siguiente para llenar el final
    const remainingDays = 42 - days.length; // 6 semanas × 7 días
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push({ date, isCurrentMonth: false });
    }

    return days;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateDisabled = (date: Date) => {
    // Fecha pasada
    if (isPastDate(date)) return true;

    // Excede el máximo de días de anticipación
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + calendarLimits.maxDaysAhead);
    if (date > maxDate) return true;

    // Fecha en la lista de fechas cerradas
    const isClosedDate = calendarLimits.closedDates.some((closedDate) => {
      const normalizedClosedDate = new Date(closedDate);
      normalizedClosedDate.setHours(0, 0, 0, 0);
      return date.toDateString() === normalizedClosedDate.toDateString();
    });

    return isClosedDate;
  };

  const handleDateClick = (date: Date) => {
    const dayInfo = getDaysInMonth(currentMonth).find(
      (d) => d.date.toDateString() === date.toDateString()
    );
    if (!dayInfo?.isCurrentMonth || isDateDisabled(date)) return;
    onDateChange(date);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  return (
    <div>
      {/* Título y fecha seleccionada */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          SELECCIONA TU FECHA DE VISITA
        </h3>
        <p className="text-xs text-gray-500 mb-2">
          Disponible hasta {calendarLimits.maxDaysAhead} días de anticipación
          {calendarLimits.closedDates.length > 0 && (
            <span className="block mt-1">
              <span className="text-red-500">✕</span> Fechas con parque cerrado
            </span>
          )}
        </p>
        <div className="text-sm md:text-lg text-white bg-[var(--primary-dark)] px-3 py-2 rounded-lg mb-2 text-center">
          <p>{formatDate(selectedDate)}</p>
          {horarios && (
            <p className="text-xs md:text-sm opacity-90 mt-1">
              Horario: {horarios.inicio} - {horarios.termino}
            </p>
          )}
        </div>
      </div>

      {/* Calendario siempre visible */}
      <div className="bg-white md:border-2 md:border-gray-200 md:rounded-xl md:shadow-lg border-none shadow-none p-2 md:p-6 max-w-sm mx-auto">
        {/* Header del calendario */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePrevMonth}
            disabled={loading}
            className={`p-2 rounded-lg transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <h3 className="text-lg font-semibold text-gray-800">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>

          <button
            onClick={handleNextMonth}
            disabled={loading}
            className={`p-2 rounded-lg transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-1 mb-3">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center text-xs md:text-sm font-semibold text-gray-600 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Días del mes */}
        <div className="grid grid-cols-7 gap-1">
          {getDaysInMonth(currentMonth).map(
            ({ date, isCurrentMonth }, index) => {
              const isDisabled = isDateDisabled(date);
              const isSelectedDay = isSelected(date);
              const isTodayDay = isToday(date);
              const isPast = isPastDate(date);

              // Determinar si es una fecha cerrada del parque
              const isClosedParkDate = calendarLimits.closedDates.some(
                (closedDate) => {
                  const normalizedClosedDate = new Date(closedDate);
                  normalizedClosedDate.setHours(0, 0, 0, 0);
                  return (
                    date.toDateString() === normalizedClosedDate.toDateString()
                  );
                }
              );

              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(date)}
                  disabled={isDisabled || !isCurrentMonth || loading}
                  className={`
                  h-12 w-12 text-xs md:text-sm rounded-lg font-medium transition-all duration-200 relative
                  ${
                    !isCurrentMonth
                      ? "text-gray-300 cursor-not-allowed"
                      : isDisabled
                      ? isPast
                        ? "text-gray-400 cursor-not-allowed bg-gray-50"
                        : isClosedParkDate
                        ? "text-red-500 cursor-not-allowed bg-red-50 border border-red-200"
                        : "text-gray-400 cursor-not-allowed bg-gray-50"
                      : isSelectedDay
                      ? "bg-blue-600 text-white shadow-lg scale-105 font-bold ring-2 ring-blue-300"
                      : isTodayDay
                      ? "bg-blue-100 text-blue-700 font-bold border-2 border-blue-300 hover:bg-blue-200"
                      : "text-gray-700 hover:bg-gray-100 hover:scale-105 hover:shadow-md"
                  }
                  ${loading ? "opacity-50" : ""}
                `}
                  title={
                    !isCurrentMonth
                      ? "Mes diferente"
                      : isPast
                      ? "Fecha pasada"
                      : isClosedParkDate
                      ? "Parque cerrado"
                      : isDisabled
                      ? "Fecha no disponible"
                      : isTodayDay
                      ? "Hoy"
                      : ""
                  }
                >
                  <span className="relative z-10">{date.getDate()}</span>
                  {isSelectedDay && (
                    <div className="absolute inset-0 rounded-lg bg-blue-600 opacity-20 animate-pulse"></div>
                  )}
                  {isClosedParkDate && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs">✕</span>
                    </div>
                  )}
                </button>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
