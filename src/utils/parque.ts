import { OficinaVentaCompleta } from "@/types/api";

/**
 * Convierte el nombre de un parque a un slug URL-friendly
 * Ejemplo: "Mampato Barnechea" -> "mampato-barnechea"
 */
export function nombreToSlug(nombre: string): string {
  return nombre
    .toLowerCase()
    .replace(/\s+/g, '-')           // Espacios a guiones
    .replace(/[^\w-]/g, '')         // Remover caracteres especiales
    .replace(/-+/g, '-')            // Múltiples guiones a uno solo
    .replace(/^-|-$/g, '');         // Remover guiones al inicio/final
}

/**
 * Convierte un slug a nombre legible
 * Ejemplo: "mampato-barnechea" -> "Mampato Barnechea"
 */
export function slugToNombre(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Busca una oficina por su slug
 */
export function buscarOficinaPorSlug(
  oficinas: OficinaVentaCompleta[], 
  slug: string
): OficinaVentaCompleta | undefined {
  return oficinas.find(oficina => 
    nombreToSlug(oficina.Nombre) === slug
  );
}