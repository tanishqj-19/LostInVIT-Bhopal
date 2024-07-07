import React, { useState } from "react";

import { registerfunction } from "../Services/Apis";

import imgUrl from '../assets/front_photo.jpg';

import { Link, useNavigate} from 'react-router-dom'

const Register = () => {
  const Navigate = useNavigate();
  const [inputData, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    regNo: "",
    hostelOrDayScholar: "None",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const regNoPattern = /^[0-9]{2}[A-Z]{3}[0-9]{5}$/;

    const {
      fname,
      lname,
      email,
      regNo,
      hostelOrDayScholar,
      password,
      reEnterPassword,
    } = inputData;

    // console.log(fname);
    // console.log(email);
    // console.log(regNo);
    // console.log(hostelOrDayScholar);
    // console.log(password);
    // console.log(reEnterPassword);

    if (
      !fname || !lname ||
      !email ||
      !regNo ||
      !hostelOrDayScholar ||
      !password ||
      !reEnterPassword
    ) {
      alert("Enter all input fields");
    } else if (!email.includes("@vitbhopal.ac.in") || !email.includes("20")) {
      alert("Please use VIT Bhopal Gmail ID");
    } else if (!regNoPattern.test(regNo)) {
      alert("Enter a valid registration number");
    } else if (password.length < 6) {
      alert("Password should be minimun of 6 characters");
    } else if (password !== reEnterPassword) {
      alert("Password and Re-Entered Password should be same");
    } else {
      const response = await registerfunction(inputData);

      if (response.status === 200) {
        alert("Registered Successfully");
        setInputData({
          ...inputData,
          fname: "",
          lname: "",
          email: "",
          password: "",
          hostelOrDayScholar: "None",
          reEnterPassword: "",
          regNo: "",
        });
        Navigate("/login");
      } else {
        alert("User already exits");
        
      }
    }
  };

//   return (
//     <RegisterStyle>
//       <div className="App">
//         <div className="register">
//           <h1>Register</h1>
//           <input
//             type="text"
//             name="fname"
//             value={inputData.fname}
//             onChange={handleChange}
//             placeholder="Your Name"
//           />
//           <input
//             type="text"
//             name="regNo"
//             value={inputData.regNo}
//             onChange={handleChange}
//             placeholder="Your Registration Number (Capital)"
//           />
//           <input
//             type="email"
//             name="email"
//             value={inputData.email}
//             onChange={handleChange}
//             placeholder="Your College Email"
//           />
//           <select
//             className={
//               inputData.hostelOrDayScholar === "None"
//                 ? "form-select text-muted"
//                 : "form-select"
//             }
//             id="exampleFormControlSelect"
//             aria-label="Select Day Scholar or Hosteller"
//             name="hostelOrDayScholar"
//             value={inputData.hostelOrDayScholar}
//             onChange={handleChange}
//           >
//             <option value="None">Select Day Scholar / Hosteler</option>
//             <option value="Day Scholoar">Day Scholar</option>
//             <option value="Hosteler">Hosteler</option>
//           </select>
//           <input
//             type="password"
//             name="password"
//             value={inputData.password}
//             onChange={handleChange}
//             placeholder="Your Password"
//           />
//           <input
//             type="password"
//             name="reEnterPassword"
//             value={inputData.reEnterPassword}
//             onChange={handleChange}
//             placeholder="Re-enter Password"
//           />
//           <div className="button" onClick={handleRegister}>
//             Register
//           </div>
//           <div>or</div>
//           <div className="button" onClick={() => Navigate("/login")}>
//             Login
//           </div>
//         </div>
//       </div>
//     </RegisterStyle>
//   );
// };

return (
  <section className='py-4 min-h-[80%] flex items-center justify-center  '>
    <div className='bg-gray-50 flex max-w-3xl rounded-xl shadow-xl '>
    
    <div className='sm:w-1/2 px-12 py-10'>
      <h2 className='font-bold text-3xl text-center text-[#002D74] '> Sign Up</h2>

      <form  className='mt-4 flex flex-col gap-4 '  >
      
        <div className='flex justify-between items-center gap-4'>
          <input placeholder='First Name' name="fname"
            value={inputData.fname}
            className='rounded-xl shadow border border-black/10 p-2 w-1/2 outline-0'
            onChange={handleChange}
            required
          />
          <input placeholder='Last Name' name="lname" value={inputData.lname}
            className='rounded-xl shadow border border-black/10 p-2 w-1/2 outline-0'
            onChange={handleChange}
            required

          />
        </div>

        <input
            className='p-2  rounded-xl border shadow w-full border-black/10 outline-0'
           placeholder='Registration No.' name="regNo"  value={inputData.regNo}
           onChange={handleChange}
           required

           />
          <input
            className='p-2  rounded-xl border shadow w-full border-black/10 outline-0'
           placeholder='VITB Email'   value={inputData.email} name="email"
           onChange={handleChange}
           required

           />
          
          <select required
          onChange={handleChange}
          name="hostelOrDayScholar"
          value={inputData.hostelOrDayScholar}
          className='p-2  rounded-xl border shadow w-full border-black/10 outline-0'>
            <option value="None" defaultValue>Select Day Scholar / Hosteller</option>
            <option value="hosteller">Hosteller</option>
            <option value="dayScholar">Day Scholar</option>
          </select>
        
        <input 
            type="password"
            className='rounded-xl border p-2 shadow w-full border-black/10 outline-0 '
            placeholder='Password' name='password' value={inputData.password}
            onChange={handleChange}
            required

             />
          <input 
            type="password"
            className='rounded-xl border p-2 shadow w-full border-black/10 outline-0 '
            placeholder='Re-Password' name='reEnterPassword' value={inputData.reEnterPassword}
            onChange={handleChange}
            required

             />
        
        <button  onClick={handleRegister}
        className='bg-[#002D74] font-semibold hover:scale-110 duration-300 leading-relaxed
           hover:bg-black rounded-2xl shadow-sm text-white py-2'>
            Register
        </button>

        {/* <div className='mt-4 grid grid-cols-3 items-center text-gray-400'>
          <hr className='border-gray-400'/>
          <p className='text-center text-sm'> OR </p>
          <hr className='border-gray-400'/>
        </div> */}

        <div className='text-sm flex justify-between items-center gap-4'>
            <p>Already Have An Account? </p>
            <Link to='/login' className='rounded-full
              hover:scale-110 duration-300 
             py-2 px-4 bg-black text-white'>Log in</Link>
        </div>
        
      </form>
      
    </div>

      <div className='w-1/2  p-5 sm:block hidden'>
        <div >
          <img  src={imgUrl}  
            className='rounded-2xl mt-3'
            alt='Sign Up'/>
        </div>
        
      </div>
      
    </div>
  </section>
)
};



export default Register;
