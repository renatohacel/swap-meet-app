/* eslint-disable no-unused-vars */

import { CardMain } from "../../ui/components/cards/CardMain"
import { useBoletos } from "./hooks/useBoletos";
import GenericButton from "../../ui/components/buttons/GenericButton";
import toast from "react-hot-toast";
import PrintIcon from "../../ui/components/icons/PrintIcon";
import Spinner from "../../ui/components/Spinner";
import Input from "../../ui/components/form/Input";
import { useForm } from "../../ui/hooks/useForm";

const initialFormBoletos = {
    id_tianguis: '',
}

const Boletos = () => {
    const { printBoletos, loading } = useBoletos();
    const { onInputChange, formState } = useForm(initialFormBoletos);

    const { id_tianguis } = formState;

    return (
        <CardMain title="IMPRESIÓN DE BOLETOS">

            <div className="flex md:flex-row flex-col gap-4 mt-2">
                <Input
                    placeholder="ID Tianguis"
                    name="id_tianguis"
                    value={id_tianguis}
                    onChange={(e) => onInputChange(e)}
                />
                <GenericButton
                    className={"self"}
                    onClick={() => {
                        if (!id_tianguis) {
                            toast.error('Por favor ingresa un ID de tianguis', { position: "top-right", duration: 1500 });
                            return;
                        };
                        printBoletos(id_tianguis);
                    }}
                    isSubmit={loading}
                    type="button"
                >
                    {loading ? (
                        <div className="flex justify-center items-center gap-2">
                            EN PROCESO
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