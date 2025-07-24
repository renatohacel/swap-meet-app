import { Navigate, Route, Routes } from "react-router-dom"
import { CONSTANTS_ROUTES } from "../utils/constansRoutes"
import ProtectedRoute from "./ProtectedRoute"
import Recargas from "../modules/administracion/recargas/Recargas"

const RecargasRouter = () => {
    return (
        <Routes>
            <Route path="/" element={
                <ProtectedRoute module={'admin'} action={'view'} resource={'recargas'}>
                    <Recargas />
                </ProtectedRoute>
            } />
            <Route path='/*' element={<Navigate to={CONSTANTS_ROUTES.ADMIN.RECARGAS} />} />
        </Routes>
    )
}

export default RecargasRouter