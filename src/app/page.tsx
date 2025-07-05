import { CardLocationPark } from "./components/CardLocationPark";
import api from "@/lib/axios";
import { OficinaVentaResponse } from "@/types/api";
import { nombreToSlug } from "@/utils/parque";

export default async function Page() {
  const response = await api.get<OficinaVentaResponse>("/api/OficinaVenta/ListarWeb");
  
  // Destructuring de la respuesta
  const { data: oficinas } = response.data;

  return (
    <main className="flex flex-col justify-center items-center gap-6 p-6">
      <h1 className="text-3xl font-bold text-[var(--secondary)]">Selecciona tu parque</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {oficinas.map((oficina) => (
          <CardLocationPark 
            key={oficina.OficinaVentaId}
            buttonText={oficina.Nombre}
            imageSrc={oficina.ImagenPortada}
            oficinaId={oficina.OficinaVentaId}
            slug={nombreToSlug(oficina.Nombre)}
          />
        ))}
      </div>
    </main>
  );
}
