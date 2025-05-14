import { useState } from "react";

export const useForm = (initialForm) => {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = !isNaN(value) && value !== '' ? parseFloat(value) : value;

    setFormState({
      ...formState,
      [name]: parsedValue,
    });
  };

  const resetForm = () => {
    setFormState(initialForm)
  }

  return {
    formState,
    setFormState,
    onInputChange,
    resetForm
  };
};
