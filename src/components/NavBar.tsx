import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import { MdRestaurant } from "react-icons/md"; // Changed from MdApi to MdRestaurant for relevance


const NavBar = () => {
  return (
    <Navbar className="bg-slate-100 h-16">
      <NavbarBrand>
        <MdRestaurant className="w-8 h-8 text-primary" /> {/*  icon */}
        <p className="font-bold text-inherit">Restaurant Finder</p> {/*  text to restaurant */}
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {/* Here you can add links to different parts of your application if needed */}
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
