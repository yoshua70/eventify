import Link from "next/link";
import { useState } from "react";
import { NavbarMobile } from "./NavbarMobile";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <nav className="bg-white drop-shadow-sm shadow-slate-300 w-full px-2 py-4 flex flex-col">
      <div className="flex justify-between">
        <Link href="/">
          <a className="font-bold no-underline text-slate-800">eventily</a>
        </Link>
        {!isVisible ? (
          <p onClick={() => setIsVisible(!isVisible)}>open</p>
        ) : (
          <p onClick={() => setIsVisible(!isVisible)}>close</p>
        )}
      </div>
      <NavbarMobile isVisible={isVisible} />
    </nav>
  );
};

export default Navbar;
