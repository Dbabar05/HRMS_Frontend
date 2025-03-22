import { Button } from '@mui/material';
import React, { useState } from 'react';
import { verifyCode } from '../../APIService/apiservice';



export default function VerifyUser({email}) {
    const [values,setValues]= useState({
        userName:'shubhammusale111@gmail.com',
        code:''
    });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(''); // Clear previous errors
      setMessage('');

    

      try {
        const response = await verifyCode(values);
        console.log(response)
        if (response?.code === 200) {
          setMessage('Thank you! Your email has been successfully verified. You can now log in to your account.');
        } else {
          setError(error?.response?.data?.message || error.message || 'An unexpected error occurred. Please try again.');

        }
      } catch (err) {
        setError(err?.response?.data?.message || 'An unexpected error occurred. Please try again.');
      }
    };

  return (
    <div className='container p-4' style={{width:'60%'}}>
      {!message && (
        <>
          <p className='text-primary fs-5'>
            Registration successful! <br /> Please check your email for the verification code to complete your registration.
          </p>
          <p className='text-secondary fw-bold pt-3'>
            Please enter the 6-digit verification code sent to your email to verify your account.
          </p>

          <form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
            <input
              type='text'
              name='code'
              value={values.code}
              maxLength={6}
              onChange={handleOnChange}
              placeholder='6-digit code'
              className='form-control mt-3 w-50'
              required
            />
            <Button type='submit' className='w-25 ms-2  login-btn'>Verify</Button>
          </form>

          {error && <p className='text-danger fw-bold mt-2'>{error}</p>}
        </>
      )}
      {message && <p className='text-success fs-4 mt-5'>{message}</p>}
    </div>
  );
}
