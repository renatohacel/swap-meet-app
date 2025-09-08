import toast from "react-hot-toast";
import { axiosInstance } from "../../../../utils/axiosInstance";

export const getBoletosService = async () => {
    const response = await axiosInstance.get("/boletos");
    return response.data;
};

export const printBoletosService = async (id) => {
    try {
        const response = await axiosInstance.get(`/boletos/print/${id}`, {
            responseType: "blob",
        });

        // Verifica si el tipo de contenido es PDF
        const contentType = response.headers["content-type"];
        if (contentType && contentType.includes("application/pdf")) {
            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            window.open(url, "_blank");
            setTimeout(() => window.URL.revokeObjectURL(url), 10000);
        } else {
            // Si no es PDF, intenta leer el error como texto
            const reader = new FileReader();
            reader.onload = () => {
                throw new Error(reader.result);
            };
            reader.readAsText(response.data);
        }
    } catch (error) {
        // Si el backend responde con error, axios lanza excepción
        if (error.response && error.response.data) {
            const reader = new FileReader();
            reader.onload = () => {
                toast.error(reader.result || "Error al imprimir boletos", { position: "top-right", duration: 3000 });
                return
            };
            reader.readAsText(error.response.data);
        } else {
            throw error;
        }
    }
}