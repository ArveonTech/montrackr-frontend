import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
];

const NavigationComponent = () => {
  const [navigationHamburger, setNavigationHamburger] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setNavigationHamburger(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-sidebar h-16 px-10 flex justify-between shadow items-center sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <img src="./iconsWeb.jpg" className="w-6" />
        <h1 className="font-JetBrains text-xl">
          <a href="/">MonTrackr</a>
        </h1>
      </div>

      {/* CENTER */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-6">
            {navLinks.map((link, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink href={link.href} className={cn((index === 3 || index === 4) && "md:hidden")}>
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* RIGHT */}
      <div className="ml-auto hidden lg:flex gap-2 ">
        <Button variant="ghost" asChild className={`cursor-pointer`}>
          <a href="/login">Login</a>
        </Button>
        <Button className={`cursor-pointer`}>
          <a href="/register">Register</a>
        </Button>
      </div>

      {/* Tablet */}
      <div className="hidden md:flex lg:hidden items-center gap-4">
        <div className="flex gap-2 ">
          <Button variant="ghost" className={`cursor-pointer`} asChild>
            <a href="/login">Login</a>
          </Button>
          <Button className={`cursor-pointer`}>
            <a href="/register">Register</a>
          </Button>
        </div>
        <div
          className="cursor-pointer hover:bg-muted p-1"
          onClick={() => {
            setNavigationHamburger(!navigationHamburger);
          }}
        >
          <Menu />
        </div>
      </div>

      {/* Mobile*/}
      <div className="md:hidden flex items-center">
        <div
          className="cursor-pointer hover:bg-muted p-1"
          onClick={() => {
            setNavigationHamburger(!navigationHamburger);
          }}
        >
          <Menu />
        </div>
      </div>

      <div className={`w-30 absolute z-10 top-20 right-5 sm:right-10  ${navigationHamburger ? "block" : "hidden"}`}>
        <div className="bg-card flex flex-col rounded-lg justify-center items-center gap-2 py-2 shadow">
          {navLinks.map((link, index) => (
            <a key={index} href={link.href} className={cn("text-foreground underline-offset-4 hover:underline ", (index === 3 || index === 4) && "md:hidden")}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavigationComponent;
