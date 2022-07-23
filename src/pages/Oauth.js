// router
import { useEffect } from "react";
import { useLocation  } from "react-router-dom";
import instance from "../shared/axios";
// import axios from "axios";

const Oauth = () => {
	const location = useLocation();
		const queryString = location.search;
		console.log(queryString);
		const codeStart = queryString.indexOf('=');
		const codeEnd = queryString.indexOf('&');
		const code = location.search.substring(codeStart+1, codeEnd);

		const sendAuthCode = async() => {
			try {
				console.log('인가코드 체크', code);
				await instance.post('/user/socialLogin', {
					headers: {
						code
					}
				});
			} catch (error) {
				console.log(error);
			}
		}

		useEffect(()=>{
			sendAuthCode();
		},[sendAuthCode]);

	return(<>
		<span>소셜로그인 인증 페이지</span>
	</>)
}

export default Oauth;