import Layout from "components/Layout";
import { NextPage } from "next";
import { useRouter } from "next/router";

const WelcomePage: NextPage = () => {
  const router = useRouter();
  const { email } = router.query;

  return (
    <Layout title="Bienvenu">
      <div className="flex flex-col gap-8 items-center justify-center py-4 px-2 my-8 mx-2">
        <h1 className="text-6xl font-bold">Akwaba</h1>
        <p className="text-center">
          Merci pour votre inscription. Veuillez vérifier votre boîte de
          réception {email} pour confirmer votre adresse email!
        </p>
      </div>
    </Layout>
  );
};

export default WelcomePage;
