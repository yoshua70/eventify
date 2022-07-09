import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "@supabase/supabase-js";
import LoadingSpinner from "components/LoadingScreen";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { UserProfileSchema } from "utils/yup-schema/UserProfileSchema";

type ComponentProps = {
  user: User | null;
};

type FormValues = {
  username: string;
  bio: string;
  email: string;
};

const ProfileForm = ({ user }: ComponentProps) => {
  const { isLoading, error, data } = useQuery(["userData"], async () => {
    const res = await fetch(`/api/users/${user?.id}`).then((res) => res.json());
    return res;
  });

  const mutation = useMutation(async (data: FormValues) => {
    const res = await fetch("/api/profiles/upsert", {
      body: JSON.stringify({
        username: data.username,
        bio: data.bio,
        email: data.email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const userData = await res.json();

    return userData;
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(UserProfileSchema),
  });

  if (mutation.isLoading)
    return <LoadingSpinner loading={mutation.isLoading} color="#000000" />;

  if (isLoading) return <LoadingSpinner loading={isLoading} color="#000000" />;

  if (!data.email) return <p>User not found</p>;

  if (error) return <p>Le kpla n&apos;est pas bon</p>;

  return (
    <div className="flex flex-col bg-white rounded drop-shadow-sm px-4 py-2 w-full sm:max-w-md items-center">
      <form
        className="flex flex-col w-full gap-4 my-8"
        onSubmit={handleSubmit((data) => mutation.mutate(data))}
      >
        <div className="animated-translate-y">
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            type="text"
            placeholder="john.doe18@inphb.ci"
            defaultValue={data.email}
            disabled={true}
          />
          {errors?.email && (
            <p className="text-sx text-red-700">{errors.email.message}</p>
          )}
        </div>
        <div className="animated-translate-y">
          <label htmlFor="username">Nom d&apos;utilisateur</label>
          <input
            {...register("username")}
            type="text"
            placeholder="JohDoe"
            defaultValue={data.profile && data.profile.username}
          />
          {errors?.username && (
            <p className="text-sx text-red-700">{errors.username.message}</p>
          )}
        </div>
        <div className="animated-translate-y">
          <label htmlFor="bio">Bio</label>
          <textarea
            {...register("bio")}
            placeholder="The OG one."
            defaultValue={data.profile && data.profile.bio}
          ></textarea>
          {errors?.bio && (
            <p className="text-sx text-red-700">{errors.bio.message}</p>
          )}
        </div>
        <button
          className="animated-translate-y bg-blue-700"
          type="submit"
          onClick={() => setValue("email", data.email)}
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
