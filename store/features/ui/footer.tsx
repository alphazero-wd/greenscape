import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaPinterest,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const socialLinks = [
  { icon: FaFacebook, href: "https://facebook.com" },
  { icon: FaTwitter, href: "https://twitter.com" },
  { icon: FaPinterest, href: "https://pinterest.com" },
  { icon: FaInstagram, href: "https://instagram.com" },
  { icon: FaYoutube, href: "https://youtube.com" },
];

export const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-32">
      <div className="lg:px-8 md:justify-between md:flex md:items-center py-12 px-6 max-w-7xl container">
        <div className="md:order-2 justify-center flex gap-x-6">
          {socialLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              <link.icon className="text-gray-400 hover:text-blue-500 transition-colors w-5 h-5" />
            </Link>
          ))}
        </div>

        <div className="md:order-1 mt-8 md:mt-0">
          <p className="text-gray-500 leading-5 text-xs text-center">
            &copy; {new Date().getFullYear()} Salesmile, Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
