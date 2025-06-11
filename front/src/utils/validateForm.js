export const validateForm = (formData, schema,) => {
  const result = schema.safeParse(formData);
  if (!result.success) {
    const fieldErrors = result.error?.flatten().fieldErrors;
    return fieldErrors;
  } else {
    return {};
  }
};
