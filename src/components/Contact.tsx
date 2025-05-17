import React from "react";
import DotsBackground from "./DotsBackground";
import InstagramIcon from "@/components/icons/instagram.svg";
import GithubIcon from "@/components/icons/github.svg";
import EmailIcon from "@/components/icons/email.svg";
import XIcon from "@/components/icons/x.svg";
import LinkedIcon from "@/components/icons/linkedin.svg";
import Link from "next/link";

type ContactInfo = {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  href: string;
};

const contactInfo: ContactInfo[] = [
  {
    name: "Instagram",
    icon: InstagramIcon,
    href: "https://www.instagram.com/cygnuxxs/",
  },
  {
    name: "Email",
    icon: EmailIcon,
    href: "mailto:ashokatragadda26@gmail.com",
  },
  {
    name: "X - Twitter",
    icon: XIcon,
    href: "https://x.com/AshyGany",
  },
  { name: "Github", icon: GithubIcon, href: "https://github.com/cygnuxxs" },
  {
    name: "LinkedIn",
    icon: LinkedIcon,
    href: "https://www.linkedin.com/in/ashok-atragadda/",
  },
];

const Contact = () => {
  return (
    <DotsBackground className="w-full overflow-hidden flex items-center justify-center">
      <section
        id="contact-me"
        className="max-w-4xl h-screen relative pt-[5.5rem] grid place-content-center space-y-4 text-center"
      >
        <div className="p-1 space-y-4 rounded-md">
          <h1 className="text-4xl max-sm:text-2xl font-black">Contact Me</h1>
          <p className="text-lg max-sm:text-sm backdrop-blur-[1px]">
            Let&apos;s connect and bring your ideas to life!
          </p>
        </div>
        <ul className="flex w-full gap-4 py-12 flex-wrap justify-center">
          {contactInfo.map((contact, idx) => (
            <li
              key={idx}
              className="relative hover:bg-primary/20 transition-all duration-300 hover:drop-shadow-primary/40 hover:drop-shadow-2xl min-w-[8rem] backdrop-blur-[1px] bg-foreground/5 rounded-md group flex-1"
            >
              <Link
                target="_blank"
                href={contact.href}
                rel="noopener noreferrer"
                className="relative z-10 flex gap-4 p-4 items-center justify-center rounded-xl"
                aria-label={`Contact via ${contact.name}`}
              >
                <contact.icon
                  className="w-5 h-5 group-hover:scale-120 transition-all duration-300"
                  aria-hidden="true"
                />
                <span className="text-sm group-hover:scale-105 transition-all duration-300 text-nowrap">
                  {contact.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </DotsBackground>
  );
};

export default Contact;
