import React, { useState } from 'react'
import signInImg from '../assets/signin.jpg'
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup  } from "firebase/auth";
import { toast } from 'react-toastify';

const SignIn = () => {

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  let [emailerr, setEmailerr] = useState("");
  let [passworderr, setPassworderr] = useState("");
  let [passwordshow, setPasswordshow] = useState(false);
  let [loader, setLoader] = useState(false);



  

let [info,setInfo] = useState({
    email:'',
    password:'',
})

let handleChange = (e) => {
  setInfo({...info,[e.target.name] : e.target.value })
}

let handleSubmit = () => {
  if (!info.email) {
    setEmailerr("Email is required");
    toast("Email is required")
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(info.email)) {
    setEmailerr("Invalid Email");
  }

  if (!info.password) {
    setPassworderr("Password is required");
  }
  if(info.email && info.password){
    signInWithEmailAndPassword(auth, info.email, info.password)
    .then((userCredential) => {
      
      const user = userCredential.user;
      toast.success("Login Susseccfully!!")
      console.log(user);
    })
    .catch((error) => {
      error.code.includes('auth/invalid-credential') &&   toast.error("Invalid Email or Password!!")
    });
  }
}

let loginWithGoogle = () => {

  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    toast.success("Login Susseccfully!!")
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(error);
  });

}
  return (
    <div className='w-full h-screen flex'>
      <div className="h-full w-2/4 flex items-center justify-center">
        <div className='text-center'>
          <h1 className='text-[34px] font-bold text-secondary'>Login to your account!</h1>
          <div className="relative w-[368px] h-[80px] mt-[61px] m-auto">
            <label className='text-sm font-semibold text-secondary absolute top-[-10px] left-[50px] bg-white px-2'> Email Address</label>
            <input onChange={handleChange}
            value={info.email}
            name='email'
             type="email" className='w-full h-full border-b border-secondary/50 pl-[50px]' placeholder='Enter Your Email' />
            {emailerr && (
              <p className=" text-red-500 text-xl font-normal text-left">{emailerr}</p>
            )}
          </div>
          
          <div className="relative w-[368px] h-[80px] mt-[61px]  m-auto">
            <label className='text-sm font-semibold text-secondary absolute top-[-10px] left-[50px] bg-white px-2'>Password</label>
            <input onChange={handleChange}
            value={info.password}
            name='password'
            type={passwordshow ? 'text':'password'} className='w-full h-full border-b border-secondary/50 pl-[50px]' placeholder='Enter Your Password' />
            {passwordshow ? (
              <FaEye
                onClick={() => setPasswordshow(false)}
                className=" text-2xl absolute top-2/4 translate-y-[-50%] right-5 cursor-pointer"
              />
            ) : (
              <FaEyeSlash
                onClick={() => setPasswordshow(true)}
                className=" text-2xl absolute top-2/4 translate-y-[-50%] right-5 cursor-pointer"
              />
            )}
            {passworderr && (
              <p className=" text-red-500 text-xl font-normal text-left">{passworderr}</p>
            )}
          </div>
          
          <div className="flex flex-col">
          <button onClick={handleSubmit} className='bg-primary w-[368px] py-5 text-xl font-semibold text-white rounded-[89px] mt-[51px]'>Login to Continue</button>
          <button onClick={loginWithGoogle} className='bg-primary w-[368px] py-5 text-xl font-semibold text-white rounded-[89px] mt-[51px] flex items-center justify-center'><FaGoogle/> <span className="pl-2">Login With Google</span></button>
          </div>
          <p className='text-sm text-secondary text-center w-[368px] mt-[36px]'>Don’t have an account ?<Link to="/signup" className='text-[#EA6C00] font-semibold'>Sign Up</Link></p>
        </div>
      </div>
      <div className="h-full w-2/4">
        <img src={signInImg} alt={signInImg} className='h-full w-full object-cover' />
      </div>
    </div>
  )
}

export default SignIn