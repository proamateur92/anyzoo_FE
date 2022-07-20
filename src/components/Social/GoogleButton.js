// google
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';

// react
import { useEffect } from 'react';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleButton = (props) => {
  // Google 로그인

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const onSuceess = (response) => {
    console.log(response);
  };

  const onFailure = (response) => {
    console.log(response);
  };

  return (
    <div>
      <GoogleLogin clientId={clientId} buttonText='구글 로그인' onSuceess={onSuceess} onFailure={onFailure} />
    </div>
  );
};

export default GoogleButton;
