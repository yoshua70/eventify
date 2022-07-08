import { NextPage } from "next";
import Layout from "components/Layout";
import SignInForm from "components/SignInForm";

const SignInPage: NextPage = () => {
  return (
    <Layout title="Connexion">
      <h1 className="my-4 text-xl"></h1>
      <SignInForm />
    </Layout>
  );
};

export default SignInPage;
