import toast from "react-hot-toast"
import { useTarifasTarjetas } from "./hooks/useTarifasTarjetas"
import { useEffect, useState } from "react";
import Loader from "../../../ui/components/Loader";
import Table from "../../../ui/components/table/Table";
import { useLocation } from "react-router-dom";
import { CardMain } from "../../../ui/components/cards/CardMain";

const COLUMNS = ["ID", "AÑO", "IMPORTE", "COLOR"];
const FIELDS = ["id", "anio", "importe", "color"];

const TarjetasTarifas = () => {
    const location = useLocation()

    const { tarjetas, getTarifasTarjetas, loading, editNavigate } = useTarifasTarjetas();
    const [tarjetasCleaned, setTarjetasCleaned] = useState([]);

    useEffect(() => {
        getTarifasTarjetas();
    }, [])

    useEffect(() => {
        if (tarjetas.length > 0) {
            const cleanedTarjetas = tarjetas.map((tarjeta) => ({
                id: tarjeta.IdTarifaTarjeta,
                anio: tarjeta.Año,
                importe: tarjeta.Importe,
                color: tarjeta.Color,
            }));
            setTarjetasCleaned(cleanedTarjetas);
        }
    }, [tarjetas]);

    useEffect(() => {
        if (location.state?.toast) {
            const { type, message } = location.state.toast;
            toast[type](message, {
                position: "top-right",
                duration: 1500,
            });

            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    return (
        <CardMain title="TARIFAS DE TARJETAS">
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
                    editFunction={editNavigate}
                />
            )}
        </CardMain>
    )
}

export default TarjetasTarifas