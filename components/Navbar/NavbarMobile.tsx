import { useState } from "react";
import { NavbarLinks } from "./NavbarLinks";

export const NavbarMobile = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex flex-col md:hidden items-right">
      <p onClick={() => setIsVisible(!isVisible)} className="text-right">
        {!isVisible ? "open" : "close"}
      </p>
      <NavbarLinks isVisible={isVisible} className="flex flex-col items-end" />
    </div>
  );
};
