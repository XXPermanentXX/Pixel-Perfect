import NavigationBar from "@/ui/NavigationBar";
import { useEffect } from "react";
import { bgBigBlob } from "@/assets";
import RequestButton from "@/ui/RequestButton";
import Carousel from "@/features/carousel/CarouselPresenter";
import { carouselImages } from "@/models/staticDataModel";

const HomePage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0,0);
  },[])
    return (
      <div className="overflow-x-hidden">
        <NavigationBar />

        <div className="flex flex-col items-center justify-center text-center">
          {/* hero section with slogans */}
          <section id="hero" className="relative">
            <img src={bgBigBlob} alt="Decoratvive Background Blob" className="bg-image top-0 translate-y-1/2" />
            <div className="pb-6">
              <h1 className="pb-2">Instant Markeing Content</h1>
              <h1 className="text-gradient bg-clip-text font-bold text-transparent">Professional At Low Cost</h1>
            </div>
            <h5 className="pb-16">
              AI-based platform that streamlines content creation and
              <br />
              distribution for e-commerce owners and retailers.
            </h5>
            <RequestButton />
          </section>
          
          {/* Carousel component */}
          <div className=" h-[377px] w-full">
            <Carousel carouselImages={carouselImages} animationDuration={1500} delay={3500}/>
          </div>

          
        </div>
      </div>
    );
  };
  
  export default HomePage;