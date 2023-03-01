import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import jwt_decode from "jwt-decode";
import { client } from '../client';



const Login = () => {
  const naigate = useNavigate();

  const responseGoogle = (response) => {
    var obj = jwt_decode(response.credential);
    var data = JSON.stringify(obj);
   

    localStorage.setItem('user', data);

    const { name, picture, email } = obj;

    const id = email.split('@');

    const doc = {
      _id: id.shift(),
      _type: 'user',
      userName: name,
      image: picture
    }

    client.createIfNotExists(doc).then(()=>{
      naigate('/', {replace: true});
    })

    console.log(obj);

  }


  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      
      <div className='relative w-full h-full'>
        <video src={shareVideo}
        type='video/mp4'
        loop
        controls={false}
        muted
        autoPlay
        className='w-full h-full object-cover'

        />
      </div>
      <div  className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
        <div className='p-5'>
          <img src={logo} width="130px" alt="Logo" />
        </div>
        <div className='shadow-2x1'>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
        <GoogleLogin
            onSuccess={responseGoogle}
        />
    </GoogleOAuthProvider>

        </div>
      </div>
    </div>
  )
}

export default Login
