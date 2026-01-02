import AboutComponent from "@/features/landing/Component/AboutComponent";
import ContactComponent from "@/features/landing/Component/ContactComponent";
import FeaturesComponent from "@/features/landing/Component/FeaturesComponent";
import HeroComponent from "@/features/landing/Component/HeroComponent";
import NavigationComponent from "@/features/landing/Component/NavigationComponent";
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
