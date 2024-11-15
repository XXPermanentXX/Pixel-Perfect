import NavigationBar from "@/ui/NavigationBar";
import { useEffect } from "react";
import { bgBigBlob } from "@/assets";
import RequestButton from "@/ui/RequestButton";
import Carousel from "@/features/carousel/CarouselPresenter";
import { carouselImages, featureCards } from "@/models/staticDataModel";
import FeatureCard from "@/ui/FeatureCard";
import FeatureVideoCard from "@/ui/FeatureVideoCard";

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
              <h1 className="pb-2">Instant Marketing Content</h1>
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
          
          {/* Features Section  */}
          <section className="flex flex-col gap-y-16">
            <h2 className="flex flex-col gap-y-16">
              90% Time & Cost Saved
            </h2>
          </section>

          {/* Feature cards */}
          {featureCards.map((item, index) => {
            if (item.type === "card") {
              return <FeatureCard key={index} imageUrl={item.imageUrl}  title={item.title} description={item.description} imageOnLeft={item.imageOnLeft}/>         
            } else {
              return <FeatureVideoCard key={index} videoUrl={item.videoUrl} title={item.title} description={item.description} videoOnLeft={item.videoOnLeft}/>
            }
          })}
          
          

          
        </div>
      </div>
    );
  };
  
  export default HomePage;