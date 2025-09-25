import { Navigate, Route, Routes } from "react-router-dom"
import { CONSTANTS_ROUTES } from "../../utils/constansRoutes"
import ProtectedRoute from "../ProtectedRoute"
import ReporteTotalesGenerales from "../../modules/administracion/reporte_totales_generales/ReporteTotalesGenerales"

const ReporteTotalesGeneralesRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={
                <ProtectedRoute module={'admin'} action={'create'} resource={'reportes_totales_generales'}>
                    <ReporteTotalesGenerales />
                </ProtectedRoute>
            } />

            <Route path='/*' element={<Navigate to={CONSTANTS_ROUTES.ADMIN.REPORTES.TOTALES_GENERALES} />} />

        </Routes>
    )
}

export default ReporteTotalesGeneralesRoutes