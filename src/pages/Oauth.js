// react
import { useCallback, useEffect } from "react";

// redux
import { useDispatch } from "react-redux";

// router
import { useNavigate, useSearchParams } from "react-router-dom";

// userSlice
import { setUserDB } from "../redux/modules/userSlice";

// axios
import instance, { setAccessToken } from "../shared/axios";

// cookie
import { getCookie, setCookie } from "../shared/cookie";

// sweetalert
import Swal from "sweetalert2";

const Oauth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [serachParams, setSearchParams] = useSearchParams();
  const code = serachParams.get("code");
  const scope = serachParams.get("scope");

  const back = getCookie("accessToken") ? true : false;

  const sendAuthCode = useCallback(
    async (url) => {
      if (back) {
        return;
      }

      try {
        const response = await instance.get(url, {
          headers: {
            code,
          },
        });
        const accessToken = response.data.accesstoken;
        const refreshToken = response.data.refreshtoken;
        setCookie("accessToken", accessToken);
        setCookie("refreshToken", refreshToken);
        navigate("/");
        setAccessToken();
        dispatch(setUserDB());
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "로그인에 실패하였습니다",
          icon: "error",
          confirmButtonText: "확인",
          confirmButtonColor: "#44DCD3",
        }).then(() => {
          navigate("/login");
        });
      }
    },
    [back, dispatch, navigate, code]
  );

  useEffect(() => {
    let url = "";

    if (scope) {
      url = "/user/oauth/google";
    } else {
      url = "/user/oauth/kakao";
    }

    sendAuthCode(url);
  }, [scope, sendAuthCode]);

  return <></>;
};

export default Oauth;
