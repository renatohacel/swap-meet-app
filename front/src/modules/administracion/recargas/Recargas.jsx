import { useEffect, useState } from "react";
import { CardMain } from "../../ui/components/cards/CardMain"
import { useRecargas } from "./hooks/useRecargas"
import Loader from "../../ui/components/Loader";
import Table from "../../ui/components/table/Table";
import { usePolling } from "../../ui/hooks/usePolling";

const COLUMNS = ['ID', 'FECHA DE ALTA', 'USUARIO', 'NUMERO DE TARJETA', 'IMPORTE', 'TIPO', 'TRANSACCIÓN SIR'];

const FIELDS = ['id', 'fecha', 'usuario', 'num_tarjeta', 'importe', 'tipo', 'transaccion_sir'];


const Recargas = () => {

    const { recargas, loading, getRecargas, isInitialLoad } = useRecargas();
    const [recargasCleaned, setRecargasCleaned] = useState([]);

    // Carga inicial
    useEffect(() => {
        getRecargas(false);
    }, []);

    // Polling
    usePolling(() => getRecargas(true), 3000);



    useEffect(() => {
        if (recargas.length > 0) {
            const cleanedRecargas = recargas.map((recarga) => ({
                id: recarga.IdPagoTarjeta,
                fecha: new Date(recarga.FechaAlta).toLocaleString('es-MX', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                }),
                usuario: recarga.Usuario,
                num_tarjeta: recarga.NumeroTarjeta,
                importe: recarga.Importe,
                tipo: recarga.Tipo,
                transaccion_sir: recarga.TransaccionSIR,
            }));
            setRecargasCleaned(cleanedRecargas);
        }
    }, [recargas])


    return (
        <CardMain title="RECARGAS"> 
            {(loading && isInitialLoad) ? (
                <div className="flex justify-center items-center">
                    <Loader className="w-32 opacity-60 text-primary" />
                </div>
            ) : (
                <Table
                    columns={COLUMNS}
                    data={recargasCleaned}
                    filterFields={FIELDS}
                    showNuevo={false}
                    showAcciones={false}
                />
            )}
        </CardMain>
    )
}

export default Recargas