import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Form from '../../../../ui/components/form/Form'
import { useForm } from '../../../../ui/hooks/useForm';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Label from '../../../../ui/components/form/Label';
import SectionForm from '../../../../ui/components/form/SectionForm';
import Input from '../../../../ui/components/form/Input';
import { useTarifasTarjetas } from '../hooks/useTarifasTarjetas';
import DeleteButton from '../../../../ui/components/buttons/DeleteButton';

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
                navigate('/tarifas/tarjetas')
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
        <section>
            <Toaster />
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
                <h1 className="text-primary text-3xl sm:text-5xl font-bold mb-5">
                    {location.pathname.includes("/add") ? "NUEVA" : "ACTUALIZACIÓN DE"}{" "}
                    TARIFA
                </h1>
                <NavLink
                    className="bg-secondary p-2 rounded-md text-secondary-complement font-semibold cursor-pointer h-full hover:bg-dark-primary transition-all text-sm md:text-base opacity-50 hover:opacity-100 mb-10 sm:mb-0"
                    to={"/tarifas/tarjetas"}
                >
                    CANCELAR
                </NavLink>
            </div>
            <hr className="mb-12 text-primary/30 border-1" />
            <Form className="grid-cols-1 md:grid-cols-3" onSubmit={handleSubmit}>
                <SectionForm>
                    <Label htmlFor="anio">AÑO</Label>
                    <select
                        onChange={onInputChange}
                        value={formState['anio'] || ''}
                        id="anio"
                        name="anio"
                        className="px-4 py-2 bg-secondary-complement focus:text-dark-primary rounded-lg outline-2 outline-primary font-semibold focus:outline-dark-primary"
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
                    <Label htmlFor="importe">IMPORTE</Label>
                    <div className='flex gap-2 items-center'>
                        <span className='font-semibold text-lg'> $</span>

                        <Input value={formState['importe'] || ''} name='importe' id="importe" type='number' min='1' className={'w-full'} onChange={onInputChange} step="any" />
                    </div>
                </SectionForm>
                <SectionForm>
                    <Label htmlFor="color">COLOR</Label>
                    <Input value={formState['color'] || ''} name='color' id='color' type='text' onChange={onInputChange} className={'uppercase'} step="any" />
                </SectionForm>

                <div className='md:col-start-2 mt-10 flex gap-3 items-center justify-center'>
                    {!isDelete && <button
                        type="submit"
                        className={`bg-primary items-center text-center rounded-lg text-secondary-complement font-semibold cursor-pointer px-4 py-2 hover:bg-dark-primary transition-all text-sm md:text-base  md:row-end-5 focus:outline-dark-primary w-full`}
                    >
                        GUARDAR
                    </button>}

                    {(tarifaToEdit && !isDelete) && <DeleteButton onClick={() => { setIsDelete(!isDelete) }} type="button" className={'h-9 w-9 flex items-center justify-center'} />}
                    {isDelete &&
                        <div className='flex flex-col justify-center text-center gap-2'>
                            <span className='mb-2 font-semibold text-primary'>
                                ¿ESTÁS SEGURO DE ELIMINAR ESTA TARIFA?
                            </span>
                            <div className='flex justify-center gap-2'>
                                <button type='button' onClick={() => { onDelete(formState.id) }} className='bg-secondary p-2 rounded-md text-secondary-complement font-semibold cursor-pointer h-full hover:bg-dark-primary transition-all text-sm md:text-base opacity-50 hover:opacity-100 sm:mb-0 w-full text-center'>
                                    SI
                                </button>
                                <button onClick={() => { setIsDelete(!isDelete) }} type='button' className='bg-primary items-center text-center rounded-lg text-secondary-complement font-semibold cursor-pointer px-4 py-2 hover:bg-dark-primary transition-all text-sm md:text-base  md:row-end-5 focus:outline-dark-primary w-full'>
                                    NO
                                </button>
                            </div>

                        </div>
                    }
                </div>

            </Form>
        </section>
    )
}

export default TarjetasTarifasForm