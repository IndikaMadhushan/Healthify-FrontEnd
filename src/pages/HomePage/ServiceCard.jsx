export default function ServiceCard(props) {

  const { Icon, title, desc } = props;

  return (
    <div
      className="
        group bg-white rounded-xl shadow-md p-6  max-w-sm
        transition-all duration-300 ease-in-out 
        hover:shadow-lg hover:scale-[1.01] hover:bg-primary/70 sm:h-[350px] h-[300px] 
      "
      role="article"
      aria-label={title}
    >
      <div className="flex flex-col items-center justify-center gap-5  ">

        {/* Icon Circle */}
        <div
          className="flex items-center justify-center  rounded-full w-14 h-14 flex-shrink-0 transition-colors duration-300 ease-in-out
            bg-primary group-hover:bg-white"
        >
          <Icon className="text-2xl text-white group-hover:text-primary" />
        </div>

      
        <div>
          <h3 className="sm:text-lg text-md font-semibold text-black group-hover:text-white transition-colors duration-300 text-center">
            {title}
          </h3>
        </div>

        <div>
          <p className="mt-2 text-sm text-gray-700 group-hover:text-white transition-colors duration-300 text-center">
            {desc}
          </p>
        </div>
        

      </div>
    </div>
  );
}

