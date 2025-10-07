import { Navigate, Route, Routes } from "react-router-dom"
import { CONSTANTS_ROUTES } from "../../utils/constansRoutes"
import ProtectedRoute from "../ProtectedRoute"
import ReportePadronTianguis from "../../modules/administracion/reporte_padron_tianguis/ReportePadronTianguis"



const ReportePadronTianguisRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute module={'admin'} action={'create'} resource={'reportes_totales_dia'}>
          <ReportePadronTianguis />
        </ProtectedRoute>
      } />

      <Route path='/*' element={<Navigate to={CONSTANTS_ROUTES.ADMIN.REPORTES.TOTALES_POR_DIA} />} />

    </Routes>
  )
}

export default ReportePadronTianguisRoutes