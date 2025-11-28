import Button from "./HomeButton";

const Hero = ({ colorDeep,FirstText, mainText, shadow, mobileShadow, subText, img ,}) => {
  return (
    <main className="flex lg:flex-row lg:items-center z-10 flex-col item-start px-4 relative overflow-hidden md:px-16 lg:h-[600px]">
      <div className="flex flex-col gap-4 lg:w-1/2 justify-center lg:items-start lg:text-left w-full items-center text-center mb-5 md:mb-0">
        <h1 className="text-4xl mx-automd:text-5xl lg:mx-0 font-bold leading-tight text-navy">
          <span style={{ color:'#454545' }}>{FirstText}</span> <span style={{ color: `${colorDeep}` }}>{mainText}</span>
{/* ////////////////// */}
        </h1>
        <p className="leading-normal text-lg md:text-2xl text-[#454545]">{subText}</p>
        <Button
          type="button"
          text="Get Started"
          className="mt-8 text-xl font-bold py-4 px-9 focus:outline-none md:w-2/5 lg:w-1/2 2xl:w-2/5"
          style={window.innerWidth > 767 ? { backgroundColor: `${colorDeep}`, boxShadow: `${shadow}` } : { backgroundColor: `${colorDeep}`, boxShadow: `${mobileShadow}` }}

        />
      </div>

      {/* <div className="lg:w-3/4 w-full lg:mt-6 relative">
            <img src={img} loading="eager" alt={img} className="w-3/5 mx-auto" width="1000" height="300"/>
      </div> */}
      <div className="lg:w-3/4 w-full lg:mt-6 relative">
            <img
  src={img}
  loading="eager"
  alt="Hero Image"
  className="w-full h-auto max-w-[800px] mx-auto object-cover"  // Updated class names
  width="800"
  height="600"
/>
      </div>
    </main>
  );
};

export default Hero;
