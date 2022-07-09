import * as yup from "yup";

export const UserProfileSchema = yup
  .object({
    email: yup
      .string()
      .email("Veuillez entrer une adresse email valide.")
      .matches(
        /^[a-zA-Z]+\.[a-zA-Z]+[0-9]{0,2}@inphb\.ci$/i,
        "Veuillez entrer un mail de l'inphb."
      ),
    username: yup
      .string()
      .max(50)
      .min(3)
      .required("Veuillez saisir un nom d'utilisateur."),
    bio: yup.string().max(255).nullable(),
  })
  .required();
