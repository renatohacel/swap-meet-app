/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-constant-binary-expression */
/* eslint-disable no-unused-vars */
import { CONSTANTS_ROUTES } from "../../../../utils/constansRoutes"
import { useTarifasTarjetas } from "../../../catalogs/tarifas/tarjetas/hooks/useTarifasTarjetas"
import { useContext, useEffect, useState } from "react"
import Form from "../../../ui/components/form/Form"
import SectionForm from "../../../ui/components/form/SectionForm"
import Label from "../../../ui/components/form/Label"
import Input from "../../../ui/components/form/Input"
import { useForm } from "../../../ui/hooks/useForm"
import { useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../../../auth/context/AuthContext"
import { useGenLoteTarjetas } from "../hooks/useGenLoteTarjetas"
import { CardMain } from "../../../ui/components/cards/CardMain"
import SaveButton from "../../../ui/components/buttons/SaveButton"
import DeleteButton from "../../../ui/components/buttons/DeleteButton"
import { motion } from 'framer-motion'; // Importa motion y AnimatePresence
import { usePermissions } from "../../../auth/hooks/usePermissions"



const GeneracionTarjetasForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const { can } = usePermissions();

    const canDeleteLotes = can('admin', 'delete', 'generacion_tarjetas');

    const { getTarifasTarjetas, tarjetas } = useTarifasTarjetas();
    const { handleInsertLote, getTarjetasG, tarjetasGen, viewNavigate, handleDeleteLote } = useGenLoteTarjetas();
    const [tarifas, setTarifas] = useState([])

    const loteToEdit = location.state?.lote;
    const { onInputChange, formState, setFormState } = useForm({});

    const [initialMinValues, setInitialMinValues] = useState({});

    const [isDelete, setIsDelete] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        getTarifasTarjetas()
        if (loteToEdit) {
            const { id } = loteToEdit;
            getTarjetasG(id)
        }
    }, [])

    useEffect(() => {
        // Verifica que tarifas y tarjetasGen estén disponibles antes de calcular los valores iniciales
        if (tarifas.length > 0 && tarjetasGen.length > 0 && Object.keys(initialMinValues).length === 0) {
            const initialValues = tarifas.reduce((acc, { id }) => {
                const tarjetaGen = tarjetasGen.find(tarjeta => tarjeta.IdTarifaTarjeta === id);
                const valueFromTarjetasGen = tarjetaGen ? parseInt(tarjetaGen.TotalTarjetas.trim()) : undefined;

                // Usa el valor de tarjetasGen si está disponible, de lo contrario usa formState o un valor predeterminado
                return { ...acc, [id]: valueFromTarjetasGen ?? formState[id] ?? 0 };
            }, {});
            setInitialMinValues(initialValues);
        }
    }, [tarifas, tarjetasGen, formState]);

    useEffect(() => {
        if (location.pathname.includes('/update')) {
            if (!loteToEdit) {
                navigate(CONSTANTS_ROUTES.ADMIN.LOTES.GENERACION_TARJETAS)
            }
        }
    }, [])

    useEffect(() => {
        if (loteToEdit) {
            const generatedObject = tarjetasGen.reduce((acc, tarjeta) => {
                const idKey = tarjeta.IdTarifaTarjeta;
                const totalValue = tarjeta.TotalTarjetas.trim();
                return {
                    ...acc,
                    [idKey]: parseInt(totalValue),
                };
            }, {});

            const updatedObject = {
                ...generatedObject,
                id: loteToEdit?.id,
                user: login.user.Usuario,
                comentarios: loteToEdit?.comentario ?? '',
            }

            setFormState(updatedObject);
        }
    }, [tarjetasGen, loteToEdit]);

    useEffect(() => {
        if (tarjetas.length > 0) {
            const cleanedTarifas = tarjetas.filter((tarjeta) => tarjeta.Año === new Date().getFullYear()).map((tarifa) => ({
                id: tarifa.IdTarifaTarjeta,
                anio: tarifa.Año,
                importe: tarifa.Importe,
                color: tarifa.Color
            }))
            setTarifas(cleanedTarifas)
        }
    }, [tarjetas])

    useEffect(() => {
        if (tarifas.length > 0 && !loteToEdit) {
            const initialForm = {
                ...tarifas.reduce(
                    (acc, { id }) => (id ? { ...acc, [id]: 0 } : acc),
                    {}
                ),
                id: undefined,
                user: login.user.Usuario,
                comentarios: '',
            };
            setFormState(initialForm);
        }
    }, [tarifas]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true)
        handleInsertLote(formState)
            .finally(() => {
                setIsSubmit(false)
            })
    }

    const onDelete = (id) => {
        setIsSubmit(true)
        handleDeleteLote(id)
            .finally(() => {
                setIsSubmit(false)
            })
    }

    return (
        <CardMain cancelButton={true} formTitle="LOTE">
            <div className="flex flex-col justify-center">
                <h3 className="text-primary text-center text-xl sm:text-2xl font-bold mb-5">
                    TARIFA ACTUAL DE TARJETAS
                </h3>
                <hr className="mb-12 self-center w-full md:w-96 text-primary/60 border-1" />
            </div>

            <Form className={`grid-cols-1 md:grid-cols-2 2xl:grid-cols-3`} onSubmit={!loteToEdit ? handleSubmit : undefined}>
                {tarifas.map(({ id, color, importe }, i) => (
                    <SectionForm key={`${i}-father`}>
                        <div className="flex gap-2 justify-center mb-4">
                            <p className="font-semibold text-center text-lg">{color}</p>
                            <span className="font-semibold text-sm flex items-center text-secondary-complement bg-primary rounded-lg px-2">${importe}</span>
                        </div>
                        <Input
                            id={id}
                            name={id}
                            type={'number'}
                            min={initialMinValues[id] ?? '0'}
                            onChange={onInputChange}
                            value={formState[id] ?? '0'}
                            disabled={loteToEdit ? true : false}
                            className={`${loteToEdit && 'cursor-not-allowed'}`}
                        />
                    </SectionForm>
                ))}
                <SectionForm className="2xl:row-end-5 2xl:col-start-2">
                    <Label htmlFor='comentarios' className={'text-center'}>COMENTARIOS</Label>
                    <textarea name="comentarios" id="comentarios" className={`px-4 py-2 bg-white text-dark-primary rounded-lg outline-2 outline-primary uppercase font-semibold focus:outline-dark-primary ${loteToEdit && 'cursor-not-allowed'}`} rows={'3'} value={formState['comentarios'] ?? ''} disabled={loteToEdit ? true : false}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value === '' || /^[^\d]/.test(value)) {
                                onInputChange(e);
                            }
                        }} />
                </SectionForm>

                <div className="md:text-base md:row-end-6 mt-10 2xl:col-start-2 flex justify-center gap-3">
                    {!loteToEdit && <SaveButton isSubmit={isSubmit} />}
                    {loteToEdit && !isDelete &&
                        <>
                            <button
                                onClick={() => viewNavigate(loteToEdit)}
                                type="button"
                                className="
                            flex 
                            gap-2 
                            items-center
                            cursor-pointer
                            px-4 
                            py-2
                            text-sm
                            font-semibold
                            rounded-md
                            transition-all
                            border-2
                            border-primary
                            text-primary
                            hover:text-secondary-complement
                            hover:bg-dark-primary
                            hover:border-dark-primary
                        ">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" className="h-3 w-3 md:h-5 md:w-5"><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" /></svg>
                                VER TARJETAS
                            </button>
                            {canDeleteLotes && (
                                <DeleteButton type='button' className={'p-2'} onClick={(() => {
                                    setIsDelete(!isDelete)
                                })} />
                            )}
                        </>
                    }
                    {canDeleteLotes && (
                        <>
                            {isDelete && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex flex-col justify-center text-center gap-2"
                                >
                                    <span className='mb-2 font-semibold text-primary'>
                                        ¿ESTÁS SEGURO DE ELIMINAR ESTA LOTE?
                                    </span>
                                    <div className='flex justify-center gap-6'>
                                        <button
                                            disabled={isSubmit}
                                            type='button'
                                            onClick={() => { onDelete(loteToEdit.id) }}
                                            className={`bg-primary/60 text-secondary-complement items-center text-center rounded-lg hover:outline-none font-semibold px-4 py-2  transition-all text-sm focus:outline-dark-primary opacity-50 md:w-24
                                    ${isSubmit ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-dark-primary hover:opacity-100'}    
                                    `}
                                        >
                                            SI
                                        </button>
                                        <button
                                            disabled={isSubmit}
                                            type='button'
                                            onClick={() => { setIsDelete(!isDelete) }}
                                            className={`text-secondary-complement items-center text-center rounded-lg hover:outline-none bg-primary font-semibold px-4 py-2  transition-all text-sm focus:outline-dark-primary md:w-24
                                        ${isSubmit ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-dark-primary'}
                                    `}
                                        >
                                            NO
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </>
                    )}
                </div>
            </Form>
        </CardMain>
    )
}

export default GeneracionTarjetasForm