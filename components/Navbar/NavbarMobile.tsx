import supabase from "lib/supabase";
import Link from "next/link";

type ComponentProps = {
  isVisible: boolean;
};

type NavbarItemProps = {
  to: string;
  text: string;
};

const NavbarItem = ({ to, text }: NavbarItemProps) => {
  return (
    <li>
      <Link href={to}>
        <a className="no-underline text-slate-800">{text}</a>
      </Link>
    </li>
  );
};

export const NavbarMobile = ({ isVisible }: ComponentProps) => {
  if (!isVisible) return null;

  return (
    <ul className="flex flex-col items-center gap-4">
      {!supabase.auth.user() ? (
        <>
          <NavbarItem to="/sign-in" text="Connexion" />
          <NavbarItem to="/sign-up" text="Inscription" />
        </>
      ) : (
        <NavbarItem to="/profile" text="Profile" />
      )}
    </ul>
  );
};
