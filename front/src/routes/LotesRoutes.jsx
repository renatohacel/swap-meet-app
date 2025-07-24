import { Navigate, Route, Routes } from "react-router-dom"
import GeneracionTarjetas from "../modules/administracion/generacion_lote_tarjetas/GeneracionTarjetas"
import { CONSTANTS_ROUTES } from "../utils/constansRoutes"
import GeneracionTarjetasForm from "../modules/administracion/generacion_lote_tarjetas/components/GeneracionTarjetasForm"
import { ListaTarjetasDetalle } from "../modules/administracion/generacion_lote_tarjetas/components/ListaTarjetasDetalle"
import ProtectedRoute from "./ProtectedRoute"

const LotesRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={
                <ProtectedRoute module={'admin'} action={'view'} resource={'generacion_tarjetas'}>
                    <GeneracionTarjetas />
                </ProtectedRoute>
            } />
            <Route path="/add" element={
                <ProtectedRoute module={'admin'} action={'create'} resource={'generacion_tarjetas'}>
                    <GeneracionTarjetasForm />
                </ProtectedRoute>
            } />
            <Route path="/update" element={
                <ProtectedRoute module={'admin'} action={'view'} resource={'generacion_tarjetas'}>
                    <GeneracionTarjetasForm />
                </ProtectedRoute>
            } />
            <Route path="/view" element={
                <ProtectedRoute module={'admin'} action={'view'} resource={'generacion_tarjetas'}>
                    <ListaTarjetasDetalle />
                </ProtectedRoute>
            } />

            <Route path='/*' element={<Navigate to={CONSTANTS_ROUTES.ADMIN.LOTES.GENERACION_TARJETAS} />} />
        </Routes>
    )
}

export default LotesRoutes