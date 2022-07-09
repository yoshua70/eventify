import { User } from "@supabase/supabase-js";
import Layout from "components/Layout";
import supabase from "lib/supabase";
import { NextPage } from "next";

type PageProps = {
  user: User | null;
};

const ProfilePage: NextPage<PageProps> = () => {
  return (
    <Layout title="Bienvenu">
      <div className="flex flex-col gap-8 items-center justify-center py-4 px-2 my-8 mx-2"></div>
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
