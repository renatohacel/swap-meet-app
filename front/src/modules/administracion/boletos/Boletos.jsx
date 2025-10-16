/* eslint-disable no-unused-vars */

import { CardMain } from "../../ui/components/cards/CardMain"
import { useBoletos } from "./hooks/useBoletos";
import GenericButton from "../../ui/components/buttons/GenericButton";
import toast from "react-hot-toast";
import PrintIcon from "../../ui/components/icons/PrintIcon";
import Spinner from "../../ui/components/Spinner";
import { useForm } from "../../ui/hooks/useForm";
import { useAsignacionTianguis } from "../asginacion_tianguis/hooks/useAsignacionTianguis";
import { useEffect, useRef, useState } from "react";
import AutoComplete from "../../ui/components/inputs/AutoComplete";
import Label from "../../ui/components/form/Label";
import SectionForm from "../../ui/components/form/SectionForm";
import Input from "../../ui/components/form/Input";

const initialFormBoletos = {
    id_tianguis: '',
    fecha: '',
}

const Boletos = () => {
    const { printBoletos, loading } = useBoletos();
    const { tianguis, getListadoTianguis } = useAsignacionTianguis();
    const { formState, setFormState } = useForm(initialFormBoletos);

    const printButtonRef = useRef(null);

    const { id_tianguis, fecha } = formState;

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
        setFormState(initialFormBoletos);
        toast.error("No se encontró tianguis", { position: "top-center" });
    };

    // Limpiar selección
    const onClear = () => {
        setSelectedId("");
        setSelectedNombre("");
        setFormState(initialFormBoletos);
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
        <CardMain title="IMPRESIÓN DE BOLETOS">

            <div className="flex md:flex-row flex-col gap-4 mt-2">
                <SectionForm>
                    <Label>FECHA</Label>
                    <Input
                        value={fecha}
                        onChange={(e) => {
                            setFormState({
                                ...formState,
                                fecha: e.target.value,
                            })
                        }}
                        name="fecha"
                        type="date"
                        className={"py-1"}
                        disabled={loading}
                    />
                </SectionForm>
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
                        disabled={loading}
                        sending={loading}
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
                        disabled={loading}
                        sending={loading}
                    />
                </SectionForm>
                <GenericButton
                    ref={printButtonRef}
                    className={"h-full self-center mt-4"}
                    onClick={() => {
                        if (!id_tianguis || !fecha) {
                            toast.error("Ingrese un ID/NOMBRE de Tianguis y la fecha", { position: "top-center" }); 
                            return;
                        }
                        printBoletos(id_tianguis, fecha);
                    }}
                    isSubmit={loading}
                    type="button"
                >
                    {loading ? (
                        <div className="flex justify-center items-center gap-2">
                            GENERANDO BOLETOS
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
                            IMPRIMIR
                            <PrintIcon />
                        </span>
                    )}
                </GenericButton>

            </div>
        </CardMain>
    )
}

export default Boletos