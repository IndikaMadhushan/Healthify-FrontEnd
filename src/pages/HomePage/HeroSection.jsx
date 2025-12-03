import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import {data} from "../../data/data";
import Hero from './Hero';

import Header from './Header';
import Footer from '../../components/footer';


export default function Home(){
    return(
    <>
        <Swiper
        spaceBetween={30}
        speed={3000}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        effect={"fade"}
        fadeEffect={{ crossFade: true }}
        modules={[Autoplay, EffectFade]}
        className="mySwiper"
        >
            {data.map(({ id, colorDeep, colorLite,FirstText, mainText, subText, shadow, mobileShadow, img }) => (
                <SwiperSlide key={id} style={{ backgroundColor: `${colorLite}` }} className="w-full h-screen flex flex-col md:gap-10 ">
                    <Header />
                    <Hero 
                        colorDeep = {colorDeep}
                        mainText={mainText}
                        FirstText={FirstText}
                        subText={subText}
                        shadow={shadow}
                        mobileShadow ={mobileShadow}
                        img={img}
                    />
                    
                </SwiperSlide>
                
            ))}
        
        </Swiper>
       
    </>
    )
}