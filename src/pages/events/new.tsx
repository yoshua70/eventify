import supabase from "lib/supabase";
import { useRouter } from "next/router";

const EventsNew = () => {
  const router = useRouter();

  return <div></div>;
};

export default EventsNew;

export async function getServerSideProps(req) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: "/sign-in" } };
  }

  return { props: { user } };
}
