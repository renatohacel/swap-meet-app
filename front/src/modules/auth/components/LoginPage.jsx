import { FaUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import React, { useContext } from "react";
import { useForm } from "../../ui/hooks/useForm";
import { AuthContext } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../../ui/components/Logo";

const LoginPage = () => {
  const { handleLogin } = useContext(AuthContext);
  const { onInputChange, formState } = useForm({
    username: "",
    password: "",
  });

  const { username, password } = formState;

  const handleSubmit = (e) => {
    e.preventDefault(e);
    if (!username || !password) {
      toast.error("Por favor, completa todos los campos.", {
        duration: 1500,
        position: "top-right",
      });
      return;
    }
    handleLogin({ username, password });
  };

  return (
    <>
      <Toaster />
      <main className="grid md:grid-cols-2 items-center min-h-dvh bg-primary/20">

        {/* MODAL */}
        <div className="min-h-dvh flex items-center justify-center bg-primary/30 ">
          <div className="max-w-xs md:max-w-lg bg-primary/98 p-8 rounded-lg shadow-xl w-full">
            {/* LOGO */}
            <div className="flex items-center justify-center">
              <Logo className={'w-90 h-auto mb-5 -mt-5'} />
            </div>

            <hr className="mb-12 text-secondary-complement/40 border-1" />

            <h2 className="text-3xl text-secondary-complement font-medium text-center mb-6">
              Inicio de Sesión
            </h2>

            {/* Form */}
            <form method="post" className="space-y-6" onSubmit={handleSubmit}>
              {/* Username */}
              <div className="flex items-center gap-3">
                <FaUser className="text-secondary-complement" />
                <input
                  type="text"
                  placeholder="Usuario"
                  className="w-full px-4 py-2 bg-secondary-complement text-dark-primary placeholder-primary/80 rounded-lg outline-none focus:ring-2 focus:ring-dark-primary transition-all duration-200 font-semibold uppercase"
                  name="username"
                  value={username}
                  onChange={onInputChange}
                />
              </div>

              {/* Password */}
              <div className="flex items-center gap-3">
                <MdOutlinePassword className="text-gray-50" />
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="w-full px-4 py-2 bg-gray-50 text-dark-primary placeholder-primary/80 rounded-lg outline-none focus:ring-2 focus:ring-dark-primary transition-all duration-200 font-semibold uppercase"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-4 bg-dark-primary/70 text-white font-medium text-xl rounded-md hover:bg-dark-primary transition-all duration-300 outline-none hover:cursor-pointer mt-3"
              >
                INICIAR
              </button>
            </form>
          </div>
        </div>

        {/* FONDO */}
        <img src="/src/assets/fondo_tianguis_morado.png" alt="Imagen aluciva de fondo" className="-z-2 opacity-40 mb-48 w-auto hidden md:block mt-32" />
      </main>
    </>
  );
};

export default LoginPage;
