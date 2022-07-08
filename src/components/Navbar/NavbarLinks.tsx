import supabase from "lib/supabase";
import { UserContext } from "context/UserContext";
import { useContext } from "react";
import { NavbarItem } from "./NavbarItem";

type NavbarLinksProps = {
  className: string;
  isVisible?: boolean;
};

const NavbarItems = () => {
  const userAuthState = useContext(UserContext);

  return (
    <>
      <NavbarItem to="/events" text="Plans" />
      {userAuthState === "not-authenticated" ? (
        <>
          <NavbarItem to="/sign-in" text="Connexion" />
          <NavbarItem to="/sign-up" text="Inscription" />
        </>
      ) : (
        <>
          <NavbarItem to="/profile" text="Profile" />
          <li
            onClick={() => supabase.auth.signOut()}
            className="no-underline text-slate-800"
          >
            Déconnexion
          </li>
        </>
      )}
    </>
  );
};

export const NavbarLinks = ({
  className,
  isVisible = true,
}: NavbarLinksProps) => {
  if (!isVisible) return null;

  return (
    <ul className={className}>
      <NavbarItems />
    </ul>
  );
};
