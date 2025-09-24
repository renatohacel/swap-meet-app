
import { Navigate, Route, Routes } from "react-router-dom"
import { CONSTANTS_ROUTES } from "../../utils/constansRoutes"
import ProtectedRoute from "../ProtectedRoute"
import ReporteTotalesInsen from "../../modules/administracion/reporte_totales_insen/ReporteTotalesInsen"

const ReporteTotalesPorInsenRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={
                <ProtectedRoute module={'admin'} action={'create'} resource={'reportes_totales_insen'}>
                    <ReporteTotalesInsen />
                </ProtectedRoute>
            } />

            <Route path='/*' element={<Navigate to={CONSTANTS_ROUTES.ADMIN.REPORTES.TOTALES_POR_INSEN} />} />

        </Routes>
    )
}

export default ReporteTotalesPorInsenRoutes