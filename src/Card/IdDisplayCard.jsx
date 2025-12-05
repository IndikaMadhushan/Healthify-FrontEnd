import { GoPasskeyFill } from "react-icons/go";
export default function IdDisplayCard() {
    return(
        <>
            <div className="w-[300px] sm:w-[500px] md:w-[600px] h-[180px] flex flex-row  gap-1 sm:gap-4 p-4 justify-center items-center rounded-xl shadow-lg border-3 border-secondary  px-2">
                <div className="flex justify-center items-center ">
                    <GoPasskeyFill className="w-[60px] h-[60px] sm:w-[120px] sm:h-[120px] text-secondary" />
                </div>
                <div className="flex flex-col justify-center items-center gap-2 "> 
                    <div className="flex flex-col justify-center items-center ">
                        <h1 className="text-secondary text-md sm:text-lg  md:text-xl font-bold">Your Helthify ID</h1>
                        <p className="md:text-[16px] sm:text-[14px] text-[8px] sm:font-medium text-center">Don’t Share this with others &  Keep rememder this</p>
                    </div>
                    
                    <div>
                        <input type="text" className=" w-[200px] sm:w-[300px] md:w-[400px] h-[45px]   bg-secondary/5  rounded-xl  "></input>
                    </div>
                </div>
            </div>
        </>
    )
}