const AboutComponent = () => {
  return (
    <article className="px-10 mt-10 md:mt-20" id="about" data-aos="fade-right" data-aos-duration="1300">
      <h1 className="text-xl sm:text-2xl md:text-3xl">📝 About</h1>
      <p className="mt-5 sm:indent-8 sm:leading-7 tracking-wide text-justify">
        MonTrackr is a personal finance application that helps you record, understand and control your daily finances more neatly and purposefully. Starting from income, expenses, to financial summaries, everything is presented in one
        simple and easy to understand place. This application is designed for users who want to be more aware of where their money is going, without having to bother with complex processes. With a clean look and focus on key needs.
        MonTrackr was created with a modern approach, prioritizing user experience, performance and data clarity, so that managing finances feels lighter and makes sense for everyday life.
      </p>
    </article>
  );
};

export default AboutComponent;
