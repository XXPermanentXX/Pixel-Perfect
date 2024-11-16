import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link } from "@nextui-org/react";
import { Link as ScrollLink } from "react-scroll";
import { PixelPerfectLogo } from "./PixelPerfectLogo";

const Footer = () => {
  return (
    <div className="mx-auto flex max-w-7xl justify-between px-40 pb-16 pt-24">
      <div className="flex flex-col items-start">
        <a href="/" className="block">
          <div className="flex items-center">
            <PixelPerfectLogo />
            <h4 className="ml-6">PixelPerfect AI</h4>
          </div>
        </a>
        <div className="flex space-x-4 px-2 pb-16 pt-10">
          <Link isExternal showAnchorIcon size="lg" color="foreground" href="https://www.linkedin.com/company/pixelperfect-ai" anchorIcon={<FaLinkedin />}></Link>
          <Link isExternal showAnchorIcon size="lg" color="foreground" href="https://www.instagram.com" anchorIcon={<FaInstagram />}></Link>
          <Link isExternal showAnchorIcon size="lg" color="foreground" href="https://www.youtube.com" anchorIcon={<FaYoutube />}></Link>
        </div>
        <span className="text-sm text-gray-500">©2024 PixelPerfect AI. All Rights Reserved</span>
      </div>
      <nav className="flex flex-col space-y-2 pt-4">
        <ScrollLink to="hero" smooth={true} duration={1000} className="mb-2 cursor-pointer text-lg text-white hover:text-opacity-75">
          PixelPerfect AI
        </ScrollLink>
        <ScrollLink to="features" smooth={true} duration={1000} className="cursor-pointer text-lg  text-zinc-400 hover:text-opacity-75">
          Features
        </ScrollLink>
        <ScrollLink to="about-us" smooth={true} duration={1000} className="cursor-pointer text-lg  text-zinc-400 hover:text-opacity-75">
          About Us
        </ScrollLink>
      </nav>
    </div>
  );
};

export default Footer;