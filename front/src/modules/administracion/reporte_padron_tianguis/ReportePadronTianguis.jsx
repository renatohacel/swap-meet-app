import { useEffect, useRef, useState } from "react"
import { CardMain } from "../../ui/components/cards/CardMain"
import { useForm } from "../../ui/hooks/useForm"
import { useAsignacionTianguis } from "../asginacion_tianguis/hooks/useAsignacionTianguis"
import { useReportePadronTianguis } from "./useReportePadronTianguis"
import toast from "react-hot-toast"
import PrintIcon from "../../ui/components/icons/PrintIcon"
import Spinner from "../../ui/components/Spinner"
import GenericButton from "../../ui/components/buttons/GenericButton"
import AutoComplete from "../../ui/components/inputs/AutoComplete"
import Label from "../../ui/components/form/Label"
import SectionForm from "../../ui/components/form/SectionForm"
import ExcelIcon from "../../ui/components/icons/ExcelIcon"

const initialFormPadron = {
    id_tianguis: ''
}

const ReportePadronTianguis = () => {

    const { loading, printPadronTianguis } = useReportePadronTianguis()
    const { tianguis, getListadoTianguis } = useAsignacionTianguis();

    const printButtonRef = useRef(null);

    const { formState, setFormState } = useForm(initialFormPadron);

    const { id_tianguis } = formState;

    // para los autocomplete
    // Estados para los autocompletes
    const [selectedId, setSelectedId] = useState('');
    const [selectedNombre, setSelectedNombre] = useState('');


    // Cuando seleccionas un ID
    const onSelectId = (item) => {
        const found = tianguis.find(t => t.idtianguis === item.idtianguis);
        if (!found) {
            toast.error("No se encontró un tianguis con ese ID", { position: "top-center" });
            onNoMatch();
            return;
        }
        setSelectedId(found.idtianguis);
        setSelectedNombre(found.Tianguis || "");
        setFormState(prev => ({ ...prev, id_tianguis: found.idtianguis }));
    };

    // Cuando seleccionas un nombre
    const onSelectNombre = (item) => {
        const found = tianguis.find(t => t.Tianguis === item.Tianguis);
        if (!found) {
            toast.error("No se encontró un tianguis con ese nombre", { position: "top-center" });
            onNoMatch();
            return;
        }
        setSelectedNombre(found.Tianguis);
        setSelectedId(found.idtianguis || "");
        setFormState(prev => ({ ...prev, id_tianguis: found.idtianguis }));
    };

    // Si no hay coincidencia
    const onNoMatch = () => {
        setSelectedId("");
        setSelectedNombre("");
        setFormState(initialFormPadron);
        toast.error("No se encontró tianguis", { position: "top-center" });
    };

    // Limpiar selección
    const onClear = () => {
        setSelectedId("");
        setSelectedNombre("");
        setFormState(initialFormPadron);
    };

    // Sincroniza ambos campos si cambia el id o el nombre
    useEffect(() => {
        if (!selectedId && !selectedNombre) {
            onClear();
            return;
        }
        if (selectedId) {
            const found = tianguis.find(t => t.idtianguis === selectedId);
            if (found) {
                if (selectedNombre !== found.Tianguis) setSelectedNombre(found.Tianguis);
                setFormState(prev => ({ ...prev, id_tianguis: found.idtianguis }));
                // printBoletos(found.idtianguis);\
                // 2. Simula click en el botón si existe
                if (printButtonRef.current) {
                    printButtonRef.current.click();
                }
            } else {
                onNoMatch();
            }
        } else if (selectedNombre) {
            const found = tianguis.find(t => t.Tianguis === selectedNombre);
            if (found) {
                if (selectedId !== found.idtianguis) setSelectedId(found.idtianguis);
                setFormState(prev => ({ ...prev, id_tianguis: found.idtianguis }));
                // printBoletos(found.idtianguis);
                if (printButtonRef.current) {
                    printButtonRef.current.click();
                }
            } else {
                onNoMatch();
            }
        }
    }, [selectedId, selectedNombre, tianguis]);

    useEffect(() => { getListadoTianguis(); }, [])

    return (
        <CardMain title="REPORTE PADRÓN TIANGUIS">
            <div className="flex md:flex-row flex-col gap-4 mt-2">
                <SectionForm>
                    <Label>ID TIANGUIS</Label>
                    <AutoComplete
                        placeholder={"Buscar ID"}
                        data={tianguis}
                        fields={["idtianguis"]}
                        onSelect={onSelectId}
                        value={selectedId}
                        onNoMatch={onNoMatch}
                        onClear={onClear}
                    />
                </SectionForm>

                <SectionForm>
                    <Label>NOMBRE TIANGUIS</Label>
                    <AutoComplete
                        placeholder={"Buscar Tianguis"}
                        data={tianguis}
                        fields={["Tianguis"]}
                        onSelect={onSelectNombre}
                        value={selectedNombre}
                        onNoMatch={onNoMatch}
                        onClear={onClear}
                    />
                </SectionForm>
                <GenericButton
                    ref={printButtonRef}
                    className={"h-full self-center mt-4"}
                    onClick={() => {
                        if (!id_tianguis) {
                            toast.error("Ingrese un ID/NOMBRE de Tianguis", { position: "top-center" });
                            return;
                        }
                        printPadronTianguis(id_tianguis);
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

            </div>
        </CardMain>
    )
}

export default ReportePadronTianguis