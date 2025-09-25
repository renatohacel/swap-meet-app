import toast from "react-hot-toast"
import GenericButton from "../../ui/components/buttons/GenericButton"
import { CardMain } from "../../ui/components/cards/CardMain"
import Input from "../../ui/components/form/Input"
import Label from "../../ui/components/form/Label"
import SectionForm from "../../ui/components/form/SectionForm"
import PrintIcon from "../../ui/components/icons/PrintIcon"
import Spinner from "../../ui/components/Spinner"
import { useReporteTotalesDia } from "./useReporteTotalesDia"
import Select from "../../ui/components/inputs/Select"
import { useForm } from "../../ui/hooks/useForm"

const dias = [
    { value: '', label: 'Seleccione un día' },
    { value: 'lunes', label: 'Lunes' },
    { value: 'martes', label: 'Martes' },
    { value: 'miercoles', label: 'Miércoles' },
    { value: 'jueves', label: 'Jueves' },
    { value: 'viernes', label: 'Viernes' },
    { value: 'sabado', label: 'Sábado' },
    { value: 'domingo', label: 'Domingo' }
]

const initialForm = {
    fecha: '',
    dia: '',
}

const ReporteTotalesDia = () => {
    const { loading, generarReporte } = useReporteTotalesDia();

    const { formState, onInputChange, setFormState } = useForm(initialForm);
    const { fecha, dia } = formState;

    const onPrint = () => {
        // console.log(dias[new Date(fecha).getDay() + 1].value, dia)
        if (!fecha || !dia) { toast.error("Por favor, complete todos los campos", { position: "top-right" }); return; }
        if (dias[new Date(fecha).getDay() + 1].value !== dia) {
            toast.error("El día seleccionado no coincide con la fecha", { position: "top-right" });
            return;
        }
        generarReporte(dia, fecha);
    }

    return (
        <CardMain title="REPORTE TOTALES POR DÍA">
            <div className="flex md:flex-row flex-col gap-4 mt-2">
                <SectionForm>
                    <Label>FECHA</Label>
                    <Input
                        value={fecha}
                        onChange={(e) => {
                            setFormState({
                                ...formState,
                                fecha: e.target.value,
                                dia: dias[new Date(e.target.value).getDay() + 1].value
                            })
                        }}
                        name="fecha"
                        type="date"
                        className={"py-1"}
                    />
                </SectionForm>
                <SectionForm>
                    <Label>DÍA</Label>
                    <Select
                        onChange={onInputChange}
                        name="dia"
                        value={dia}
                        options={dias}
                    />
                </SectionForm>
                <GenericButton
                    className={"h-full self-center mt-4"}
                    onClick={() => {
                        onPrint();
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
                            GENERAR
                            <PrintIcon />
                        </span>
                    )}
                </GenericButton>
            </div>
        </CardMain>
    )
}

export default ReporteTotalesDia