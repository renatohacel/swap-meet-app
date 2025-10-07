/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useAuth } from "../../auth/hooks/useAuth"
import { printPadronTianguisService } from "./reportePadronTianguisService"

export const useReportePadronTianguis = () => {

    const { validateSession } = useAuth()

    const [loading, setLoading] = useState(false)

    const printPadronTianguis = async (id) => {
        setLoading(true);
        try {
            await printPadronTianguisService(id);
        } catch (error) {
            validateSession(error);
        } finally {
            setLoading(false);
        }
    }


    return {
        loading,
        printPadronTianguis
    }
}
