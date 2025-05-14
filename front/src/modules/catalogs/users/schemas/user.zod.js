import { z } from "zod";

const baseSchema = {
  username: z
    .string({ required_error: "El usuario es obligatorio" })
    .min(5, "El usuario debe tener mínimo 5 carácteres")
    .max(15, "El usuario debe tener máximo 15 carácteres"),
  first_lastname: z.string({
    required_error: "El apellido paterno es obligatorio",
  }),
  second_lastname: z.string({
    required_error: "El apellido materno es obligatorio",
  }),
  full_name: z.string({
    required_error: "El nombre es obligatorio",
  }),
};

export const createUserSchema = z.object({
  ...baseSchema,
  password: z
    .string({ required_error: "La contraseña es obligatoria" })
    .min(3, "La contraseña debe tener mínimo 3 carácteres")
    .max(15, "El usuario debe tener máximo 15 carácteres"),
});

export const updateUserSchema = z.object({
  ...baseSchema,
  password: z
    .string()
    .min(3, "La contraseña debe tener mínimo 3 carácteres")
    .max(15, "El usuario debe tener máximo 15 carácteres")
    .optional(),
});