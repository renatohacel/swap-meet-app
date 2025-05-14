import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Form from "../../../ui/components/form/Form";
import SectionForm from "../../../ui/components/form/SectionForm";
import Label from "../../../ui/components/form/Label";
import Input from "../../../ui/components/form/Input";
import { useForm } from "../../../ui/hooks/useForm";
import { CONSTANTS } from "../../../../utils/constans";
import { createUserSchema, updateUserSchema } from "../schemas/user.zod";
import { validateForm } from "../../../../utils/validateForm";
import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { Toaster } from "react-hot-toast";

const initialForm = {
  ...CONSTANTS.USERS.USER_FORM.reduce(
    (acc, { name }) => (name ? { ...acc, [name]: "" } : acc),
    {}
  ),
  type: CONSTANTS.USERS.USERS_TYPES[0].value,
  id: undefined,
};


const UsersForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const userToEdit = location.state?.user;

  const { onInputChange, formState, setFormState } = useForm(userToEdit || initialForm);

  const { handleInsertUser, handleUpdateUser } = useUser();

  useEffect(() => {
    if (location.pathname.includes('/update')) {
      if (!userToEdit) {
        navigate('/users')
      }
    }
  }, [])

  useEffect(() => {
    if (userToEdit) {
      setFormState(userToEdit);
    }
  }, [userToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const schemaToUse = userToEdit ? updateUserSchema : createUserSchema;
    const validate = validateForm(formState, schemaToUse);
    if (Object.keys(validate).length > 0) {
      setErrors(validate);
      return;
    }

    if (userToEdit) {
      handleUpdateUser(formState)
    } else {
      handleInsertUser(formState)
    }
    setErrors({})
  };

  return (
    <section>
      <Toaster />
      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
        <h1 className="text-primary text-3xl sm:text-5xl font-bold mb-5">
          {location.pathname.includes("/add") ? "NUEVO" : "ACTUALIZACIÓN DE"}{" "}
          USUARIO
        </h1>
        <NavLink
          className="bg-secondary items-center p-2 rounded-md text-secondary-complement font-semibold cursor-pointer h-full hover:bg-dark-primary transition-all text-sm md:text-base opacity-50 hover:opacity-100 mb-10 sm:mb-0"
          to={"/users"}
        >
          CANCELAR
        </NavLink>
      </div>

      <hr className="mb-12 text-primary/30 border-1" />

      <Form className="grid-cols-1 md:grid-cols-3" onSubmit={handleSubmit}>
        {CONSTANTS.USERS.USER_FORM.map(({ name, label, type }, index) => (
          <SectionForm key={index}>
            <Label htmlFor={name}>{label}</Label>
            <Input
              name={name}
              id={name}
              type={type}
              onChange={onInputChange}
              value={formState[name] || ''}
              className={'uppercase'}
              autoComplete={"off"}
            />
            {errors[name] && (
              <span className="text-red-700 font-semibold text-xs mt-1">
                {errors[name][0]}
              </span>
            )}
          </SectionForm>
        ))}
        <SectionForm>
          <Label htmlFor="type">TIPO</Label>
          <select
            onChange={onInputChange}
            value={formState['type'] || ''}
            id="type"
            name="type"
            className="px-4 py-2 bg-secondary-complement focus:text-dark-primary rounded-lg outline-2 outline-primary font-semibold focus:outline-dark-primary"
            required
          >
            {CONSTANTS.USERS.USERS_TYPES.map((type, index) => (
              <option key={index} value={type.value} className="font-semibold">
                {type.label}
              </option>
            ))}
          </select>
        </SectionForm>

        {userToEdit && (<SectionForm>
          <Label htmlFor="status">ESTATUS</Label>
          <select
            onChange={onInputChange}
            value={formState['status'] || ''}
            id="status"
            name="status"
            className="px-4 py-2 bg-secondary-complement focus:text-dark-primary rounded-lg outline-2 outline-primary font-semibold focus:outline-dark-primary"
            required
          >
            {CONSTANTS.USERS.USERS_STATUS.map((type, index) => (
              <option key={index} value={type.value} className="font-semibold">
                {type.label}
              </option>
            ))}
          </select>
        </SectionForm>)}

        {/* <SectionForm className="md:col-span-3">
          <Label htmlFor="permissions" className={"text-center"}>
            ADMINISTRAR PERMISOS
          </Label>
          <hr className="mb-12 text-primary/60 border-1" />
        </SectionForm> */}


        <button
          type="submit"
          className={`bg-primary items-center text-center rounded-lg text-secondary-complement font-semibold cursor-pointer px-4 py-2 hover:bg-dark-primary transition-all text-sm md:text-base mt-10  md:row-end-5 focus:outline-dark-primary md:col-start-2`}
        >
          GUARDAR
        </button>


      </Form>
    </section>
  );
};

export default UsersForm;
