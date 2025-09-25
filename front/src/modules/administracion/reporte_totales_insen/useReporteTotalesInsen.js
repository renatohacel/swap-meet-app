import { useState } from "react"
import { useAuth } from "../../auth/hooks/useAuth";
import { printReporteTotalesInsenService } from "./reporteTotalesInsenService";

export const useReporteTotalesInsen = () => {
    const { validateSession } = useAuth();
    const [loading, setLoading] = useState(false);

    const generarReporte = async () => {
        setLoading(true);
        try {
            await printReporteTotalesInsenService();
        } catch (error) {
            validateSession(error);
        } finally {
            setLoading(false);
        }
    }


    return {
        loading,
        generarReporte,
    }
}
