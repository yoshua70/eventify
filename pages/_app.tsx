import "styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "lib/supabase";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";

function MyApp({ Component, pageProps }: AppProps) {
  const [authenticatedState, setAuthenticatedState] =
    useState("not-authenticated");

  const router = useRouter();

  const handleAuthChange = async (
    event: AuthChangeEvent,
    session: Session | null
  ) => {
    await fetch("/api/login", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  };

  const checkUser = async () => {
    const user = await supabase.auth.user();
    if (user) setAuthenticatedState("authenticated");
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);
        if (event === "SIGNED_IN") {
          setAuthenticatedState("auhtenticated");
          router.push(`/profile?user_id=${session?.user?.id}`);
        }
        if (event === "SIGNED_OUT") setAuthenticatedState("not-auhtenticated");

        checkUser();

        return () => {
          authListener?.unsubscribe();
        };
      }
    );
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
