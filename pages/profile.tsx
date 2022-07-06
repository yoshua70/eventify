import { User } from "@supabase/supabase-js";
import Layout from "components/Layout";
import supabase from "lib/supabase";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { NextRequest } from "next/server";

type PageProps = {
  user: User | null;
};

const ProfilePage: NextPage<PageProps> = ({ user }) => {
  const router = useRouter();
  const { user_id } = router.query;

  return (
    <Layout title="Bienvenu">
      <div className="flex flex-col gap-8 items-center justify-center py-4 px-2 my-8 mx-2">
        <h1 className="text-6xl font-bold">Akwaba</h1>
        <p className="text-center">Bienvenu {user_id?.toString()}</p>
      </div>
    </Layout>
  );
};

export default ProfilePage;

export async function getServerSideProps(req: NextRequest) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: "/sign-in" } };
  }

  return { props: { user } };
}
