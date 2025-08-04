import { Navigate, Route, Routes } from "react-router-dom"
import ProtectedRoute from "../ProtectedRoute"
import { CONSTANTS_ROUTES } from "../../utils/constansRoutes"
import { CapturarInsen } from "../../modules/administracion/capturar_insen/CapturarInsen"

const CapturarInsenRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={
                <ProtectedRoute module={'admin'} action={'view'} resource={'capturar_insen'}>
                    <CapturarInsen />
                </ProtectedRoute>
            } />

            <Route path='/*' element={<Navigate to={CONSTANTS_ROUTES.ADMIN.CAPTURAR_INSEN} />} />

        </Routes>

    )
}

export default CapturarInsenRoutes