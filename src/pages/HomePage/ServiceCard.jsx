// export default function ServiceCard(props) {

//   const { Icon, title, desc } = props;

//   return (
//     <div
//       className="
//         group bg-white rounded-xl shadow-md p-6  max-w-sm
//         transition-all duration-300 ease-in-out 
//         hover:shadow-lg hover:scale-[1.01] hover:bg-primary/70 sm:h-[350px] h-[300px] 
//       "
//       role="article"
//       aria-label={title}
//     >
//       <div className="flex flex-col items-center justify-center gap-5  ">

//         {/* Icon Circle */}
//         <div
//           className="flex items-center justify-center  rounded-full w-14 h-14 flex-shrink-0 transition-colors duration-300 ease-in-out
//             bg-primary group-hover:bg-white"
//         >
//           <Icon className="text-2xl text-white group-hover:text-primary" />
//         </div>

      
//         <div>
//           <h3 className="sm:text-lg text-md font-semibold text-black group-hover:text-white transition-colors duration-300 text-center">
//             {title}
//           </h3>
//         </div>

//         <div>
//           <p className="mt-2 text-sm text-gray-700 group-hover:text-white transition-colors duration-300 text-center">
//             {desc}
//           </p>
//         </div>
        

//       </div>
//     </div>
//   );
// }
export default function ServiceCard(props) {
  return (
    <div className=" lg:w-[400px] md:w-[320px] sm:w-[280px] w-[320px] md:h-[420px] h-[380px] group cursor-pointer flex flex-col">

      {/* Image */}
      <div className="relative overflow-hidden rounded-t-xl h-[180px]">

        <img
          src={props.image}
          alt={props.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Hover Mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

      </div>

      {/* Accent Line */}
      <div className="h-1 bg-primary w-full"></div>

      {/* Card Content */}
      <div className="relative bg-white shadow-xl rounded-b-xl px-8 pt-14 pb-8 text-center flex flex-col justify-between flex-grow">

        {/* Floating Icon */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
          <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full shadow-lg text-3xl transition duration-300 group-hover:scale-110">
            {props.icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mt-4">
          {props.title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mt-2 px-2">
          {props.description}
        </p>

      </div>

    </div>
  );
}