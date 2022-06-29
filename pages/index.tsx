import type { NextPage } from "next";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout title="Eventify - Home">
      <h1>Eventify</h1>
      <p>Create and share events with your friends.</p>
    </Layout>
  );
};

export default Home;
