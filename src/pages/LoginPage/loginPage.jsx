import Button from "../HomePage/HomeButton";
import { Link, useNavigate } from "react-router-dom";
import Login from "../../assets/loginIcon.png"
import Footer from "../../components/footer";
import Header from "../HomePage/Header";
import { useState } from "react";


export default function LoginPage(){
     const navigate = useNavigate(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(email);
    return(
    <div>
        <Header/>
        <div className="flex lg:flex-row flex-col lg:justify-center  items-center lg:items-start w-full lg:h-[700px] p-6 sm:pt-20">
            <div>
                <img className="p-5" src={Login} alt="login image"/>
            </div>
            <div className="lg:w-1/2  flex justify-center items-center">
                <div className="flex flex-col gap-3 sm:w-[500px] p-2">
                    <h1 className="text-3xl font-bold text-mainblack text-center mb-5" >Login</h1>
                    <div className="flex flex-col items-center gap-2">
                        <input type="text" className=" sm:w-[480px] w-[300px] sm:h-[45px] border-2 px-2 border-secondary/30 bg-secondary/5 hover:border-secondary rounded-xl "
                        onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        <input type="text" className=" sm:w-[480px] w-[300px] sm:h-[45px] border-2 px-2 border-secondary/30 bg-secondary/5 hover:border-secondary  rounded-xl  "
                        onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    
                  
                    <p className="text-secondary hover:underline text-[10px] text-end">
                            <Link to="/forget" className="">
                            Forgot password?
                            </Link>
                    </p> 
                    <div className="flex justify-center">
                        <Button onClick={() => navigate("/option")}
                        className=" sm:w-[480px] w-[300px] px-10 mt-5 py-2 md:text-[20px]  text-sm "
                        type="button"
                        text="Login"
                        style={{ backgroundColor: `#18AAB0` }}
                    />
                    </div>
                     <div className="text-center sm:text-[20px] text-[16px]">
                        Don’t have an account?
                        <span className="text-secondary hover:underline">
                            <Link to="/option" className="">
                            Signup here
                            </Link>
                        </span> 
                    </div>

                    
                </div>
                    
            </div>
        </div>
        <Footer/>
    </div>
    )
}