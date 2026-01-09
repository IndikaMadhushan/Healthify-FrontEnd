import Button from "./HomeButton";
import AnimatedText from "./AnimatedText";
import { useNavigate } from "react-router-dom";

const Hero = ({ colorDeep, FirstText, mainText, subText, img }) => {
   const navigate = useNavigate();

  return (
    <main className="flex lg:flex-row lg:items-center z-10 flex-col item-start px-4 relative overflow-hidden lg:pr-16 xl:pl-30 lg:pl-15 lg:h-[600px] ">
      <div className="flex flex-col gap-4 lg:w-1/2 justify-center lg:items-start lg:text-left w-full items-center text-center mb-5 md:mb-0 pt-6">
        <h1 className="mx-auto sm:text-4xl  lg:text-4xl  xl:text-5xl text-2xl lg:mx-0 font-semibold leading-tight xl:w-[700px] lg:w-[500px] sm:w-[500px] xs:w-[310px] w-[240px]">
          <AnimatedText
            text={FirstText}
            className="font-head  text-[#454545]"
          />
          {" "}
          <AnimatedText
            text={mainText}
            className="font-head"
            style={{ color: colorDeep }}
          />
        </h1>

        <p className="leading-normal text-md sm:text-lg lg:text-lg xl:text-5xl text-[#454545]">
          {subText}
        </p>

        <Button onClick={() => navigate("/login")}
          type="button"
          text="Get Started"
          className="lg:mt-8 my-4 sm:text-lg text-sm font-bold py-4 px-9 focus:outline-none "
          style={{ backgroundColor: colorDeep }}
        />
      </div>

      <div className="lg:w-3/4 w-full lg:mt-6 relative">
  <img
    src={img}
    loading="eager"
    alt="Hero Image"
    className="w-full h-auto max-w-[800px] mx-auto object-cover hero-image-animated hero-image-float"
    width="800"
    height="600"
  />
</div>
    </main>
  );
};

export default Hero;
