// google
import GoogleLogin from 'react-google-login';
// import {gapi} from 'gapi-script';
import { useEffect } from 'react';

const GoogleButton = () => {
  // useEffect(()=>{
  //   function start() {
  //     gapi.client.init({
  //       clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  //       scope: 'email',
  //     });
  //   }

  //   gapi.load('client:auth2', start);
  // },[])

  const onSuccess = (res) => {
    const profile = res.getBasicProfile();
    const userdata = {
      email: profile.getEmail(),
      image: profile.getImageUrl(),
      name: profile.getName(),
    }; 
    // 로그인 성공 후 실행하기 원하는 코드 작성.
    console.log(userdata);
  }

  const onFailure = (response) => {
    console.log('FAILED', response);
  };

  return (
    <div>
      <GoogleLogin clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} buttonText='구글 로그인' onSuceess={onSuccess} onFailure={onFailure} cookiePolicy={"single_host_origin"} />
    </div>
  );
};

export default GoogleButton;
