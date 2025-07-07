import toast from 'react-hot-toast'
import Form from '@/modules/ui/components/form/Form'
import { CONSTANTS } from '@/utils/constans.js'
import { useForm } from '../../../ui/hooks/useForm';
import Label from '../../../ui/components/form/Label';
import SectionForm from '../../../ui/components/form/SectionForm';
import Input from '../../../ui/components/form/Input';
import { useEffect } from 'react';
import { useTarifaPuestos } from './hooks/useTarifaPuestos';
import { CardMain } from '../../../ui/components/cards/CardMain';
import SaveButton from '../../../ui/components/buttons/SaveButton';


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
                position: "top-right",
            });
        }
        updateTarifaPuestos(formState)
    }

    return (
        <CardMain title='TARIFAS DE PUESTOS'>
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
                <div className='md:row-end-5 md:col-start-2 flex justify-center'>
                    <SaveButton />
                </div>
            </Form>
        </CardMain>
    )
}

export default PuestosTarifas