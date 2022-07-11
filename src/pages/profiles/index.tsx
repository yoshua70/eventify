import Layout from "components/Layout";
import supabase from "lib/supabase";
import { useQuery } from "react-query";
import { GetServerSideProps } from "next";
import { User } from "@supabase/supabase-js";
import LoadingSpinner from "components/LoadingScreen";
import { useUserData } from "hooks";
import ProfileForm from "components/ProfileForm";
import { useEffect } from "react";

const ProfilePage: React.FC<{ user: User }> = ({ user }) => {
  const { data, isLoading } = useUserData(user.id);

  return (
    <Layout>
      <div className="flex flex-col items-center w-full md:w-fit">
        <h1>Profil</h1>
        {isLoading ? (
          <LoadingSpinner color="#000" loading={isLoading} />
        ) : (
          <ProfileForm user={data.user} />
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) return { props: {}, redirect: { destination: "/sign-in" } };

  return { props: { user } };
};

export default ProfilePage;
