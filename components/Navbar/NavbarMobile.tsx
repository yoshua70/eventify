import { useState } from "react";
import { NavbarLinks } from "./NavbarLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faBars } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

export const NavbarMobile = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex flex-col md:hidden items-right">
      <p onClick={() => setIsVisible(!isVisible)} className="text-right">
        {!isVisible ? (
          <FontAwesomeIcon icon={faBars} />
        ) : (
          <FontAwesomeIcon icon={faX} />
        )}
      </p>
      <NavbarLinks isVisible={isVisible} className="flex flex-col items-end" />
    </div>
  );
};
