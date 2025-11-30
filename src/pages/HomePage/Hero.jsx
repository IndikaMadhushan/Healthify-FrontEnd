import Button from "./HomeButton";
import AnimatedText from "./AnimatedText";

const Hero = ({ colorDeep, FirstText, mainText, subText, img }) => {
  return (
    <main className="flex lg:flex-row lg:items-center z-10 flex-col item-start px-4 relative overflow-hidden md:pr-16 md:pl-30 lg:h-[600px]">
      <div className="flex flex-col gap-4 lg:w-1/2 justify-center lg:items-start lg:text-left w-full items-center text-center mb-5 md:mb-0 pt-6">
        <h1 className="text-4xl mx-auto lg:text-5xl lg:mx-0 font-semibold leading-tight">
          <AnimatedText
            text={FirstText}
            className="font-head text-[#454545]"
          />
          {" "}
          <AnimatedText
            text={mainText}
            className="font-head"
            style={{ color: colorDeep }}
          />
        </h1>

        <p className="leading-normal text-lg md:text-2xl text-[#454545]">
          {subText}
        </p>

        <Button
          type="button"
          text="Get Started"
          className="mt-8 text-xl font-bold py-4 px-9 focus:outline-none md:w-2/5 lg:w-1/2 2xl:w-2/5"
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
