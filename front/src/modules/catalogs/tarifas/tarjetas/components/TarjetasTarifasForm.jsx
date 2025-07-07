/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion'; // Importa motion y AnimatePresence
import Form from '../../../../ui/components/form/Form';
import { useForm } from '../../../../ui/hooks/useForm';
import { useLocation, useNavigate } from 'react-router-dom';
import Label from '../../../../ui/components/form/Label';
import SectionForm from '../../../../ui/components/form/SectionForm';
import Input from '../../../../ui/components/form/Input';
import { useTarifasTarjetas } from '../hooks/useTarifasTarjetas';
import DeleteButton from '../../../../ui/components/buttons/DeleteButton';
import { CONSTANTS_ROUTES } from '../../../../../utils/constansRoutes';
import { CardMain } from '../../../../ui/components/cards/CardMain';
import SaveButton from '../../../../ui/components/buttons/SaveButton';

const initialForm = {
    id: undefined,
    importe: '',
    color: '',
    anio: new Date().getFullYear()
};

const TarjetasTarifasForm = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [isDelete, setIsDelete] = useState(false)

    const { handleInsertTarifa, handleUpdateTarifa, handleDeleteTarifa } = useTarifasTarjetas();

    const tarifaToEdit = location.state?.tarifa;

    const { onInputChange, formState, setFormState } = useForm(tarifaToEdit || initialForm);

    useEffect(() => {
        if (location.pathname.includes('/update')) {
            if (!tarifaToEdit) {
                navigate(`${CONSTANTS_ROUTES.CATALOGO.TARIFAS.BASE}${CONSTANTS_ROUTES.CATALOGO.TARIFAS.TARJETAS}`)
            }
        }
    }, [])

    useEffect(() => {
        if (tarifaToEdit) {
            setFormState(tarifaToEdit);
        }
    }, [tarifaToEdit]);



    const handleSubmit = (e) => {
        e.preventDefault();
        // Verificar campos vacíos
        const emptyFields = Object.entries(formState).filter(([key, value]) =>
            key !== 'id' && (!value || value.toString().trim() === '')
        );

        if (emptyFields.length > 0) {
            return toast.error("LOS CAMPOS SON OBLIGATORIOS", {
                duration: 1500,
                position: "top-center",
            });
        }

        if (tarifaToEdit) {
            handleUpdateTarifa(formState)
        } else {
            handleInsertTarifa(formState)
        }
    }

    const onDelete = (id) => {
        handleDeleteTarifa(id)
    }

    return (
        <CardMain aTerminacion={true} formTitle='TARIFA' cancelButton={true}>
            <Form className="grid-cols-1 md:grid-cols-3" onSubmit={handleSubmit}>
                <SectionForm>
                    <Label htmlFor="anio">AÑO</Label>
                    <select
                        onChange={onInputChange}
                        value={formState['anio'] || ''}
                        id="anio"
                        name="anio"
                        className="px-4 py-2 bg-white focus:text-dark-primary rounded-lg outline-2 outline-primary font-semibold focus:outline-dark-primary"
                        required
                    >
                        {Array.from({ length: 11 }, (_, i) => {
                            return (
                                <option key={i} value={new Date().getFullYear() + i} className="font-semibold">
                                    {new Date().getFullYear() + i}
                                </option>
                            );
                        })}
                    </select>
                </SectionForm>

                <SectionForm>
                    <Label htmlFor="color">COLOR</Label>
                    <Input value={formState['color'] || ''} name='color' id='color' type='text' onChange={onInputChange} className={'uppercase'} step="any" />
                </SectionForm>

                <SectionForm>
                    <Label htmlFor="importe">IMPORTE</Label>
                    <div className='flex gap-2 items-center'>
                        <span className='font-semibold text-lg'> $</span>

                        <Input value={formState['importe'] || ''} name='importe' id="importe" type='number' min='1' className={'w-full'} onChange={onInputChange} step="any" />
                    </div>
                </SectionForm>

                <div className='md:col-start-2 mt-10 flex gap-3 items-center justify-center'>
                    {!isDelete && <SaveButton />}

                    {(tarifaToEdit && !isDelete) && (
                        <DeleteButton
                            onClick={() => setIsDelete(!isDelete)}
                            type="button"
                            className={'h-9 w-9 flex items-center justify-center'}
                        />
                    )}

                    {isDelete && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col justify-center text-center gap-2"
                        >
                            <span className='mb-2 font-semibold text-primary'>
                                ¿ESTÁS SEGURO DE ELIMINAR ESTA TARIFA?
                            </span>
                            <div className='flex justify-center gap-6'>
                                <button
                                    type='button'
                                    onClick={() => { onDelete(formState.id) }}
                                    className={`bg-primary/60 text-secondary-complement items-center text-center rounded-lg hover:outline-none font-semibold cursor-pointer px-4 py-2 hover:bg-dark-primary transition-all text-sm focus:outline-dark-primary opacity-50 hover:opacity-100 md:w-24`}
                                >
                                    SI
                                </button>
                                <button
                                    type='button'
                                    onClick={() => { setIsDelete(!isDelete) }}
                                    className={`text-secondary-complement items-center text-center rounded-lg hover:outline-none bg-primary font-semibold cursor-pointer px-4 py-2 hover:bg-dark-primary transition-all text-sm focus:outline-dark-primary md:w-24`}
                                >
                                    NO
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </Form>

        </CardMain>
    );
};

export default TarjetasTarifasForm;