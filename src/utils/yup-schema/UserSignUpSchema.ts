import * as yup from "yup";

export const UserSignUpSchema = yup
  .object({
    email: yup
      .string()
      .email("Veuillez entrer une adresse email valide.")
      .required("Veuillez saisir une adresse email.")
      .matches(
        /^[a-zA-Z]+\.[a-zA-Z]+[0-9]{0,2}@inphb\.ci$/i,
        "Veuillez entrer un mail de l'inphb."
      ),
    password: yup
      .string()
      .required("Veuillez saisir un mot de passe.")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial."
      ),
    password_confirmation: yup
      .string()
      .required("Veuillez confirmer votre mot de passe.")
      .oneOf(
        [yup.ref("password"), null],
        "Les mots de passe ne correspondent pas."
      ),
  })
  .required();
