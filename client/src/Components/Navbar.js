import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userData } from "../Services/Apis.js";
import {Menu, X} from "lucide-react";
import { useRef } from "react";


const NavLinks = () => {
  return (
      <>
          <Link to='/' className="text-xl hover:bg-neutral-200 
              py-2 px-4 rounded-xl
          ">Home</Link>
          <Link to='/lost'
              className="text-xl hover:bg-neutral-200 
              py-2 px-4 rounded-xl"
          > Lost </Link>
          <Link to='/found'
          className="text-xl hover:bg-neutral-200 
              py-2 px-4 rounded-xl"
          > Found</Link>
      </>
  );
}
const NavLinksMobile = () => {
  return (
      <>
          <Link to='/'>Home</Link>
          <Link to='/lost'> Lost </Link>
          <Link to='/found'> Found</Link>
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getUserData = await userData({ token: userToken });

        // Set the fetched user data to the component state
        if (getUserData.status === 200) {
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
<header className='mt-2  xl:px-10 ticky z-[20] w-full mx-auto flex-wrap font-bold leading-relaxed text-black flex items-center justify-between h-max-[40px]'>
      <div className='flex justify-between pl-4 2xl:pl-10 items-center'>
        <img src="./images/logo.jpg" className="h-[50px]" alt="Logo" />
        <h1 className='hidden md:block font-extrabold font-sans ml-4 leading-normal text-4xl bg-gradient-to-r from-blue-800 to-purple-500 text-transparent bg-clip-text'>
          LostInVIT
        </h1>
      </div>

      <>
        <nav className='w-1/3 2xl:w-1/4 flex justify-end'>
          <div className='hidden w-full md:flex justify-between items-center'>
            <NavLinks />
            <div className='relative'>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className='focus:outline-none'>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="30"
                  fill="blue"
                  stroke="white"
                  strokeWidth="0.25px"
                  className="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <ul ref={profileRef} onMouseDown={handleButtonClick} 
                className='z-50 absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg'>
                  <li>
                    <Link className='block px-4 py-2 text-gray-800 hover:bg-gray-100' to="/profile">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      className='block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100'
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
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className='focus:outline-none'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="30"
                fill="blue"
                stroke="white"
                strokeWidth="0.25px"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            </button>
          </div>
        </nav>

        {isOpen && (
          <div className='flex flex-col items-center basis-full'>
            <NavLinksMobile />
          </div>
        )}

        {isDropdownOpen && (
          <div className=' z-50 md:hidden flex flex-col items-center basis-full'>
            <ul 
            onMouseDown={handleButtonClick}
            className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg' ref={profileRef}>
              <li>
                <Link className='block px-4 py-2 text-gray-800 hover:bg-gray-100' to="/profile">
                  My Profile
                </Link>
              </li>
              <li>
                <button
                  className='block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100'
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