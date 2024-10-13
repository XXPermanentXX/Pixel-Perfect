import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import React from "react";
import {  useLocation } from "react-router-dom";




const NavigationBar: React.FC = () => {
    const location = useLocation();

    return (
        <Navbar
            id="navbar"
            position="static"
            isBlurred={false}
// todo
        >
            <NavbarBrand as={Link} href="/">
            <h4 className="ml-4">PixelPerfect AI</h4>
            </NavbarBrand>
            <NavbarContent justify="end">
                <NavbarItem >
                    <NavbarItem>
                        {location.pathname === "/" && (
                            <Link href="/login" size="lg" color="foreground">
                                login
                            </Link>
                        )}
                    </NavbarItem>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}

export default NavigationBar