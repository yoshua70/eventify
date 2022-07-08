import Link from "next/link";

type NavbarItemProps = {
  to: string;
  text: string;
};

export const NavbarItem = ({ to, text }: NavbarItemProps) => {
  return (
    <li>
      <Link href={to}>
        <a className="no-underline text-slate-800">{text}</a>
      </Link>
    </li>
  );
};
