
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;

const Google = () => {
  // clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} 
  // buttonText='구글 로그인' 
  // onSuceess={onSuccess}
  // onFailure={onFailure} 
  // cookiePolicy={"single_host_origin"}
  // responseType={"id_token"} 
  
  return (
    <a href={GOOGLE_AUTH_URL}>구글 로그인</a>
  )
};

export default Google;
