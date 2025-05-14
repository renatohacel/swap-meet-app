import toast, { Toaster } from 'react-hot-toast'
import Form from '../../../ui/components/form/Form'
import { CONSTANTS } from '../../../../utils/constans'
import { useForm } from '../../../ui/hooks/useForm';
import Label from '../../../ui/components/form/Label';
import SectionForm from '../../../ui/components/form/SectionForm';
import Input from '../../../ui/components/form/Input';
import { useEffect } from 'react';
import { useTarifaPuestos } from './hooks/useTarifaPuestos';


const PuestosTarifas = () => {
    const { onInputChange, formState, setFormState } = useForm([]);
    const { getTarifaPuestos, updateTarifaPuestos, puestos } = useTarifaPuestos()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { getTarifaPuestos() }, [])

    const { IdTarifa, TarifaA, TarifaB, TarifaC, TarifaAInsen, TarifaBInsen, TarifaCInsen, Basura } = puestos

    useEffect(() => {
        setFormState({
            id: IdTarifa,
            tarifa_a: TarifaA,
            tarifa_b: TarifaB,
            tarifa_c: TarifaC,
            tarifa_a_insen: TarifaAInsen,
            tarifa_b_insen: TarifaBInsen,
            tarifa_c_insen: TarifaCInsen,
            basura: Basura
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [puestos])

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
        updateTarifaPuestos(formState)
    }

    return (
        <section>
            <Toaster />
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
                <h1 className="text-primary text-3xl sm:text-5xl font-bold mb-5">
                    TARIFAS DE PUESTOS
                </h1>
            </div>
            <hr className="mb-12 text-primary/30 border-1" />

            <Form className="grid-cols-1 md:grid-cols-3" onSubmit={handleSubmit}>
                <section>
                    <SectionForm>
                        <h3 className={" mb-2 font-semibold text-center text-xl"}>
                            TARIFAS
                        </h3>
                        <hr className="mb-2 self-center w-64 text-primary/60 border-1" />
                    </SectionForm>
                    {CONSTANTS.TARIFAS.PUESTOS.TARIFAS_FORM.TARIFAS_BASE.map(({ name, label, type, min }, index) => (
                        <SectionForm key={index}>
                            <Label htmlFor={name}>{label}</Label>
                            <div className='flex gap-2 items-center'>
                                <span className='font-semibold text-lg'> $</span>
                                <Input
                                    name={name}
                                    id={name}
                                    type={type}
                                    onChange={onInputChange}
                                    value={formState[name] || ''}
                                    className={'uppercase w-full'}
                                    autoComplete={"off"}
                                    min={min}
                                    step="any"
                                />
                            </div>
                        </SectionForm>
                    ))}
                </section>
                <section>
                    <SectionForm>
                        <h3 className={" mb-2 font-semibold text-center text-xl"}>
                            TARIFAS INSEN
                        </h3>
                        <hr className="mb-2 self-center w-64 text-primary/60 border-1" />
                    </SectionForm>
                    {CONSTANTS.TARIFAS.PUESTOS.TARIFAS_FORM.TARIFAS_INSEN.map(({ name, label, type, min }, index) => (
                        <SectionForm key={index}>
                            <Label htmlFor={name}>{label}</Label>
                            <div className='flex gap-2 items-center'>
                                <span className='font-semibold text-lg'> $</span>
                                <Input
                                    name={name}
                                    id={name}
                                    type={type}
                                    onChange={onInputChange}
                                    value={formState[name] || ''}
                                    className={'uppercase w-full'}
                                    autoComplete={"off"}
                                    min={min}
                                    step="any"
                                />
                            </div>
                        </SectionForm>
                    ))}
                </section>

                <section>
                    <SectionForm>
                        <h3 className={" mb-2 font-semibold text-center text-xl"}>
                            TARIFA DE BASURA
                        </h3>
                        <hr className="mb-2 self-center w-64 text-primary/60 border-1" />
                    </SectionForm>
                    {CONSTANTS.TARIFAS.PUESTOS.TARIFAS_FORM.BASURA.map(({ name, label, type, min }, index) => (
                        <SectionForm key={index}>
                            <Label htmlFor={name}>{label}</Label>
                            <div className='flex gap-2 items-center'>
                                <span className='font-semibold text-lg'> $</span>
                                <Input
                                    name={name}
                                    id={name}
                                    type={type}
                                    onChange={onInputChange}
                                    value={formState[name] || ''}
                                    className={'uppercase w-full'}
                                    autoComplete={"off"}
                                    min={min}
                                    step="any"
                                />
                            </div>
                        </SectionForm>
                    ))}
                </section>
                <button
                    type="submit"
                    className={`bg-primary md:col-start-2 items-center text-center rounded-lg text-secondary-complement font-semibold cursor-pointer px-4 py-2 hover:bg-dark-primary transition-all text-sm md:text-base mt-10 md:row-end-5 focus:outline-dark-primary w-full`}
                >
                    ACTUALIZAR
                </button>
            </Form>
            s
        </section>
    )
}

export default PuestosTarifas