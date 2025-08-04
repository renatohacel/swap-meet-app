import { Navigate, Route, Routes } from "react-router-dom"
import ProtectedRoute from "../ProtectedRoute"
import { CONSTANTS_ROUTES } from "../../utils/constansRoutes"
import AsignacionTianguis from "../../modules/administracion/asginacion_tianguis/AsignacionTianguis"
import AsignacionTianguisUser from "../../modules/administracion/asginacion_tianguis/AsignacionTianguisUser"

const AsignaTianguisRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={
                <ProtectedRoute module={'admin'} action={'view'} resource={'asignacion_tianguis'}>
                    <AsignacionTianguis />
                </ProtectedRoute>
            } />

            <Route path="/update" element={
                <ProtectedRoute module={'admin'} action={'view'} resource={'asignacion_tianguis'}>
                    <AsignacionTianguisUser />
                </ProtectedRoute>
            } />

            <Route path='/*' element={<Navigate to={CONSTANTS_ROUTES.ADMIN.ASIGNACION_TIANGUIS} />} />


        </Routes>

    )
}

export default AsignaTianguisRoutes