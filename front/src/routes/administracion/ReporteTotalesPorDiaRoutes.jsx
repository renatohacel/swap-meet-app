import { Navigate, Route, Routes } from "react-router-dom"
import { CONSTANTS_ROUTES } from "../../utils/constansRoutes"
import ProtectedRoute from "../ProtectedRoute"
import ReporteTotalesDia from "../../modules/administracion/reporte_totales_dia/ReporteTotalesDia"

const ReporteTotalesPorDiaRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={
                <ProtectedRoute module={'admin'} action={'create'} resource={'reportes_totales_dia'}>
                    <ReporteTotalesDia />
                </ProtectedRoute>
            } />

            <Route path='/*' element={<Navigate to={CONSTANTS_ROUTES.ADMIN.REPORTES.TOTALES_POR_DIA} />} />

        </Routes>
    )
}

export default ReporteTotalesPorDiaRoutes