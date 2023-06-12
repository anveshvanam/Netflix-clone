import { Link } from "react-router-dom";

const Footer = () => {
  const scrollTop = () => {
    const scrolled = window.scrollY;
    if (scrolled >= 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // ...
    }
  };

  const footerImg =
    "https://res09.bignox.com/appcenter/en/2020/02/US-en-20200210-popsignuptwoweeks-perspective_alpha_website_large.jpg";
  return (
    <div
      className="footer h-[70vh] w-full bg-gradient-to-b from-black via-black to-transparent relative flex flex-col justify-center items-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url(${footerImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center bottom",
      }}
    >
      <h1 className="text-white text-4xl hover:text-red-700 transition-colors duration-300">
        <a onClick={scrollTop} className="cursor-pointer ">
          Movieflix
        </a>
      </h1>
      <ul className="flex flex-wrap w-1/3 h-30 gap-5 mt-10 justify-center items-center">
        <li className="text-white text-sm hover:text-red-700 transition-colors duration-500 mx-10">
          <a href="https://github.com/anveshvanam">Github</a>
        </li>
        <li className="text-white text-sm  hover:text-red-700 transition-colors duration-500  mx-10">
          <a href="https://linkedin.com/in/anveshvanam">Linkedin</a>
        </li>
        <li className="text-white text-sm  hover:text-red-700 transition-colors duration-500  mx-10">
          <a href="https://twitter.com/___anvesh___">Twitter</a>
        </li>
        <li className="text-white text-sm  hover:text-red-700 transition-colors duration-500  mx-10">
          <a href="mailto:anveshvanam5@gmail.com">Contact</a>
        </li>
        <li className="text-white text-sm hover:text-red-700 transition-colors duration-500  mx-10">
          <a href="https://github.com/anveshvanam">Github</a>
        </li>
        <li className="text-white text-sm  hover:text-red-700 transition-colors duration-500  mx-10">
          <a href="https://linkedin.com/in/anveshvanam">Linkedin</a>
        </li>
        <li className="text-white text-sm  hover:text-red-700 transition-colors duration-500  mx-10">
          <a href="https://twitter.com/___anvesh___">Twitter</a>
        </li>
        <li className="text-white text-sm  hover:text-red-700 transition-colors duration-500  mx-10">
          <a href="mailto:anveshvanam5@gmail.com">Contact</a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
