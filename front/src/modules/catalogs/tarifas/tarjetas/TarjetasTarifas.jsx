import toast, { Toaster } from "react-hot-toast"
import { useTarifasTarjetas } from "./hooks/useTarifasTarjetas"
import { useEffect, useState } from "react";
import Loader from "../../../ui/components/Loader";
import Table from "../../../ui/components/table/Table";
import { useLocation } from "react-router-dom";

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
                position: "top-center",
                duration: 1500,
            });

            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    return (
        <section>
            <Toaster />
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
                <h1 className="text-primary text-3xl sm:text-5xl font-bold mb-5">
                    TARIFAS DE TARJETAS
                </h1>
            </div>
            <hr className="mb-12 text-primary/30 border-1" />
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
        </section>
    )
}

export default TarjetasTarifas