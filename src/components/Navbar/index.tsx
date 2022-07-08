import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { NavbarMobile } from "./NavbarMobile";

const Navbar = () => {
  return (
    <nav className="bg-white drop-shadow-sm shadow-slate-300 w-full px-2 py-4 flex flex-col">
      <div className="flex justify-between">
        <Link href="/">
          <a className="font-bold no-underline text-slate-800">eventily</a>
        </Link>
        <NavbarLinks className="hidden md:flex gap-4" />
        <NavbarMobile />
      </div>
    </nav>
  );
};

export default Navbar;
