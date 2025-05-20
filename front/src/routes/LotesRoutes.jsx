import { Navigate, Route, Routes } from "react-router-dom"
import GeneracionTarjetas from "../modules/administracion/generacion_lote_tarjetas/GeneracionTarjetas"
import { CONSTANTS_ROUTES } from "../utils/constansRoutes"
import GeneracionTarjetasForm from "../modules/administracion/generacion_lote_tarjetas/components/GeneracionTarjetasForm"

const LotesRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<GeneracionTarjetas />} />
            <Route path="/add" element={<GeneracionTarjetasForm />} />


            <Route path='/*' element={<Navigate to={CONSTANTS_ROUTES.ADMIN.LOTES.GENERACION_TARJETAS} />} />
        </Routes>
    )
}

export default LotesRoutes