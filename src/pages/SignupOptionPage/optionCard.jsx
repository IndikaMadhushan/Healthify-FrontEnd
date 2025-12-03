
import { IoIosArrowRoundForward } from "react-icons/io";

 export default function OptionCard({icon,title,subtitle,link}){ 
    return( 
    <div className="group flex flex-col lg:w-[450px] md:w-[350px] xs:w-[380px] rounded-2xl p-4 justify-center items-center gap-5 border-primary hover:bg-primary/30 border-2 active:bg-primary/60"> 
                <div className="lg:text-6xl text-4xl text-white bg-primary lg:p-5 p-3 rounded-full group-hover:bg-white group-hover:text-primary ">
                    {icon}
                </div>

                 <div className="text-center"> 
                    <div className="lg:text-2xl text-xl font-bold text-mainblack">
                        {title}
                    </div> 

                     <div className="text-sm">
                        {subtitle}
                    </div> 
                </div> 

                <div className="text-center text-primary flex items-center group-hover:underline text-sm"> 
                    {link} <IoIosArrowRoundForward className="text-2xl" /> 
                </div> 
    </div> 
) }