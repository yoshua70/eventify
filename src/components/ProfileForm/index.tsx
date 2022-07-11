import { Profile, User } from ".prisma/client";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingSpinner from "components/LoadingScreen";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { UserProfileSchema } from "utils/yup-schema/UserProfileSchema";

type FormValues = {
  email: string;
  username: string;
  bio: string;
};

const ProfileForm: React.FC<{ user: User & { profile: Profile | null } }> = ({
  user,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(UserProfileSchema),
  });

  const mutation = useMutation(async (data: FormValues) => {
    const res = await fetch("/api/profiles/update", {
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

    return await res.json();
  });

  if (mutation.isLoading)
    return <LoadingSpinner loading={mutation.isLoading} color="#000000" />;

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
            defaultValue={user.email}
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
            defaultValue={user.profile ? user.profile.username : ""}
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
            defaultValue={user.profile?.bio ? user.profile.bio : ""}
          ></textarea>
          {errors?.bio && (
            <p className="text-sx text-red-700">{errors.bio.message}</p>
          )}
        </div>
        <button
          className="animated-translate-y bg-blue-700"
          type="submit"
          onClick={() => setValue("email", user.email)}
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
