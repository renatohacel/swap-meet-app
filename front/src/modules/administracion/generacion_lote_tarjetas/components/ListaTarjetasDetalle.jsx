import { useLocation } from "react-router-dom"
import { CardMain } from "../../../ui/components/cards/CardMain"
import { useEffect, useState } from "react";
import { useTarjetas } from "../hooks/useTarjetas";
import Loader from "../../../ui/components/Loader";
import Table from "../../../ui/components/table/Table";
import { Modal } from 'antd';
import { usePermissions } from "../../../auth/hooks/usePermissions";

const COLUMNS = ['ID', 'FECHA DE REGISTRO', 'NÚMERO DE TARJETA', 'ESTATUS', 'NO. DE LOTE']
const FIELDS = ['id', 'fecha', 'numero_tarjeta', 'estatus', 'id_lote']

export const ListaTarjetasDetalle = () => {
    const location = useLocation();
    const { getTarjetas, tarjetas, loading, cancelFunction } = useTarjetas();
    const [tarjetasCleaned, setTarjetasCleaned] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tarjetaToCancel, setTarjetaToCancel] = useState(null);

    const { can } = usePermissions();
    const canCancel = can('admin', 'cancel', 'generacion_tarjetas');

    const showModal = (tarjeta) => {
        setTarjetaToCancel(tarjeta);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        if (tarjetaToCancel) {
            cancelFunction(tarjetaToCancel);
        }
        setIsModalOpen(false);
        setTarjetaToCancel(null);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setTarjetaToCancel(null);
    };

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

    // Modificar la función cancelFunction para abrir el modal
    const handleCancelFunction = (row) => {
        showModal(row);
    };

    return (
        <>
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
                        showAcciones={canCancel}
                        edit={false}
                        cancel={canCancel}
                        cancelFunction={handleCancelFunction}
                    />
                )}
            </CardMain>

            <Modal
                title="CONFIRMAR CANCELACIÓN"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                style={{ fontFamily: 'var(--font-family-primary)' }}
            >
                {tarjetaToCancel && (
                    <div className="py-4">
                        <div className="bg-primary/10 p-4 rounded-lg mb-4">
                            <p><strong>ID:</strong> {tarjetaToCancel.id}</p>
                            <p><strong>Número de tarjeta:</strong> {tarjetaToCancel.numero_tarjeta}</p>
                            <p><strong>Estatus actual:</strong> {tarjetaToCancel.estatus}</p>
                            <p><strong>Fecha de registro:</strong> {tarjetaToCancel.fecha}</p>
                        </div>

                        <div className="flex flex-col justify-center text-center gap-2">
                            <span className='mb-2 font-semibold text-primary'>
                                ¿ESTÁS SEGURO DE CANCELAR ESTA TARJETA?
                            </span>
                            <div className='flex justify-center gap-6'>
                                <button
                                    disabled={loading}
                                    type='button'
                                    onClick={handleOk}
                                    className={`bg-primary/60 text-secondary-complement items-center text-center rounded-lg hover:outline-none font-semibold px-4 py-2 transition-all text-sm focus:outline-dark-primary opacity-50 md:w-24
                                        ${loading ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-dark-primary hover:opacity-100'}    
                                    `}
                                >
                                    SÍ
                                </button>
                                <button
                                    disabled={loading}
                                    type='button'
                                    onClick={handleCancel}
                                    className={`text-secondary-complement items-center text-center rounded-lg hover:outline-none bg-primary font-semibold px-4 py-2 transition-all text-sm focus:outline-dark-primary md:w-24
                                        ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-dark-primary'}
                                    `}
                                >
                                    NO
                                </button>
                            </div>
                        </div>

                        <p className="mt-4 text-red-600 font-medium text-center">Esta acción no se puede deshacer.</p>
                    </div>
                )}
            </Modal>
        </>
    )
}
