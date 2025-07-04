import { evogria } from "./fonts";
import { CardLocationPark } from "./components/CardLocationPark";

export default function Page() {
  return (
    <main
      className={`${evogria.className} flex flex-col flex-grow justify-center items-center h-full w-9/10 bg-white md:w-[980px] mx-auto rounded-t-md gap-10 p-10`}
    >
      <h1 className="text-center text-[clamp(1rem,6vw,3rem)] font-bold text-[var(--primary-dark)]">
        Selecciona el parque
      </h1>
      <section className="flex flex-col md:flex-row gap-10">
        <CardLocationPark buttonText="MAMPATO BARNECHEA" />
        <CardLocationPark buttonText="MAMPATO VIZCACHAS" />
      </section>
    </main>
  );
}
