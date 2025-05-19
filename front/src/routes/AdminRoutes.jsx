import { Navigate, Route, Routes } from "react-router-dom"
import GeneracionTarjetas from "../modules/administracion/GeneracionTarjetas"

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/generacion-tarjetas" element={<GeneracionTarjetas />} />

            <Route path='/*' element={<Navigate to={'/home'} />} />

        </Routes>
    )
}

export default AdminRoutes