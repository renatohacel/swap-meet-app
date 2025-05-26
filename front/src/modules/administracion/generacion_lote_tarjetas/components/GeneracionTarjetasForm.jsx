/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-constant-binary-expression */
import { CONSTANTS_ROUTES } from "../../../../utils/constansRoutes"
import { useTarifasTarjetas } from "../../../catalogs/tarifas/tarjetas/hooks/useTarifasTarjetas"
import { useContext, useEffect, useState } from "react"
import Form from "../../../ui/components/form/Form"
import SectionForm from "../../../ui/components/form/SectionForm"
import Label from "../../../ui/components/form/Label"
import Input from "../../../ui/components/form/Input"
import { useForm } from "../../../ui/hooks/useForm"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../../../auth/context/AuthContext"
import { useGenLoteTarjetas } from "../hooks/useGenLoteTarjetas"
import { CardMain } from "../../../ui/components/cards/CardMain"
import { ViewButton } from "../../../ui/components/buttons/ViewButton"


const GeneracionTarjetasForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const { getTarifasTarjetas, tarjetas } = useTarifasTarjetas();
    const { handleInsertLote, getTarjetasG, tarjetasGen, handleUpdateLote, viewNavigate } = useGenLoteTarjetas();
    const [tarifas, setTarifas] = useState([])

    const loteToEdit = location.state?.lote;
    const { onInputChange, formState, setFormState } = useForm({});


    useEffect(() => {
        getTarifasTarjetas()

        if (loteToEdit) {
            const { id } = loteToEdit;
            getTarjetasG(id)
        }

    }, [])

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
        if (!loteToEdit) {
            handleInsertLote(formState)
        } else {
            console.log(formState)
            handleUpdateLote(formState)
        }
    }

    return (
        <CardMain cancelButton={true} cancelLink={CONSTANTS_ROUTES.ADMIN.LOTES.GENERACION_TARJETAS} formTitle="LOTE">
            <div className="flex flex-col justify-center">
                <h3 className="text-primary text-center text-xl sm:text-2xl font-bold mb-5">
                    TARIFA ACTUAL DE TARJETAS
                </h3>
                <hr className="mb-12 self-center w-full md:w-96 text-primary/60 border-1" />
            </div>

            <Form className={`grid-cols-1 md:grid-cols-2 2xl:grid-cols-4`} onSubmit={handleSubmit}>
                {tarifas.map((tarifa, i) => (
                    <SectionForm key={`${i}-father`}>
                        <div className="flex gap-2 justify-center mb-4">
                            <p className="font-semibold text-center text-lg">{tarifa.color}</p>
                            <span className="font-semibold text-sm flex items-center text-secondary-complement bg-primary rounded-lg px-2">${tarifa.importe}</span>
                        </div>
                        <Input
                            id={tarifa.id}
                            name={tarifa.id}
                            type={'number'}
                            min='0'
                            onChange={onInputChange}
                            value={formState[tarifa.id] ?? '0'}
                        />
                    </SectionForm>
                ))}
                <SectionForm className="2xl:row-end-5 2xl:col-start-2 2xl:col-span-2">
                    <Label htmlFor='comentarios' className={'text-center'}>COMENTARIOS</Label>
                    <textarea name="comentarios" id="comentarios" className="px-4 py-2 bg-secondary-complement text-dark-primary rounded-lg outline-2 outline-primary uppercase font-semibold focus:outline-dark-primary" rows={'3'} value={formState['comentarios'] ?? ''} onChange={onInputChange} />
                </SectionForm>
                <div className="md:text-base md:row-end-6 mt-10 2xl:col-start-2 2xl:col-span-2 flex gap-4">
                    <button
                        type="submit"
                        className={`bg-primary items-center text-center rounded-lg text-secondary-complement font-semibold cursor-pointer px-4 py-2 hover:bg-dark-primary transition-all text-sm focus:outline-dark-primary w-full`}
                    >
                        GUARDAR
                    </button>
                    {loteToEdit && <ViewButton type='button' onClick={() => viewNavigate(loteToEdit)} />}
                </div>
            </Form>
        </CardMain>
    )
}

export default GeneracionTarjetasForm