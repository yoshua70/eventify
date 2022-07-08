import { UserContext } from "context/UserContext";
import type { NextPage } from "next";
import Link from "next/link";
import { useContext } from "react";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const userAuthState = useContext(UserContext);

  return (
    <Layout title="Eventify - Home">
      <div className="flex flex-col my-8 items-center gap-8">
        <h1 className="text-6xl font-bold">Eventify</h1>
        <p>Créez vos plans et invitez vos amis !</p>
        {userAuthState === "not-authenticated" && (
          <Link href="/sign-in">
            <a className="no-underline px-4 py-2 bg-blue-500 text-slate-200 rounded">
              Commencer
            </a>
          </Link>
        )}
      </div>
    </Layout>
  );
};

export default Home;
