import { useState } from "react";
import { printReporteTotalesDiaService } from "./reporteTotalesDiaService";
import { useAuth } from "../../auth/hooks/useAuth";

export const useReporteTotalesDia = () => {
    const { validateSession } = useAuth();

    const [loading, setLoading] = useState(false);

    const generarReporte = async (dia, fecha) => {
        try {
            setLoading(true);
            await printReporteTotalesDiaService(dia, fecha);
        } catch (error) {
            validateSession(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        generarReporte
    }
}
