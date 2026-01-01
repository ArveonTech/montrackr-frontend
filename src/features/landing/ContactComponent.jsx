// components
import { Contact } from "lucide-react";

const ContactComponent = () => {
  return (
    <section id="contact" className="py-16 px-6" data-aos="fade-up" data-aos-duration="1300">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <p className="text-muted-foreground mb-10">Want to connect or learn more about this project? You can find me through the platforms below.</p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a href="https://github.com/ArveonTech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-5 py-3 border rounded-lg hover:bg-muted transition">
            <img src="/images/icons/github.png" alt="github-image" className="w-7 h-7" />
            <span>GitHub</span>
          </a>

          <a href="https://www.linkedin.com/in/ahdarizqi/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-5 py-3 border rounded-lg hover:bg-muted transition">
            <img src="/images/icons/linkedin.svg" alt="linkedin-image" className="w-7 h-7" />
            <span>LinkedIn</span>
          </a>

          <a href="https://www.instagram.com/4hdarizq1/" className="flex items-center gap-3 px-5 py-3 border rounded-lg hover:bg-muted transition">
            <img src="/images/icons/instagram.png" alt="instagram-image" className="w-7 h-7" />
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactComponent;
