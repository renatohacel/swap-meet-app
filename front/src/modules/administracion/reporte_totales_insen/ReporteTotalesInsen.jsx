import GenericButton from "../../ui/components/buttons/GenericButton";
import { CardMain } from "../../ui/components/cards/CardMain"
import ExcelIcon from "../../ui/components/icons/ExcelIcon";
import PrintIcon from "../../ui/components/icons/PrintIcon";
import Spinner from "../../ui/components/Spinner";
import { useReporteTotalesInsen } from "./useReporteTotalesInsen";

const ReporteTotalesInsen = () => {

    const { loading, generarReporte } = useReporteTotalesInsen();

    return (
        <CardMain title="REPORTE TOTALES POR INSEN">
            <GenericButton
                className={"h-full self-center mt-4"}
                onClick={() => {
                    generarReporte();
                }}
                isSubmit={loading}
                type="button"
            >
                {loading ? (
                    <div className="flex justify-center items-center gap-2">
                        GENERANDO REPORTE
                        <Spinner className="w-5 text-white" />
                    </div>
                ) : (
                    <span
                        className="
                                flex 
                                justify-center 
                                gap-2
                                tracking-wider
                            "
                    >
                        GENERAR EXCEL
                        <ExcelIcon className="h-5 w-5" />
                    </span>
                )}
            </GenericButton>
        </CardMain>
    )
}

export default ReporteTotalesInsen