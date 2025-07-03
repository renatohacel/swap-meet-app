import { CardMain } from '../ui/components/cards/CardMain'
import Table from '../ui/components/table/Table'
import { useHistorial } from './hooks/useHistorial'
import { useEffect } from 'react'
import Loader from '../ui/components/Loader'

const COLUMNS = ['FECHA', 'USUARIO', 'ACCIÓN', 'TABLA', 'CAMPO', 'ID REGISTRO', 'VALOR ANTERIOR', 'VALOR NUEVO'];
const FIELDS = ['fecha', 'usuario', 'accion', 'tabla', 'campo', 'id_campo', 'valor_anterior', 'valor_nuevo'];

const Historial = () => {
    const { historial, getHistorial, loading } = useHistorial();

    useEffect(() => {
        getHistorial()
    }, [])

    useEffect(() => {
        console.log(historial)
    }, [historial])

    return (
        <CardMain title='HISTORIAL'>
            {loading ? (
                <div className="flex justify-center items-center">
                    <Loader className="w-32 opacity-60 text-primary" />
                </div>
            ) : (
                <Table
                    columns={COLUMNS}
                    data={historial}
                    filterFields={FIELDS}
                    showNuevo={false}
                    showAcciones={false}
                    editFunction={''}
                />
            )}
        </CardMain>
    )
}

export default Historial