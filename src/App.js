// react
import React, { useEffect } from "react";

// route
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import {
  FindId,
  FindPassword,
  Home,
  Login,
  Oauth,
  Mypage,
  UserEdit,
  NotFound,
  Notice,
  NoticeDetail,
  Post,
  PostDetail,
  PostWrite,
  PostUpdate,
  Signup,
  Reels,
  ReelsWrite,
  CommunityList,
  CommunityDetail,
  CommunityWrite,
  CommunityUpdate,
  RecruitDetail,
  RecruitUpdate,
  RecruitWrite,
} from "./pages/Index.js";

// style
import GlobalStyles from "./styles/GlobalStyles";
import { defaultTheme } from "./styles/theme";
import { ThemeProvider } from "styled-components";

// store
import { setAccessToken } from "./shared/axios";
import { getCookie } from "./shared/cookie";

// redux
import { useDispatch } from "react-redux";

// userSlice
import { setUserDB } from "./redux/modules/userSlice";

//component
import NavMenu from "./components/NavMenu";
import ScrollRestore from "./elements/ScrollRestore";
import RouteTracker from "./components/RouteTracker.js";

function App() {
  const navigate = useNavigate();
  const theme = defaultTheme;
  setAccessToken();
  RouteTracker();

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (getCookie("accessToken")) {
      dispatch(setUserDB());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!getCookie("accessToken")) {
      if (
        location.pathname !== "/oauth" ||
        location.pathname !== "/login" ||
        location.pathname !== "/signup" ||
        location.pathname !== "/user/findId" ||
        location.pathname !== "/user/findPassword"
      ) {
        navigate("/login");
      }
    }
  }, [navigate, location.pathname]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ScrollRestore />
      <NavMenu />
      <Routes>
        <Route path="/oauth" element={<Oauth />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage/:nickname" element={<Mypage />} />
        <Route path="/myedit" element={<UserEdit />} />
        <Route path="/user/findId" element={<FindId />} />
        <Route path="/user/findPassword" element={<FindPassword />} />
        <Route path="/post" element={<Post />} />
        <Route path="/post/write" element={<PostWrite />} />
        <Route path="/post/update/:id" element={<PostUpdate />} />
        <Route path="/post/detail/:id" element={<PostDetail />} />
        <Route path="/community/write" element={<CommunityWrite />} />
        <Route path="/community/update/:id" element={<CommunityUpdate />} />
        <Route path="/community/detail/:id" element={<CommunityDetail />} />
        <Route path="/together" element={<CommunityList type="together" />} />
        <Route path="/community" element={<CommunityList type="community" />} />
        <Route path="/recruit/write" element={<RecruitWrite />} />
        <Route path="/recruit/update/:id" element={<RecruitUpdate />} />
        <Route path="/recruit/detail/:id" element={<RecruitDetail />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/notice/detail/:id" element={<NoticeDetail />} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/reels/write/:id" element={<ReelsWrite />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
