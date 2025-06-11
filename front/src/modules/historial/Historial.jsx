import { CardMain } from '../ui/components/cards/CardMain'
import Table from '../ui/components/table/Table'

const Historial = () => {
    return (
        <CardMain title='HISTORIAL'>
            {/* {loading ? (
            <div className="flex justify-center items-center">
            <Loader className="w-32 opacity-60 text-primary" />
            </div>
            ) : ( */}
            <Table
                columns={[]}
                data={[]}
                filterFields={[]}
                addLink={"add"}
                editFunction={''}
            />
            {/* )} */}
        </CardMain>
    )
}

export default Historial