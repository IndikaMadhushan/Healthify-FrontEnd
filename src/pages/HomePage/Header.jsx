import { useNavigate} from "react-router-dom";
import Button from "./HomeButton";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";

const goToFooter = () => {
  const element = document.getElementById("footer");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const goToService = () => {
  const element = document.getElementById("services");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  
};

const goToAbout = () => {
  const element = document.getElementById("about");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  
};

const goToHome = () => {
  const element = document.getElementById("home");
  if(element) {
    element.scrollIntoView({behavior : "smooth"})
  }
}

export default function Header(){


  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);


  return(
    
    
    <div className="flex flex-row justify-between lg:px-14 px-4  md:px-6 ">
        <div>
            <img src="logo.png" alt="logo" className="h-[80px] h-[60px] object-contain cursor-pointer " onClick={() => navigate("/")}/>
        </div>
        <div className="pt-5">
        <div className="flex flex-row  text-sm text-mainblack font-semibold items-center lg:gap-10 md:gap-5 ">
            <div>
                  <p className="hidden md:block cursor-pointer" onClick={goToHome}>Home</p>
            </div>
            
            <div>
                  <p className="hidden md:block cursor-pointer" onClick={goToAbout}>About Us</p> 
            </div>
            <div>
                  <p className="hidden md:block cursor-pointer" onClick={goToService}>Services</p> 
            </div>
            <div>
                  <p className="hidden md:block cursor-pointer" onClick={goToFooter}>Contact</p> 
            </div>
            <div>
                <Button onClick={() => navigate("/login")}
                type="button"
                text="Login"
                 className="py-1 px-6  font-bold  focus:outline-none hidden md:block"
                style={{ backgroundColor: '#18AAB0'}}
                />
                
            </div>
            
        </div>
          <div className="md:hidden block text-xl text-secondary "onClick={() => setOpenMenu(true)}><RxHamburgerMenu /></div>
        </div>

        {/*mobile drop down*/}
        {openMenu && (
        <div className="fixed inset-0 bg-black/60 z-60 md:hidden block ">
          <div className="bg-black  w-1/2 h-full p-6">
            
            <button
              className="text-2xl mb-4 text-white"
              onClick={() => setOpenMenu(false)}
              
            >
              <RxCross1 />
            </button>

            <div className="flex flex-col gap-4 font-semibold text-secondary  text-center">
              
              <img src="logo.png" alt="logo" className="h-[80px] h-[60px] object-contain hover:cursor-pointer"/>

              <p className="hover:text-white cursor-pointer"  onClick={() => { navigate("/"); setOpenMenu(false); }}>Home</p>
              <p className="hover:text-white cursor-pointer" onClick={goToService}>Services</p>
              <p className="hover:text-white cursor-pointer" onClick={goToAbout}>About Us</p>
              <p className="hover:text-white cursor-pointer" onClick={goToFooter}>Contact</p>
              
              <Button onClick={() => {navigate("/login"); setOpenMenu(false);}}
                type="button"
                text="Login"
                 className="py-1 px-6  font-bold  focus:outline-none "
                style={{ backgroundColor: '#18AAB0'}}
                />
            </div>

          </div>
        </div>
      )}
      </div>
    
  )
}