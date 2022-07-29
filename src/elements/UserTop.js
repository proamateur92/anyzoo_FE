// style
import styled from "styled-components";

// icon
import { IoIosArrowBack } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";

// sweetalert
import Swal from "sweetalert2";

// router
import { useNavigate } from "react-router-dom";

// CircularProgressbar
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// 로그아웃
import { useSelector } from "react-redux";

const UserTop = ({ title, type, step, moveStep, showLogout, percentage }) => {
  const myInfo = useSelector((state) => state.user.info);
  const navigate = useNavigate();
  let icon = "";

  const logout = () => {
    Swal.fire({
      title: "로그아웃 하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "로그아웃",
      cancelButtonText: "취소",
      confirmButtonColor: "#44DCD3",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        document.cookie = "accessToken" + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/;";
        document.cookie = "refreshToken" + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/;";
        navigate("/login");
        window.location.reload();
      }
    });
  };

  if (type === "mypage" && showLogout && step === 0) {
    icon = <FaSignOutAlt style={{ fontSize: "3rem", color: "red" }} onClick={() => logout()} />;
  } else if (type === "signup") {
    icon = (
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        strokeWidth={12}
        styles={buildStyles({ textColor: "#44DCD3", textSize: "30px", pathColor: "#44DCD3" })}
      ></CircularProgressbar>
    );
  }
  return (
    <Top type={type}>
      {(type === "signup" || type === "find") && (
        <Icon onClick={() => navigate("/login")}>
          <IoIosArrowBack />
        </Icon>
      )}
      {type === "mypage" && title === "마이페이지" && (
        <Icon onClick={() => (step === 0 ? navigate("/") : moveStep(0))}>
          <IoIosArrowBack />
        </Icon>
      )}
      {type === "mypage" && title !== "마이페이지" && (
        <Icon onClick={() => (step === 0 ? navigate(`/mypage/${myInfo.nickname}`) : moveStep(0))}>
          <IoIosArrowBack />
        </Icon>
      )}
      <span>{title}</span>
      <Icon type={type}>{icon}</Icon>
    </Top>
  );
};

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 2rem;
  text-align: center;
  padding: 6.5% 0;
  span {
    font-weight: 800;
  }
`;

const Icon = styled.div`
  position: absolute;
  width: ${(props) => props.type === "signup" && "11%"};
  font-weight: ${(props) => props.type === "signup" && "800"};
  cursor: pointer;
  font-size: 3rem;
  &:first-of-type {
    left: 0;
  }
  &:nth-of-type(2) {
    right: 2%;
  }
`;

export default UserTop;
