import toast from "react-hot-toast";
import { axiosInstance } from "../../../utils/axiosInstance";

export const printReporteTotalesDiaService = async (dia, fecha) => {
    try {
        const response = await axiosInstance.get(`/reportes/print/reporte-total-dia?dia_semana=${dia}&fecha=${encodeURIComponent(fecha)}`, {
            responseType: "blob",
        });

        // Verifica si el tipo de contenido es Excel
        const contentType = response.headers["content-type"];
        if (contentType && contentType.includes("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
            const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `reporte-totales-${fecha}.xlsx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => window.URL.revokeObjectURL(url), 15000);
        } else {
            // Si no es Excel, intenta leer el error como texto
            const reader = new FileReader();
            reader.onload = () => {
                throw new Error(reader.result);
            };
            reader.readAsText(response.data);
        }
    } catch (error) {
        if (error.response && error.response.data) {
            const reader = new FileReader();
            reader.onload = () => {
                toast.error(reader.result || "Error al imprimir reporte", { position: "top-right", duration: 3000 });
            };
            reader.readAsText(error.response.data);
        } else {
            return error;
        }
    }
}