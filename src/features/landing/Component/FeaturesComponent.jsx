import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const accordionItems = [
  {
    title: "Why Use MonTrackr?",
    content: "MonTrackr helps users understand how their money flows by organizing income and expenses into a clear and structured view, making financial tracking easier and more intentional.",
  },
  {
    title: "Who Is MonTrackr For?",
    content: "MonTrackr is suitable for anyone who wants to track their finances, monitor spending habits, and gain better insight into their financial activities.",
  },
  {
    title: "Expense & Income Tracking",
    content: "Users can record daily income and expenses and review them by category and time period to better understand spending patterns.",
  },
  {
    title: "Budget, Subscription, and Goals",
    content: "MonTrackr provides budgeting tools, subscription tracking, and financial goals to help users plan spending, manage recurring costs, and stay focused on financial targets.",
  },
  {
    title: "Is MonTrackr Free?",
    content: "Yes. MonTrackr is completely free and was developed as a learning project to explore personal finance concepts and modern web application development.",
  },
];

const FeaturesComponent = () => {
  return (
    <section className="px-10 mt-10 md:mt-20" id="about" data-aos="fade-up" data-aos-duration="1300">
      <Accordion type="multiple">
        {accordionItems.map((accordion, index) => (
          <AccordionItem value={accordion.title} key={index}>
            <AccordionTrigger>{accordion.title}</AccordionTrigger>
            <AccordionContent>{accordion.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FeaturesComponent;
