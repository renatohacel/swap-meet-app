import { FaUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import React, { useContext } from "react";
import { useForm } from "../../ui/hooks/useForm";
import { AuthContext } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

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
        position: "top-center",
      });
      return;
    }
    handleLogin({ username, password });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-primary/20">
      <Toaster />
      <div className="w-full max-w-xs md:max-w-lg bg-primary/80 p-8 rounded-lg shadow-xl">
        {/* Títles */}
        <h1 className="text-4xl md:text-6xl font-bold text-center text-secondary-complement mb-5">
          TIANGUIS
        </h1>
        <h2 className="text-3xl text-secondary-complement font-medium text-center mb-8">
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
              className="w-full px-4 py-2 bg-secondary-complement text-dark-primary placeholder-primary/80 rounded-lg outline-none focus:ring-2 focus:ring-dark-primary transition-all duration-200 font-semibold"
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
              className="w-full px-4 py-2 bg-gray-50 text-dark-primary placeholder-primary/80 rounded-lg outline-none focus:ring-2 focus:ring-dark-primary transition-all duration-200 font-semibold"
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
    </main>
  );
};

export default LoginPage;
