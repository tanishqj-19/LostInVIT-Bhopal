import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userData } from "../Services/Apis.js";
import {Menu, X,  UserRound} from "lucide-react";
import { useRef } from "react";



const NavLinks = () => {
  return (
      <>
          <Link to='/' className=" hover:text-black font-semibold leading-relaxed text-blue-600 text-xl hover:bg-gray-200 
              py-2 px-4 rounded-xl 
          ">Home</Link>
          <Link to='/lost'
              className="text-xl hover:bg-gray-200 
              py-2 px-4 rounded-xl font-semibold leading-relaxed text-blue-600 hover:text-black"
          > Lost </Link>
          <Link to='/found'
          className="text-xl hover:bg-gray-200 
              py-2 px-4 rounded-xl font-semibold leading-relaxed text-blue-600 hover:text-black"
          > Found</Link>
      </>
  );
}
const NavLinksMobile = () => {
  return (
      <>
          <Link to='/' className=" hover:text-black font-semibold leading-relaxed text-blue-600 text-xl hover:bg-gray-200 
              py-2 px-4 rounded-xl 
          ">Home</Link>
          <Link to='/lost' className=" hover:text-black font-semibold leading-relaxed text-blue-600 text-xl hover:bg-gray-200 
              py-2 px-4 rounded-xl 
          "> Lost </Link>
          <Link to='/found' className=" hover:text-black font-semibold leading-relaxed text-blue-600 text-xl hover:bg-gray-200 
              py-2 px-4 rounded-xl 
          "> Found</Link>
          {/* <Link to = '/profile'> My Profile</Link> */}

      </>
  );
}

const Navbar = () => {
  const Navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  const isLoggedIn = sessionStorage.getItem("loggedIn");
  const userToken = sessionStorage.getItem("userdbtoken");
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const profileRef = useRef(null);
  const [userProfileImgPath, setuserProfileImgPath] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getUserData = await userData({ token: userToken });

        // Set the fetched user data to the component state
        if (getUserData.status === 200) {
          setuserProfileImgPath(getUserData.data.data.profileImgPath);
          if(getUserData.data.data.isAdmin)
          
            setAdmin(getUserData.data.data.isAdmin);
          else
            setAdmin(false);
          console.log("User is admin : ", admin);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Check if the user is logged in before making the API call
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, userToken]);

  const handleLogout = () => {
    sessionStorage.removeItem("userdbtoken");
    sessionStorage.removeItem("loggedIn");
    Navigate("/login");
    window.location.reload();
  };
  const handleOutsideClick = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleButtonClick = (event) => {
    // Prevent the event from propagating to the outside click handler
    event.stopPropagation();
  };

  return (
<header className='mt-2 mb-3 xl:px-10 ticky z-[20] w-full mx-auto flex-wrap font-bold leading-relaxed text-black flex items-center justify-between h-[40px] h-max-[40px]'>
      <div className='flex justify-between pl-4 2xl:pl-10 items-center'>
        <img src="./images/logo.jpg" className="h-[50px]" alt="Logo" />
        <h1 className=' leading-normal hidden md:block font-extrabold font-sans ml-4  text-4xl bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text'>
          LostInVIT
        </h1>
      </div>

      <>
        <nav className='w-1/3 2xl:w-1/4 flex justify-end'>
          <div className='hidden w-full md:flex justify-between items-center'>
            <NavLinks />
            <div className='relative'>
              
              {
                userProfileImgPath === null ? (<div className="p-2 rounded-xl hover:bg-gray-200 ">
              <UserRound onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-blue-600 w-[50px] h-[30px] hover:text-black  " />
              </div>) : (
                <img
                  src={userProfileImgPath}
                  alt="avatar"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  class="relative inline-block h-9 w-9 !rounded-full object-cover object-center"
                />
              )
              }
              
              {isDropdownOpen && (
                <ul ref={profileRef} onMouseDown={handleButtonClick} 
                className='z-50 absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg'>
                  <li>
                    <Link className='block px-4 py-2 text-cyan-500  hover:text-blue-600 hover:bg-gray-200' to="/profile">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      className='block w-full text-left px-4 py-2 text-cyan-500  hover:text-blue-600 hover:bg-gray-200'
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>

          <div className='md:hidden flex items-center space-x-4 mr-2'>
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
            <UserRound onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-blue-600 w-[50px] h-[30px] hover:text-black hover:bg-gray-200  " />
          </div>
        </nav>

        {isOpen && (
          <div className='flex flex-col items-center basis-full '>
            <NavLinksMobile />
          </div>
        )}

        {isDropdownOpen && (
          <div className=' z-50 md:hidden flex flex-col items-center basis-full'>
            <ul 
            onMouseDown={handleButtonClick}
            className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg' ref={profileRef}>
              <li>
                <Link className='block px-4 py-2 text-cyan-500  hover:text-blue-600 hover:bg-gray-200' to="/profile">
                  My Profile
                </Link>
              </li>
              <li>
                <button
                  className='block w-full text-left px-4 py-2 text-cyan-500  hover:text-blue-600 hover:bg-gray-200'
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </>
    </header>
  )};

export default Navbar;