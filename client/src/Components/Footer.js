import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { Typography } from "@material-tailwind/react";

 
 const Footer = ()  => {
  return (
    <footer className="w-full bg-white  p-8 mt-8 top-[90vh] bottom-0 ">
    <hr className="my-8 border-black" />
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12  text-center md:justify-between">
        <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="logo-ct" className="w-10" />
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Typography
              as="a"
              href="/privacypolicy"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Privacy
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="terms&condition"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Terms & Condition
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href=""
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Linkedin
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="lostinvit@gmail.com"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contact Us
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="https://tanishqjain.tech/"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              My Portfolio
            </Typography>
          </li>
        </ul>
      </div>
      
      
    </footer>
  );
}



export default Footer;
