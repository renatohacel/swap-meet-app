/* eslint-disable no-unused-vars */
import { CardMain } from "../../ui/components/cards/CardMain"
import Label from "../../ui/components/form/Label"
import SectionForm from "../../ui/components/form/SectionForm"
import AutoComplete from "../../ui/components/inputs/AutoComplete"
import { useHelper } from "../../helper/hooks/useHelper"
import InputShow from "../../ui/components/inputs/InputShow"
import { useForm } from "../../ui/hooks/useForm"
import { useCapturaInsen } from "./hooks/useCapturaInsen"
import Table from "../../ui/components/table/Table"
import { useEffect, useState } from "react"
import Loader from "../../ui/components/Loader"
import { usePermissions } from "../../auth/hooks/usePermissions"
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import CheckboxInsen from "./components/checkboxInsen"
import toast from "react-hot-toast"


const initialFormTarifa = {
    id: '',
    tarifa: '',
    num_tarjeta: ''
}


const COLUMNS = ['ID', 'TIANGUIS', 'UBICACIÓN', 'GIRO', 'ANCHO', 'DÍA', 'INSEN']
const FIELDS = ['id_puesto', 'tianguis', 'ubicacion', 'giro', 'dimension', 'dia', 'insen']

export const CapturarInsen = () => {
    const { can } = usePermissions();
    const canUpdateInsen = can('admin', 'update', 'capturar_insen');
    const { getComerciantes, comerciantes, updateComerciantesTarjeta } = useHelper();
    const { onInputChange, formState, setFormState } = useForm(initialFormTarifa);

    const [insenDataClean, setInsenDataClean] = useState([]);
    const [insenRows, setInsenRows] = useState([]);

    const {
        onSelectId,
        selectedId,
        onNoMatch,
        onClear,
        onSelectNombre,
        selectedNombre,
        selectedDomicilio,
        loading,
        getInsenById,
        insenData,
        updateInsenById,
    } = useCapturaInsen(
        comerciantes,
        initialFormTarifa,
        getComerciantes,
        setFormState
    );

    const handleInsenChange = (id_puesto, checked) => {
        // console.log("Puesto:", id_puesto, "Nuevo valor:", checked);
        setInsenRows(prev =>
            prev.map(row =>
                row.id_puesto === id_puesto
                    ? { ...row, insen: checked }
                    : row
            )
        );
        updateInsenById(id_puesto, checked);
    };

    const handleUpdateTarjeta = () => {
        const { tarifa, num_tarjeta } = formState;

        // Si ambas están vacías, permite actualizar
        if (!tarifa && !num_tarjeta) {
            updateComerciantesTarjeta(formState);
            return;
        }

        // Si falta tarifa
        if (!tarifa) {
            toast.error("Por favor, selecciona una tarifa", {
                position: "top-center",
            });
            return;
        }

        // Si falta número de tarjeta
        if (!num_tarjeta) {
            toast.error("Por favor, ingresa un número de tarjeta", {
                position: "top-center",
            });
            return;
        }

        // Si ambas tienen valor, permite actualizar
        updateComerciantesTarjeta(formState);
    }


    useEffect(() => {
        if (selectedId) {
            getInsenById(selectedId);
        }
    }, [selectedId]);


    useEffect(() => {
        if (insenData.length > 0) {
            setInsenRows(insenData);
        } else {
            setInsenRows([]); // Limpiar si no hay datos
            setInsenDataClean([]); // Limpiar la tabla también
        }
    }, [insenData]);



    useEffect(() => {
        if (insenRows.length > 0) {
            const dataClean = insenRows.map(row => ({
                ...row,
                insen: (

                    <CheckboxInsen row={row} handleInsenChange={handleInsenChange} />
                )
            }));
            setInsenDataClean(dataClean);
        }
    }, [insenRows]);

    return (
        <CardMain title="CAPTURAR INSEN">
            <div className="flex flex-col lg:flex-row lg:gap-10 gap-3">
                <SectionForm className="">
                    <Label className="text-primary">
                        ID COMERCIANTE
                    </Label>
                    <AutoComplete
                        placeholder={"Buscar ID"}
                        data={comerciantes}
                        fields={["id"]}
                        onSelect={onSelectId}
                        value={selectedId}
                        onNoMatch={onNoMatch}
                        onClear={onClear}
                    />
                </SectionForm>

                <SectionForm className="w-full lg:w-1/3">
                    <Label className="text-primary">
                        NOMBRE COMPLETO
                    </Label>
                    <AutoComplete
                        placeholder={"Buscar Nombre"}
                        data={comerciantes}
                        fields={["nombre_completo"]}
                        onSelect={onSelectNombre}
                        value={selectedNombre}
                        onNoMatch={onNoMatch}
                        onClear={onClear}
                    />
                </SectionForm>
                {(selectedId && selectedNombre) && (
                    <SectionForm className="w-full lg:w-1/3">
                        <Label className="text-primary">
                            DOMICILIO
                        </Label>
                        <InputShow name="domicilio" placeholder={`Domicilio`} value={selectedDomicilio} />
                    </SectionForm>
                )}
            </div>

            {(selectedId && selectedNombre) && (
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col lg:flex-row lg:gap-10 mt-5 gap-3 min-h-min">
                        <SectionForm className="w-full lg:w-1/5">
                            <Label className="text-primary">
                                NÚMERO DE TARJETA
                            </Label>
                            <InputShow value={formState['num_tarjeta'] || ''} onChange={onInputChange} name="num_tarjeta" placeholder={`Número de Tarjeta`} disabled={!canUpdateInsen} />
                        </SectionForm>

                        <SectionForm className="w-full lg:w-1/7">
                            <Label className="text-primary">
                                TARIFA TARJETA
                            </Label>
                            <select
                                onChange={onInputChange}
                                value={formState['tarifa'] || ''}
                                id="tarifa"
                                name="tarifa"
                                disabled={!canUpdateInsen}
                                className={`
                                    rounded-lg
                                    p-2
                                    border-2 
                                    border-primary 
                                    text-primary 
                                    font-semibold 
                                    h-full 
                                    w-full
                                    overflow-x-auto 
                                    text-sm 
                                    md:text-base 
                                    focus:border-dark-primary 
                                    focus:text-dark-primary 
                                    focus:outline-none
                                    transition-all
                                    bg-white
                                    ${(!canUpdateInsen) ? "cursor-not-allowed" : "cursor-pointer"}
                                `}
                            >
                                <option value="" className="text-primary/50 font-semibold">
                                    Selecciona una tarifa
                                </option>
                                <option value={"A"} className="font-semibold text-primary">
                                    TARIFA A
                                </option>
                                <option value={"B"} className="font-semibold text-primary">
                                    TARIFA B
                                </option>
                                <option value={"C"} className="font-semibold text-primary">
                                    TARIFA C
                                </option>
                            </select>
                        </SectionForm>
                        {canUpdateInsen && (
                            <div className="flex items-center justify-center mt-[15px]">
                                <Tippy content={'Guardar tarjeta'}>
                                    <button
                                        onClick={handleUpdateTarjeta}
                                        className="
                                        border-2 
                                        border-primary 
                                        text-primary 
                                        p-2
                                        rounded-lg 
                                        hover:bg-primary 
                                        hover:outline-none
                                        hover:text-secondary-complement 
                                        hover:border-dark-primary 
                                        transition-all 
                                        cursor-pointer
                                    ">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor" className="h-5 w-5 md:h-6 md:w-6"><path d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 237.3C544 220.3 537.3 204 525.3 192L448 114.7C436 102.7 419.7 96 402.7 96L160 96zM192 192C192 174.3 206.3 160 224 160L384 160C401.7 160 416 174.3 416 192L416 256C416 273.7 401.7 288 384 288L224 288C206.3 288 192 273.7 192 256L192 192zM320 352C355.3 352 384 380.7 384 416C384 451.3 355.3 480 320 480C284.7 480 256 451.3 256 416C256 380.7 284.7 352 320 352z" /></svg>
                                    </button>
                                </Tippy>
                            </div>
                        )}
                    </div>

                    {(loading && insenData.length > 0) ? (
                        <div className="flex justify-center items-center">
                            <Loader className="w-32 opacity-60 text-primary" />
                        </div>
                    ) : (
                        <div className="flex flex-col mt-8 gap-4">
                            <SectionForm>
                                <h3 className={"mb-2 font-semibold text-start text-xl"}>
                                    PUESTOS
                                </h3>
                                <hr className="mb-2 text-primary/30 border-1" />
                            </SectionForm>
                            <Table
                                columns={COLUMNS}
                                data={insenDataClean}
                                rawData={insenRows}
                                filterFields={FIELDS}
                                showDateFilter={false}
                                showNuevo={false}
                                showAcciones={false}
                            />
                        </div>
                    )}

                </div>
            )}
        </CardMain>
    )
}
