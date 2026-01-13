import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Transactions", href: "/transactions" },
  { label: "Recurring", href: "/recurring" },
  { label: "Analytics", href: "/analytics" },
];

const profileImages = {
  "profile-1": "/profile/1.png",
  "profile-2": "/profile/2.png",
  "profile-3": "/profile/3.png",
  "profile-4": "/profile/4.png",
  "profile-5": "/profile/5.png",
  "profile-6": "/profile/6.png",
};

const NavigationComponent = ({ dataUser }) => {
  const [navigationHamburger, setNavigationHamburger] = useState(false);
  const profileUser = useState(dataUser);

  useEffect(() => {
    const handleResize = () => {
      setNavigationHamburger(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className="bg-sidebar h-16 px-10 flex justify-between items-center sticky top-0 z-10 mt-5">
        <div className="flex items-center gap-3">
          <img src="./iconsWeb.jpg" className="w-6" />
          <h1 className="font-JetBrains text-xl">
            <a href="/dashboard">MonTrackr</a>
          </h1>
        </div>
        {/* CENTER */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex">
          <div className="flex gap-5">
            {navLinks.map((link, index) => (
              <a
                href={link.href}
                className={`text-foreground underline-offset-4 hover:underline
        relative no-underline!
        after:content-[''] after:absolute  after:bottom-0
        after:h-0.5 after:bg-foreground after:transition-all after:duration-300 after:left-1/2 after:-translate-x-1/2
        ${location.pathname === link.href ? "after:w-[70%] " : "after:w-[0%] hover:after:w-[70%] "}
      `}
                key={index}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        {/* RIGHT */}
        <div className="ml-auto hidden lg:flex ">
          <Link to={`/profile`}>
            <Avatar>
              <AvatarImage src={profileImages[profileUser?.profile]} />
              <AvatarFallback>
                <img src="/profile/1.png" alt="CN" />
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>

        {/* Mobile*/}
        <div className="lg:hidden flex items-center gap-5 ">
          <div
            className="cursor-pointer hover:bg-muted p-1 rounded"
            onClick={() => {
              setNavigationHamburger(!navigationHamburger);
            }}
          >
            <Menu />
          </div>
          <Link to={`/profile`}>
            <Avatar>
              <AvatarImage src={profileImages[profileUser?.profile]} />
              <AvatarFallback>
                <img src="/profile/1.png" alt="CN" />
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
        <div className={`w-fit absolute z-10 top-20 right-5 sm:right-10  ${navigationHamburger ? "block" : "hidden"}`}>
          <div className="bg-card flex flex-col rounded-lg justify-center items-center gap-2 py-2 shadow p-5">
            {navLinks.map((link, index) => (
              <a
                href={link.href}
                className={`text-foreground underline-offset-4 hover:underline
        relative no-underline!
        after:content-[''] after:absolute  after:bottom-0
        after:h-0.5 after:bg-foreground after:transition-all after:duration-300 after:left-1/2 after:-translate-x-1/2
        ${location.pathname === link.href ? "after:w-[70%] " : "after:w-[0%] hover:after:w-[70%] "}
      `}
                key={index}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationComponent;
