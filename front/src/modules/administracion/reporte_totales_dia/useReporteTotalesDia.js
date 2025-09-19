import { useState } from "react";

export const useReporteTotalesDia = () => {

    const [loading, setLoading] = useState(false);

    const generarReporte = async () => {
        setLoading(true);
        try {
            // Lógica para generar el reporte
        } catch (error) {
            console.error("Error al generar el reporte:", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        generarReporte
    }
}
