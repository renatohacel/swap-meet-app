import { useState } from "react"
import { useAuth } from "../../auth/hooks/useAuth";
import { printReporteTotalesGeneralesService } from "./reporteTotalesGeneralesService";

export const useReporteTotalesGenerales = () => {
    const { validateSession } = useAuth();
    const [loading, setLoading] = useState(false);

    const generarReporte = async () => {
        setLoading(true);
        try {
            await printReporteTotalesGeneralesService();
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
