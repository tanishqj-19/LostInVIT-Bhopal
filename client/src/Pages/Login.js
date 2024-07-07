import React, { useState } from "react";
import LionImage from '../images/LionImage'
// import styled from "styled-components";
import { loginfunction } from "../Services/Apis";
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';





const Login = () => {
  const Navigate = useNavigate();
  const [inputData, setInputData] = useState({ regNo: "", password: "" });
  const [spinner, setSpinner] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { regNo, password } = inputData;

    if (!regNo || !password) {
      alert("Enter all input fields");
    } else {
      setSpinner(true);
      const response = await loginfunction(inputData);

      if (response.status === 200) {
        if (response.data.message === "Blocked") {
          alert(
            "You are blocked by the admin, contact admin at lostInVIT@gmail.com"
          );
          setSpinner(false);
          setInputData({ regNo: "", password: "" });
        } else {
          setSpinner(false);
          alert(response.data.message);
          sessionStorage.setItem("userdbtoken", response.data.userToken);
          sessionStorage.setItem("loggedIn", true);
          Navigate("/");
          window.location.reload();
        }
      } else {
        setSpinner(false);
        alert(response.response.data.message);
        setInputData({ regNo: "", password: "" });
      }
    }
  };

//   return (
//     <LoginStyle>
//       <div className="App">
//         <div className="login">
//           <h1>Login</h1>
//           <input
//             type="text"
//             name="regNo"
//             value={inputData.regNo}
//             placeholder="Enter your Registration Number"
//             onChange={handleChange}
//           />
//           <input
//             type="password"
//             name="password"
//             value={inputData.password}
//             placeholder="Enter your Password"
//             onChange={handleChange}
//           />
//           <div className="button" onClick={handleLogin}>
//             Login
//             {spinner ? (
//               <div className="spinner-border" role="status">
//                 <span className="sr-only"></span>
//               </div>
//             ) : (
//               ""
//             )}
//           </div>
//           <div>or</div>
//           <div className="button" onClick={() => Navigate("/register")}>
//             Register
//           </div>
//         </div>
//       </div>
//     </LoginStyle>
//   )
// };
  return (
    <section className='min-h-screen flex items-center justify-center '>
      <div className='bg-gray-50 flex max-w-3xl rounded-xl shadow-xl '>

        <div className='sm:w-1/2 px-12 py-10'>
          <h2 className='font-bold text-3xl text-center text-[#002D74] '>
            Log In
          </h2>
          <p className='text-sm mt-4'>If you already a member, easily log in</p>
          
          <form  className='flex flex-col gap-4'>
            <input
              className='p-2 mt-6 rounded-xl border shadow w-full border-black/10 outline-0'
             placeholder='Registration No.' name='regNo'
             value={inputData.regNo} onChange={handleChange} />

            <div className='relative'>
              <input 
              type = {isClosed ? 'text': 'password'}
              className='rounded-xl border p-2 shadow w-full border-black/10 outline-0 '
              placeholder='Password' name='password' 
                value={inputData.password} onChange={handleChange}
              />

              {!isClosed && <Eye color='gray'  className=' absolute top-1/2 right-3 -translate-y-[50%]'
                onClick={() => {setIsClosed(!isClosed)}}
              />}
              {isClosed && <EyeOff color='gray'  className=' absolute top-1/2 right-3 -translate-y-[50%]'
                onClick={() => {setIsClosed(!isClosed)}}
              />}
            </div>
            
            <button className='bg-[#002D74] font-semibold hover:scale-110 duration-300 leading-relaxed
             hover:bg-black rounded-xl shadow-md text-white py-2' onClick = {handleLogin}>
              Log in
              {spinner ? (
              <div className="spinner-border ml-2 h-3 w-3" role="status">
                <span className="sr-only"></span>
                </div>
               ) : (
                  ""
              )}
              
            </button>

            <div className='mt-2 grid grid-cols-3 items-start text-gray-600'>
              <hr className='border-gray-600'/>
              <p className='text-center my-1 text-sm'> OR </p>
              <hr className='border-gray-600'/>
            </div>

            <div className='text-sm flex  mt-0 justify-between items-center gap-4'>
              
              <Link to='/register' className='rounded-full
                hover:scale-110 duration-300 
               py-2 px-3 bg-black text-white'>Sign up</Link>

              <button onClick={(e)=> {e.preventDefault(); setInputData({ regNo: "21BCE56789", password: 'testUser123'});}} className='rounded-full
                hover:scale-110 duration-300 
               py-2 px-3 bg-blue-900 text-white'>Test User</button>
            </div>

           
            
          </form>
        </div>

        <div className='w-1/2 p-5 sm:block hidden'>
          <LionImage />
        </div>
      </div>
    </section>
  )
};



// const LoginStyle = styled.section`
//   .App {
//     display: flex;
//     width: 100vw;
//     height: 100vh;
//     justify-content: center;
//     align-items: center;
//     background: #f0f2f5;
//     font-family: Arial, sans-serif;
//   }

//   .login {
//     width: 400px;
//     background: #fff;
//     border: 1px solid #dddfe2;
//     box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
//     border-radius: 8px;
//     padding: 1rem;
//     align-items: center;
//     text-align: center;
//   }

//   .login > input {
//     border-radius: 8px;
//     border: 2px solid #dddfe2;
//     outline: none;
//     color: #1d2129;
//     margin: 0.5rem 0;
//     padding: 0.5rem 0.75rem;
//     width: 92%;
//     font-size: 1rem;
//   }

//   .login > .button {
//     background: #1877f2;
//     border: 1px solid #1877f2;
//     color: #fff;
//     font-size: 1.25rem;
//     padding: 0.5rem;
//     margin: 0.5rem 0;
//     border-radius: 8px;
//     outline: none;
//     cursor: pointer;
//   }
// `;


export default Login;
