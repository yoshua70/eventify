import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserSignUpSchema } from "utils/yup-schema/UserSignUpSchema";
import { useRouter } from "next/router";

type FormValues = {
  email: string;
  password: string;
  password_confirmation: string;
};

const SignUpForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(UserSignUpSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch("/api/register", {
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { user } = await res.json();

    if (user) router.push(`/welcome?email=${user.email}`);
  });

  return (
    <div className="flex flex-col bg-white rounded drop-shadow-sm px-4 py-2 w-full sm:max-w-md items-center">
      <h1 className="text-xl font-bold">Inscription</h1>
      <form className="flex flex-col w-full gap-4 my-8" onSubmit={onSubmit}>
        <div className="animated-translate-y">
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="john@doe.com"
          />
          {errors?.email && (
            <p className="text-sx text-red-700">{errors.email.message}</p>
          )}
        </div>
        <div className="animated-translate-y">
          <label htmlFor="password">Mot de passe</label>
          <input
            {...register("password")}
            type="password"
            placeholder="strong password..."
          />
          {errors?.password && (
            <p className="text-sx text-red-700">{errors.password.message}</p>
          )}
        </div>
        <div className="animated-translate-y">
          <label htmlFor="password_confirmation">
            Confirmez le mot de passe
          </label>
          <input
            {...register("password_confirmation")}
            type="password"
            placeholder="confirm password..."
          />
          {errors?.password_confirmation && (
            <p className="text-sx text-red-700">
              {errors.password_confirmation.message}
            </p>
          )}
        </div>
        <button className="animated-translate-y bg-blue-700" type="submit">
          Inscription
        </button>
      </form>
      <p>
        Vous possédez déjà un compte ? <a href="/sign-in">Connectez-vous</a>
      </p>
    </div>
  );
};

export default SignUpForm;
