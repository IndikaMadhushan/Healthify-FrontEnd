import Footer from "../../components/footer";
import Empower from "./Empower";
import Header from "./Header";
import Home from "./HeroSection";
import JoinHealthy from "./joinHealthy";
import Services3DCarousel from "./Review";

import ServicesExample from "./Services";
import TagBar from "./tabBar";

export default function HomePage(){
    return(
        <>
            {/* <div className="sticky top-0 z-50 bg-white shadow-sm ">
                        <Header   />
            </div> */}
            <Header></Header>
            <Home/>
            <Empower/>
            <TagBar/>
            <ServicesExample/>
            <Services3DCarousel/>
            <JoinHealthy/>
            <Footer />
            
        </>
    )
}