import { useLocation } from "react-router-dom";
import { CardMain } from "../../ui/components/cards/CardMain";
import { Transfer } from "antd";
import { useEffect, useState } from "react";
import { useAsignacionTianguis } from "./hooks/useAsignacionTianguis";
import Loader from "../../ui/components/Loader";
import { usePermissions } from "../../auth/hooks/usePermissions";
import toast from "react-hot-toast";

const AsignacionTianguisUser = () => {
    const location = useLocation();
    const { can } = usePermissions();
    const canAsign = can('admin', 'update', 'asignacion_tianguis');


    const { tianguis, tianguisByUserId, getListadoTianguis, getTianguisByUserId, loading, insertTianguisToUser, deleteTianguisFromUser } = useAsignacionTianguis();
    const { id, name } = location.state?.user ?? null;

    const [sourceDataTianguis, setSourceDataTianguis] = useState([]);

    const [targetKeys, setTargetKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);

    const [ready, setReady] = useState(false);

    const onChange = async (nextTargetKeys, direction, moveKeys) => {
        try {
            if (direction === 'right') {
                await insertTianguisToUser(id, moveKeys.join(','));
            } else if (direction === 'left') {
                await deleteTianguisFromUser(id, moveKeys.join(','));
            }
            setTargetKeys(nextTargetKeys);
            toast.success(`Tianguis ${direction === 'right' ? 'asignados' : 'eliminados'} correctamente`, { position: 'top-right' });
        } catch {
            toast.error('Error al asignar/eliminar tianguis al usuario', { position: 'top-right' });
        }
    };

    const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        // console.log('sourceSelectedKeys:', sourceSelectedKeys);
        // console.log('targetSelectedKeys:', targetSelectedKeys);
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    useEffect(() => {
        getListadoTianguis();
        getTianguisByUserId(id);
    }, [])

    useEffect(() => {
        if (tianguis.length > 0 && tianguisByUserId.length >= 0 && !loading) {
            const sourceKeys = tianguis.map(t => ({
                key: t.idtianguis?.toString(),
                title: t.Tianguis,
                description: t.Tianguis || 'No description available'
            }));

            const asignedKeys = tianguisByUserId.map(t => (t.IdTianguis?.toString()));

            // Actualiza ambos estados juntos
            setSourceDataTianguis(sourceKeys);
            setTargetKeys(asignedKeys);

            setReady(true);
        }
    }, [tianguis, tianguisByUserId]);

    return (
        <CardMain formTitle={`TIANGUIS`} cancelButton={true}>
            <div className="flex flex-col xl:items-center w-full overflow-x-scroll p-4">
                <div className="mb-6 md:text-xl font-bold text-primary tracking-wide">
                    {name}
                </div>
                <Transfer
                    disabled={!canAsign}
                    dataSource={sourceDataTianguis}
                    style={{
                        fontFamily: 'var(--font-family-primary)',
                        background: 'var(--color-white)',
                        borderRadius: '1rem',
                        minHeight: 400,
                        minWidth: 700,
                        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)',
                        padding: '2rem',
                        overflowX: 'scroll'
                    }}
                    titles={[
                        <span className="text-primary font-semibold text-base tracking-wide">TIANGUIS</span>,
                        <span className="text-primary font-semibold text-base tracking-wide">TIANGUIS ASIGNADOS</span>
                    ]}
                    targetKeys={targetKeys}
                    selectedKeys={selectedKeys}
                    showSearch
                    onChange={onChange}
                    onSelectChange={onSelectChange}
                    render={(item) => (
                        <span className="text-base">{item.title}</span>
                    )}
                    filterOption={(inputValue, item) =>
                        item.title.toLowerCase().includes(inputValue.toLowerCase()) ||
                        (item.description && item.description.toLowerCase().includes(inputValue.toLowerCase()))
                    }
                    listStyle={{
                        width: 340,
                        height: 440,
                        background: 'var(--color-white)',
                        borderRadius: '1rem',
                        fontSize: '1rem',
                        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
                        padding: '1rem'
                    }}
                    locale={{
                        notFoundContent: !ready ? (
                            <div className="flex justify-center items-center h-full">
                                <Loader className="w-16 h-16 text-primary/50" />
                            </div>
                        ) : "No hay tianguis asignados"
                    }}
                />
            </div>
        </CardMain>
    )
}

export default AsignacionTianguisUser