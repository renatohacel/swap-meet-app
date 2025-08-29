import { Navigate, Route, Routes } from "react-router-dom"
import Boletos from "../../modules/administracion/boletos/Boletos"
import { CONSTANTS_ROUTES } from "../../utils/constansRoutes"
import ProtectedRoute from "../ProtectedRoute"

const BoletosRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={
                <ProtectedRoute module={'admin'} action={'create'} resource={'boletos'}>
                    <Boletos />
                </ProtectedRoute>
            } />

            <Route path='/*' element={<Navigate to={CONSTANTS_ROUTES.ADMIN.BOLETOS} />} />

        </Routes>
    )
}

export default BoletosRoutes