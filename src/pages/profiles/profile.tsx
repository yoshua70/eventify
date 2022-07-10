import { User } from "@supabase/supabase-js";
import Layout from "components/Layout";
import ProfileForm from "components/ProfileForm";
import supabase from "lib/supabase";
import { NextPage } from "next";

type PageProps = {
  user: User | null;
};

const ProfilePage: NextPage<PageProps> = ({ user }: PageProps) => {
  return (
    <Layout title="Bienvenu">
      <div className="flex flex-col gap-8 justify-center items-center py-4 px-2 my-8 mx-2 w-full">
        <h1 className="text-4xl">Profil</h1>
        <ProfileForm user={user} />
      </div>
    </Layout>
  );
};

export default ProfilePage;

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: "/sign-in" } };
  }

  return { props: { user } };
}
