import { NextPage } from "next";
import Layout from "components/Layout";
import SignUpForm from "components/SignUpForm";

const SignUpPage: NextPage = () => {
  return (
    <Layout title="Inscription">
      <h1 className="my-4 text-xl">Let&apos;s start.</h1>
      <SignUpForm />
    </Layout>
  );
};

export default SignUpPage;
