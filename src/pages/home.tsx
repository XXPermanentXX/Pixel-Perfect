import NavigationBar from "@/ui/NavigationBar";
import { useEffect } from "react";
import { bgBigBlob, bgSmallBlob } from "@/assets";
import RequestButton from "@/ui/RequestButton";
import Carousel from "@/features/carousel/CarouselPresenter";
import {
  carouselImages,
  featureCards,
  teamMembers,
} from "@/models/staticDataModel";
import FeatureCard from "@/ui/FeatureCard";
import FeatureVideoCard from "@/ui/FeatureVideoCard";
import { Card, Image } from "@nextui-org/react";

const HomePage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="overflow-x-hidden">
      <NavigationBar />

      <div className="flex flex-col items-center justify-center text-center">
        {/* hero section with slogans */}
        <section id="hero" className="relative">
          <img
            src={bgBigBlob}
            alt="Decoratvive Background Blob"
            className="bg-image top-0 translate-y-1/2"
          />
          <div className="pb-6">
            <h1 className="pb-2">Instant Marketing Content</h1>
            <h1 className="text-gradient bg-clip-text font-bold text-transparent">
              Professional At Low Cost
            </h1>
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
          <Carousel
            carouselImages={carouselImages}
            animationDuration={1500}
            delay={3500}
          />
        </div>

        {/* Features Section  */}
        <section className="flex flex-col gap-y-16">
          <h2 className="flex flex-col gap-y-16">90% Time & Cost Saved</h2>
        </section>

        {/* Feature cards */}
        {featureCards.map((item, index) => {
          if (item.type === "card") {
            return (
              <FeatureCard
                key={index}
                imageUrl={item.imageUrl}
                title={item.title}
                description={item.description}
                imageOnLeft={item.imageOnLeft}
              />
            );
          } else {
            return (
              <FeatureVideoCard
                key={index}
                videoUrl={item.videoUrl}
                title={item.title}
                description={item.description}
                videoOnLeft={item.videoOnLeft}
              />
            );
          }
        })}

        {/* About Us Section */}
        <section id="about-us" className="relative">
          <img
            src={bgBigBlob}
            alt="Decoratibe background blob"
            className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-y-1/2 translate-x-full overflow-visible object-none"
          />
          <div className="flex flex-col items-center pb-16">
            <h2 className="pb-14">About Us</h2>
            <h5 className="max-w-xl">
              We started PixelPerfect AI as two master’s students at want to
              make content creation accessible to everyone.
            </h5>
          </div>

          {/* Co-founders Cards */}
          <div className="flex justify-center gap-x-24">
            {teamMembers.map((member) => (
              <Card key={member.name} className="bg-transparent shadow-none">
                <Image
                  src={member.image}
                  alt={member.alt}
                  className="h-[360px] w-[270px] rounded-[30px] object-cover object-center"
                />
                <div className="pt-4 text-start">
                  <h5 className="py-2 font-semibold">{member.name}</h5>
                  <p>{member.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="relative">
          <img
            src={bgSmallBlob}
            alt="Decorative background blob"
            className="bg-image -bottom-0 left-1/2 -translate-x-1/2"
          />
          <h2>Contact Us</h2>
          <h5 className="py-14">
            We're eager to explore how this AI technology could elevate your
            business <br />
            and cut down costs. If this sparks your interest, we’d love to
            schedule a <br />
            meeting to discuss this further.
          </h5>
          <RequestButton />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
