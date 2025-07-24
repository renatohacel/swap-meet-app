import { useEffect } from "react";
import { CardMain } from "../../ui/components/cards/CardMain"
import Loader from "../../ui/components/Loader";
import { useUser } from "../../catalogs/users/hooks/useUser";
import Table from "../../ui/components/table/Table";
import { useAsignacionTianguis } from "./hooks/useAsignacionTianguis";
import { usePermissions } from "../../auth/hooks/usePermissions";

const COLUMNS = ['ID', 'NOMBRE']
const FIELDS = ['id', 'name']

const AsignacionTianguis = () => {
    const { can } = usePermissions();
    const canAsign = can('admin', 'update', 'asignacion_tianguis');
    const { users, loading, getActiveUsers } = useUser();
    const { editNavigate } = useAsignacionTianguis();


    useEffect(() => {
        getActiveUsers();
    }, []);

    return (
        <CardMain title="ASIGNACIÓN DE TIANGUIS">
            {loading ? (
                <div className="flex justify-center items-center">
                    <Loader className="w-32 opacity-60 text-primary" />
                </div>
            ) : (
                <Table
                    columns={COLUMNS}
                    data={users}
                    filterFields={FIELDS}
                    showNuevo={false}
                    edit={canAsign}
                    details={!canAsign}
                    viewFunction={editNavigate}
                    editFunction={editNavigate}
                    showDateFilter={false}
                    editText="Asignar Tianguis"
                />
            )}
        </CardMain>
    )
}

export default AsignacionTianguis