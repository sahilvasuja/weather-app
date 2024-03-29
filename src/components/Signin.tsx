


import { useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
export const Signin = () => {
  // const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  // const [confirmObj, setConfirmObj] = useState('');
  const [confirmObj, setConfirmObj] = useState<ConfirmationResult | null>(null);
  const sendOtp = async () => {
    if (phoneNumber === '' || phoneNumber === undefined){
      toast.error('Invalid Phone Number. Please try again.');
  
    } 

    const res = await setupRecap(phoneNumber);
    setConfirmObj(res);
    setShowOtpInput(true);
    toast.success('OTP sent successfully!');
  };
const nagivate=useNavigate()
  const setupRecap = (phoneNumber: string) => {
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  };

  const submitOTP = async () => {
    // if (otp === '' || otp === null) return;
    if (otp === '' || otp === null || !confirmObj) return;
    try {
   await confirmObj.confirm(otp);
      toast.success("OTP submitted successfully!");
      // window.location.href = '/weather';
      nagivate('/weather')
    } catch (error) {
      console.log(error);
      toast.error('Invalid OTP. Please try again.');
  
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md mt-10">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone Number:
          </label>
          <PhoneInput
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(value) => setPhoneNumber(value || '')}
            // onChange={setPhoneNumber}
            className="w-full p-2 border  rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          onClick={sendOtp}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none"
        >
          Send OTP
        </button>

        <div id='recaptcha-container' className='my-3'></div>

        {showOtpInput && (
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
              Enter OTP:
            </label>
            <div className="flex">
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="flex-1 p-2 border  rounded-md focus:outline-none focus:border-blue-500"
                maxLength={6}
              />
              <button
                onClick={submitOTP}
                className="ml-2 w-1/2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none"
              >
                Submit OTP
              </button>
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
    </>
  );
};
