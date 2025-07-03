/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Form from "../../../ui/components/form/Form"
import Input from "../../../ui/components/form/Input";
import Label from "../../../ui/components/form/Label";
import SectionForm from "../../../ui/components/form/SectionForm"
import { useForm } from "../../../ui/hooks/useForm";
import toast, { Toaster } from "react-hot-toast";
import ShowPasswordButton from "../../../ui/components/buttons/ShowPasswordButton";
import { useUser } from "../hooks/useUser";


const PasswordForm = ({ id, handleOk, handleCancel }) => {

    const initialForm = {
        id: id,
        old_password: '',
        new_password: '',
        confirm_password: '',
    }
    const { onInputChange, formState, resetForm } = useForm(initialForm);

    const { handleUpdatePassword } = useUser();

    const [showPassActual, setShowPassActual] = useState(false);
    const [showPassNew, setShowPassNew] = useState(false);
    const [showPassNewConfirm, setShowPassNewConfirm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const emptyFields = Object.entries(formState).filter(([key, value]) =>
            key !== 'id' && (!value || value.toString().trim() === '')
        );

        if (emptyFields.length > 0) {
            return toast.error("LOS CAMPOS SON OBLIGATORIOS", {
                duration: 1500,
                position: "top-center",
            });
        } else if (formState.old_password === formState.new_password) {
            return toast.error("LA NUEVA CONTRASEÑA ES IGUAL A LA ACTUAL", {
                duration: 1500,
                position: "top-center",
            });
        } else if (formState.new_password !== formState.confirm_password) {
            return toast.error("LAS CONTRASEÑAS NO COINCIDEN", {
                duration: 1500,
                position: "top-center",
            });
        }

        handleUpdatePassword(formState).then(() => {
            handleOk()
        })
        resetForm();

    }

    useEffect(() => {
        if (handleCancel) {
            resetForm();
            setShowPassActual(false);
            setShowPassNew(false);
            setShowPassNewConfirm(false);
        }
    }, [handleCancel]);

    return (
        <section>
            <Toaster />
            <h1 className="text-primary text-xl sm:text-xl font-bold mb-5">
                ACTUALIZAR CONTRASEÑA
            </h1>
            <hr className="mb-12 text-primary/30 border-1" />

            <Form className="grid-cols-1 px-10 mb-10" onSubmit={handleSubmit}>
                <SectionForm>
                    <Label htmlFor='old_password'>CONTRASEÑA ACTUAL</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            className={'w-full'}
                            name='old_password'
                            id='old_password'
                            type={!showPassActual ? 'password' : 'text'}
                            onChange={onInputChange}
                            value={formState['old_password'] || ''}
                            autoComplete={"off"}
                        />
                        <ShowPasswordButton setShowPassword={setShowPassActual} showPassword={showPassActual} />
                    </div>
                </SectionForm>

                <SectionForm>
                    <Label htmlFor='new_password'>NUEVA CONTRASEÑA</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            className={'w-full'}
                            name='new_password'
                            id='new_password'
                            type={!showPassNew ? 'password' : 'text'}
                            onChange={onInputChange}
                            value={formState['new_password'] || ''}
                            autoComplete={"off"}
                        />
                        <ShowPasswordButton setShowPassword={setShowPassNew} showPassword={showPassNew} />

                    </div>
                </SectionForm>

                <SectionForm>
                    <Label htmlFor='confirm_password'>CONFIRMAR CONTRASEÑA</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            className={'w-full'}
                            name='confirm_password'
                            id='confirm_password'
                            type={!showPassNewConfirm ? 'password' : 'text'}
                            onChange={onInputChange}
                            value={formState['confirm_password'] || ''}
                            autoComplete={"off"}
                        />

                        <ShowPasswordButton setShowPassword={setShowPassNewConfirm} showPassword={showPassNewConfirm} />
                    </div>
                </SectionForm>

                <div className="flex justify-end mt-4">
                    <button
                        key="ok"
                        type="submit"
                        className=" text-secondary-complement bg-primary items-center text-center rounded-lg hover:outline-none hover:text-secondary-complement font-semibold cursor-pointer px-4 py-2 hover:bg-dark-primary transition-all text-sm focus:outline-dark-primary border-2 border-primary hover:border-dark-primary"
                    >
                        Guardar
                    </button>
                </div>

            </Form>


        </section>
    )
}

export default PasswordForm