'use client'; // Mark this as a client component

import React, { useRef } from "react";
import Link from "next/link";
import { Download, Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuViewport,
} from "./ui/navigation-menu";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ThemeChanger } from "./theme-changer";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "#about-me", label: "About Me" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact-me", label: "Contact Me" },
];

const Navbar: React.FC<{resumeLink : string}> = ({resumeLink}) => {
  const highlightRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
    const item = e.currentTarget;
    const highlight = highlightRef.current;
    if (item && highlight) {
      const left = item.offsetLeft;
      const width = item.offsetWidth;
      highlight.style.left = `${left}px`;
      highlight.style.width = `${width}px`;
      highlight.style.opacity = "1";
    }
  };

  const handleMouseLeave = () => {
    const highlight = highlightRef.current;
    if (highlight) {
      highlight.style.opacity = "0";
    }
  };

  return (
    <NavigationMenu className="bg-background/60 backdrop-blur-xs fixed z-50">
      <NavigationMenuList className="w-dvw h-[4rem] px-4 max-md:px-2 items-center">
        {/* Logo */}
        <NavigationMenuItem className="mr-auto">
          <Link className="text-xl font-montserrat py-3 font-bold" href="/">
            Cygnuxxs
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <ThemeChanger />
        </NavigationMenuItem>

        {/* Mobile Drawer */}
        <NavigationMenuItem className="sm:hidden">
          <Drawer>
            <DrawerTrigger asChild aria-label="Open Navigation Drawer">
              <Button size="icon" variant="ghost">
                <Menu />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerTitle hidden>Open Navigation Drawer</DrawerTitle>
              <DrawerDescription hidden>
                Navigation for Mobile Devices
              </DrawerDescription>
              <NavigationMenuList className="flex flex-col space-y-1 py-5">
                {navLinks.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <Link
                      href={item.href}
                      className="font-normal p-3 hover:bg-accent hover:text-accent-foreground w-full block"
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuItem>
                ))}
                <NavigationMenuItem>
                  <Button variant={'outline'} asChild className="text-xs">
                    <Link target="_blank" href={resumeLink}>
                      <Download />
                      Get my Resume
                    </Link>
                  </Button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </DrawerContent>
          </Drawer>
        </NavigationMenuItem>

        {/* Desktop Nav */}
        <NavigationMenuItem className="max-sm:hidden">
          <NavigationMenuList
            className="relative flex gap-4 items-center"
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300"
              ref={highlightRef}
              style={{ left: 0, width: 0, opacity: 0 }}
            />
            {navLinks.map((item) => (
              <NavigationMenuItem
                key={item.href}
                onMouseEnter={handleMouseEnter}
              >
                <Link
                  href={item.href}
                  className="font-normal p-3 transition-colors text-muted-foreground hover:text-primary"
                >
                  {item.label}
                </Link>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <Button asChild variant={'outline'} className="text-xs hover:text-primary">
                <Link target="_blank" href={resumeLink}>
                  <Download />
                  Resume
                </Link>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuViewport />
    </NavigationMenu>
  );
};

export default Navbar;