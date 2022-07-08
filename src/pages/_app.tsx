import "styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "lib/supabase";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { UserContext } from "context/UserContext";

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
    const user = supabase.auth.user();
    if (user) setAuthenticatedState("authenticated");
  };

  useEffect(() => {
    supabase.auth.user()
      ? setAuthenticatedState("authenticated")
      : setAuthenticatedState("not-authenticated");

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);
        if (event === "SIGNED_IN") {
          setAuthenticatedState("auhtenticated");
          router.push("/profile");
        }
        if (event === "SIGNED_OUT") {
          setAuthenticatedState("not-auhtenticated");
          router.push("/sign-in");
        }

        checkUser();

        return () => {
          authListener?.unsubscribe();
        };
      }
    );
  }, [router]);

  return (
    <UserContext.Provider value={authenticatedState}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
