import { Toaster } from "react-hot-toast";
import LogoSecondary from "../ui/components/LogoSecondary";

const Home = () => {
  return <section className="flex flex-col justify-center items-center relative h-full">
    <Toaster />
    <LogoSecondary className={'w-96 absolute z-1 bottom-5'} />
    <img src="/src/assets/fondo_tianguis_oscuro.webp" alt="Imagen aluciva de fondo" className="opacity-25" />
  </section>
};
export default Home;