import { Toaster } from "react-hot-toast";

const Home = () => {
  return (
    <section className="flex flex-col justify-center items-center relative h-full">
      <Toaster />
      <img src="/src/assets/zapopan_logo_blanco.png" alt="Logo Zapopan" className="w-96 absolute z-1 bottom-1 mr-4" />
      <img src="/src/assets/fondo_tianguis_oscuro.webp" alt="Imagen aluciva de fondo" className="opacity-30 w-8xl" />
    </section>
  )
};
export default Home;