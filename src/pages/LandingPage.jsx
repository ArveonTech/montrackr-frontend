import AboutComponent from "@/features/landing/AboutComponent";
import ContactComponent from "@/features/landing/ContactComponent";
import FeaturesComponent from "@/features/landing/FeaturesComponent";
import HeroComponent from "@/features/landing/HeroComponent";
import NavigationComponent from "@/features/landing/NavigationComponent";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  once: true,
});

const LandingPage = () => {
  return (
    <div>
      <NavigationComponent />
      <HeroComponent />
      <AboutComponent />
      <FeaturesComponent />
      <ContactComponent />
    </div>
  );
};

export default LandingPage;
