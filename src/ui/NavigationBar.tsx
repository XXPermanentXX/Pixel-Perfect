import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import React from "react";
import {  useLocation } from "react-router-dom";
import RequestButton from "./RequestButton";
import { PixelPerfectLogo } from "./PixelPerfectLogo";




const NavigationBar: React.FC = () => {
    const location = useLocation();

    return (
        <Navbar
            id="navbar"
            position="static"
            isBlurred={false}
            classNames={{
                base: ["bg-transparent py-2"],
                wrapper: ["max-w-7xl"]
            }}
        >
            <NavbarBrand as={Link} href="/">
                <PixelPerfectLogo />
                <h4 className="ml-4">PixelPerfect AI</h4>
            </NavbarBrand>
            <NavbarContent justify="end">
                    <NavbarItem className="space-x-8">
                        {location.pathname === "/" && (
                            <Link href="/login" size="lg" color="foreground">
                                Log in
                            </Link>
                        )}
                        {location.pathname !== "/request-demo" && <RequestButton />}
                    </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}

export default NavigationBar