import { useLocation, useNavigate } from "react-router-dom";
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
import { CONSTANTS_ROUTES } from "../../../../utils/constansRoutes";
import { CardMain } from "../../../ui/components/cards/CardMain";
import { Tree } from 'antd';
import { treeData } from "../../../../utils/treePermissions";
import SaveButton from "../../../ui/components/buttons/SaveButton";



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

  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = expandedKeysValue => {
    console.log('onExpand', expandedKeysValue);
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  const onCheck = checkedKeysValue => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };
  const onSelect = (selectedKeysValue, info) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };


  const userToEdit = location.state?.user;

  const { onInputChange, formState, setFormState } = useForm(userToEdit || initialForm);

  const { handleInsertUser, handleUpdateUser } = useUser();

  useEffect(() => {
    if (location.pathname.includes('/update')) {
      if (!userToEdit) {
        navigate(CONSTANTS_ROUTES.CATALOGO.USUARIOS)
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
    <CardMain formTitle="USUARIO" cancelButton={true}>
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

        <SectionForm className="md:row-end-5">
          <span className="mb-2 font-semibold" htmlFor="permissions">
            ADMINISTRAR PERMISOS
          </span>

          <Tree
            id='permissions'
            checkable
            style={{
              padding: '2px',
              color: 'var(--color-dark-primary)',
              backgroundColor: 'var(--color-secondary-complement)',
              borderRadius: '8px',
            }}
            className="rounded-lg outline-2 outline-primary font-semibold md:w-96 w-full"
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            treeData={treeData}
          />

        </SectionForm>
        <div className='md:row-end-6 md:col-start-2 mt-8 flex justify-center'>
          <SaveButton />
        </div>


      </Form>
    </CardMain>
  );
};

export default UsersForm;
