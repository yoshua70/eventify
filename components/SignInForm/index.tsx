import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { UserSignInSchema } from "helpers/yup-schema/UserSignInSchema";
import supabase from "lib/supabase";
import { useRouter } from "next/router";
import { useState } from "react";
import { ApiError } from "@supabase/supabase-js";
import Link from "next/link";

type FormValues = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const router = useRouter();
  const [authError, setAuthError] = useState<ApiError | null>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(UserSignInSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const { user, error } = await supabase.auth.signIn({
      email: data.email,
      password: data.password,
    });

    if (error) setAuthError(error);
    if (user) router.push(`/profile?user_id${user.id}`);
  });

  return (
    <div className="flex flex-col bg-white rounded drop-shadow-sm px-4 py-2 w-full sm:max-w-md items-center">
      <h1 className="text-xl font-bold">Connexion</h1>
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
        {authError && (
          <div className="animated-translate-y">
            <p className="text-sx text-red-700">{authError.message}</p>
          </div>
        )}
        <button className="animated-translate-y bg-blue-700" type="submit">
          Connexion
        </button>
      </form>
      <p>
        Vous ne possédez pas encore de compte ?{" "}
        <Link href="/sign-up">
          <a>Inscrivez-vous</a>
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
