import { Helmet } from "react-helmet";
import Footer from "../../components/footer";
import Empower from "./Empower";
import Header from "./Header";
import Home from "./HeroSection";
import JoinHealthy from "./joinHealthy";
import Services3DCarousel from "./Review";

import ServicesExample from "./Services";
import TagBar from "./tabBar";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Healthify | Personal Health Monitoring System</title>
        <meta
          name="description"
          content="Healthify helps patients and doctors manage health data, monitor wellness, and improve healthcare decisions through a secure digital platform."
        />
      </Helmet>
      {/* <div className="sticky top-0 z-50 bg-white shadow-sm ">
                        <Header   />
            </div> */}
      <Header></Header>
      <Home />
      <Empower />
      <TagBar />
      <ServicesExample />
      <Services3DCarousel />
      <JoinHealthy />
      <Footer />
    </>
  );
}
