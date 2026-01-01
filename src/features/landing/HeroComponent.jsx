import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const description = "Take control of your personal finances by tracking every transaction, understanding your spending habits, and making smarter decisions with confidence.";

const HeroComponent = () => {
  return (
    <section className="bg-primary relative flex flex-col md:flex-row items-center px-10 py-10 overflow-hidden" id="home">
      <div className="flex-1 text-center md:text-left space-y-5" data-aos="fade-right" data-aos-duration="1300">
        <h1 className="text-[clamp(3px,100vw,32px)]  font-semibold text-primary-foreground">MonTrackr</h1>
        <p className="text-sm sm:text-lg md:text-xl italic text-foreground">"{description}"</p>
        <Button asChild size={`lg`} variant="secondary">
          <Link to="/login">Try Now</Link>
        </Button>
      </div>

      <div className="flex justify-center mt-10 md:mt-0" data-aos="fade-left" data-aos-duration="1300">
        <img src="/images/hero.png" alt="edit-image" className="w-8/12 drop-shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer" />
      </div>
    </section>
  );
};

export default HeroComponent;
