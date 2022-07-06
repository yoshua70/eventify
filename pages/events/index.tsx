import Layout from "components/Layout";
import Link from "next/link";

const Events = () => {
  return (
    <Layout title="Plans">
      <div className="flex flex-col my-8">
        <Link href="#">
          <a className="btn max-w-fit">Créez votre plan.</a>
        </Link>
        <h1>Retrouvez tous les bons plans de ce week-end !</h1>
      </div>
    </Layout>
  );
};

export default Events;
