import { axiosInstance } from "../../../utils/axiosInstance";

export const printReporteTotalesGeneralesService = async () => {
    const response = await axiosInstance.get(`/reportes/print/reporte-total-generales`, {
        responseType: "blob",
    });

    // Obtener fecha actual para el nombre
    const now = new Date();
    const fechaActual = now.toISOString().slice(0, 10);

    // Verifica si el tipo de contenido es Excel
    const contentType = response.headers["content-type"];
    if (contentType && contentType.includes("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
        const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `reporte-total-generales-${fechaActual}.xlsx`;
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
}
