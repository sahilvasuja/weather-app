import React, { useState } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {  RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
export const Signin = () => {
    // const navigate=useNavigate();
       
   const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
   const [showOtpInput, setShowOtpInput] = useState(false);
    const [confirmObj,setConfirmObj]=useState('')
    const [error,setError]=useState('')
    const sendOtp=async()=>{
        console.log(phoneNumber)
        if(phoneNumber=='' || phoneNumber== undefined) return setError("please enter a valid OTP")
    
        const res= await setupRecap(phoneNumber)
        setConfirmObj(res);
        setShowOtpInput(true);
        toast.success('OTP sent successfully!');
        console.log(res)
    }
    const setupRecap=(phoneNumber)=>{
        // const reCap=new RecaptchaVerifier()
        const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
        recaptchaVerifier.render()
        return signInWithPhoneNumber(auth, phoneNumber,recaptchaVerifier)
    }

  const submitOTP =async () => {
    // TODO: Implement OTP submission logic here
    // For simplicity, show success toast
    if(otp=='' || otp== null) return ;
    try{
        await confirmObj.confirm(otp)
        toast.success('OTP submitted successfully!');
    //    navigate('/Weather')
    console.log("object")
    }
    catch(error){
        console.log(error)
    }
  
  };
  return (
  
    <>
 <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
          Phone Number:
        </label>
        <PhoneInput
    placeholder="Enter phone number"
    value={phoneNumber}
    onChange={setPhoneNumber}/>
        
      </div>

      <button
        onClick={sendOtp}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
      >
        Send OTP
      </button>
      <div id='recaptcha-container'></div>
      {showOtpInput && (
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
            Enter OTP:
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-16 p-2 border rounded-md"
            maxLength={6}
          />
          <button
            onClick={submitOTP}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 ml-2"
          >
            Submit OTP
          </button>
        </div>
      )}

      {/* Toast Container for displaying notifications */}
    
    </div>
    </>
  )
}
