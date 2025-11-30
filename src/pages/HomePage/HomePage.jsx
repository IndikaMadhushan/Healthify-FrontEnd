import Footer from "../../components/footer";
import Empower from "./Empower";
import Home from "./HeroSection";
import JoinHealthy from "./joinHealthy";
import Services3DCarousel from "./Review";

import ServicesExample from "./Services";
import TagBar from "./tabBar";

export default function HomePage(){
    return(
        <>
            <Home/>
            <Empower/>
            <TagBar/>
            <ServicesExample/>
            <Services3DCarousel/>
            <JoinHealthy/>
            <Footer/>
        </>
    )
}