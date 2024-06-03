import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

import imgUrl from '../assets/lost-and-found.png';
import lostUrl from '../assets/lost-image.png';

import foundUrl from '../assets/found-image.png';

function Hero() {
  
  return (
    
      <div >
       
        <div className='flex flex-col  md:flex-row md:justify-center items-center '>
        <div className='flex flex-col md:w-2/5 justify-between pl-6 mt-0'>
            <p className=' text-xl md:text-5xl 2xl:text-6xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-light-blue-500 to-light-blue-700  '>
             Where Lost Meets Found: <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-500 ">VIT Bhopal </span> Edition
            </p>
            <p className='text-md md:text-xl 2xl:text-2xl font-sans mt-4'>Welcome to LostInVIT, where the lost become found with 
            simplicity and speed. Rediscover the ease of reclaiming what's yours in just a few clicks!</p>
        </div>

        
        <div >
          <img alt="Hero" src={imgUrl} className=' min-w-[450px] min-h-[450px] 2xl:w-[1000px] 2xl:h-[1000px] max-w-[650px] max-h-[650px]'  ></img>
        </div>
        
      </div>
        

        
        <div className="flex  justify-between flex-col items-center pt-5 ">

          <div className="text-center text-black mb-5 pt-3">
            <h2 className="text-light-blue-500 font-bold text-3xl leading-relaxed ">
              OUR SERVICES
              <div className="text-black text-xl ">
                <hr />
              </div>
            </h2>
          </div>

         
        
        <Card className="w-full max-w-[80%] flex-row">
          <CardHeader
            shadow={false}
            floated={false}
            className="m-0 w-[50%] shrink-0  rounded-r-none"
          >
            <img
            
              src={lostUrl}
              alt="lost"
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody className="bg-light-blue-100  rounded-md rounded-l-none">
            <Typography variant="h4" color="black" className="mb-4 uppercase"> 
              Lost an Item?
            </Typography>
            
            <Typography color="blue-gray-500" className="mb-8 font-normal">
            <p >
                <ol className="list-decimal pl-6 space-y-4">
                <li className="flex items-start  text-blue-gray-500 text-xl   font-semibold">
                  <span className="text-black mr-2 ">&#8226;</span>
                  <p>Check the "Found" section first.</p>
                </li>
                <li className="flex items-start text-blue-gray-500 text-xl  font-semibold">
                  <span className="text-black mr-2">&#8226;</span>
                  <p>Create a post in the "Lost Item" tab if your item isn't there.</p>
                </li>
                <li className="flex items-start text-blue-gray-500 text-xl font-semibold">
                  <span className="text-black mr-2">&#8226;</span>
                  <p>Be patient, someone may find your item and contact you.</p>
                </li>
                <li className="flex items-start text-xl text-blue-gray-500 font-semibold">
                  <span className="text-black mr-2">&#8226;</span>
                  <p>Once you retrieve your item, delete the post to avoid confusion.</p>
                </li>
              </ol>
            </p>
            </Typography>
            <a href="/lost" className="inline-block">
              <Button variant="text" className="flex items-center gap-2">
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            </a>
          </CardBody>
        </Card>


        <Card className="w-full max-w-[80%] flex-row mt-16">
          
          <CardBody className="bg-light-blue-100  rounded-md rounded-r-none">
            <Typography variant="h4" color="black" className="mb-4 uppercase"> 
              Found an Item?
            </Typography>
            
            <Typography color="blue-gray-500" className="mb-8 font-normal">
            <p >
                <ol className="list-decimal pl-6 space-y-4">
                <li className="flex items-start  text-blue-gray-500 text-xl   font-semibold">
                  <span className="text-black mr-2 ">&#8226;</span>
                  <p>Check the "Lost" section first.</p>
                </li>
                <li className="flex items-start text-blue-gray-500 text-xl  font-semibold">
                  <span className="text-black mr-2">&#8226;</span>
                  <p>If the item isn't listed, go to your profile and create a post under the 'Found Item' tab.</p>
                </li>
                <li className="flex items-start text-blue-gray-500 text-xl font-semibold">
                  <span className="text-black mr-2">&#8226;</span>
                  <p>Wait for the item's owner to contact you.</p>
                </li>
                <li className="flex items-start text-xl text-blue-gray-500 font-semibold">
                  <span className="text-black mr-2">&#8226;</span>
                  <p>Once the item is returned, delete your 'Found Item' post to keep the information current.</p>
                </li>
              </ol>
            </p>
            </Typography>
            <a href="/found" className="inline-block">
              <Button variant="text" className="flex items-center gap-2">
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            </a>
          </CardBody>

          <CardHeader
            shadow={false}
            floated={false}
            className="m-0 w-[50%] shrink-0  rounded-md rounded-l-none "
          >
            <img
              src={foundUrl}
              alt="Found"
              className="h-full w-full object-cover"
            />
          </CardHeader>
        </Card>

        {/* <div className="card lg:card-side bg-neurtal shadow-xl max-w-[80%] mt-16 mb-8">
          <figure className="w-[50%]"><img src={foundUrl}  alt="Album"/></figure>
          <div className="card-body">
            <h2 className="card-title font-bold text-2xl">Found an Item ?</h2>
            <p>
                <ol className="list-decimal pl-6 space-y-4">
                <li className="flex items-start text-xl  text-gray-600 font-[500]">
                  <span className="text-black mr-2 ">&#8226;</span>
                  <p>Look in the 'Lost' section to see if someone has already reported the item you found.</p>
                </li>
                <li className="flex items-start text-xl text-gray-600 font-[500]">
                  <span className="text-black mr-2">&#8226;</span>
                  <p>If the item isn't listed, go to your profile and create a post under the 'Found Item' tab.</p>
                </li>
                <li className="flex items-start text-xl text-gray-600 font-[500]">
                  <span className="text-black mr-2">&#8226;</span>
                  <p>Wait for the item's owner to contact you via email after they see your post in the 'Found' section.</p>
                </li>
                <li className="flex items-start text-xl text-gray-600 font-[500]">
                  <span className="text-black mr-2">&#8226;</span>
                  <p>Once the item is returned, delete your 'Found Item' post to keep the information current.</p>
                </li>
              </ol>
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary bg-blue-500 border-blue-500 text-white" onClick={()=>{Nagivate('/found')}}>Found Something?</button>
            </div>
          </div>
        </div> */}



          {/* New Page enddddd */}
        </div>
      </div>
   
  );
}



export default Hero;
