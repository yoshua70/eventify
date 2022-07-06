import supabase from "lib/supabase";
import { useRouter } from "next/router";
import { NextRequest } from "next/server";

const EventsNew = () => {
  const router = useRouter();

  return <div></div>;
};

export default EventsNew;

export async function getServerSideProps(req: NextRequest) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: "/sign-in" } };
  }

  return { props: { user } };
}
