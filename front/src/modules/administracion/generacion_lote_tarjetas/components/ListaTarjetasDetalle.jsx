import { useLocation } from "react-router-dom"
import { CONSTANTS_ROUTES } from "../../../../utils/constansRoutes"
import { CardMain } from "../../../ui/components/cards/CardMain"
import { useEffect, useState } from "react";
import { useTarjetas } from "../hooks/useTarjetas";
import Loader from "../../../ui/components/Loader";
import Table from "../../../ui/components/table/Table";

const COLUMNS = ['ID', 'FECHA DE REGISTRO', 'NÚMERO DE TARJETA', 'ESTATUS', 'NO. DE LOTE']
const FIELDS = ['id', 'fecha', 'numero_tarjeta', 'estatus', 'id_lote']

export const ListaTarjetasDetalle = () => {
    const location = useLocation();
    const { getTarjetas, tarjetas, loading } = useTarjetas();
    const [tarjetasCleaned, setTarjetasCleaned] = useState([])


    useEffect(() => {
        const { id } = location.state.lote
        getTarjetas(id);
    }, [])

    useEffect(() => {
        if (tarjetas.length > 0) {
            const cleanedTarjetas = tarjetas.map((tarjeta) => ({
                id: tarjeta.IdTarjetaGD,
                fecha: new Date(tarjeta.FechaRegistro).toLocaleString('es-MX', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                }),
                numero_tarjeta: tarjeta.NumerodeTarjeta,
                estatus: tarjeta.Estatus,
                id_lote: tarjeta.IdLote
            }));
            setTarjetasCleaned(cleanedTarjetas);
        }
    }, [tarjetas]);

    return (
        <CardMain formTitle="DETALLE DE TARJETAS" cancelButton={true}>
            {loading ? (
                <div className="flex justify-center items-center">
                    <Loader className="w-32 opacity-60 text-primary" />
                </div>
            ) : (
                <Table
                    columns={COLUMNS}
                    data={tarjetasCleaned}
                    filterFields={FIELDS}
                    addLink={"add"}
                    editFunction={''}
                    showNuevo={false}
                    showAcciones={false}
                />
            )}
        </CardMain>
    )
}
