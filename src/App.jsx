import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./footer/Footer";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import ProfilePage from "./pages/profile/ProfilePage";
import HomePage from "./pages/home/HomePage";
import WorkspacePage from "./pages/workspace/WorkspacePage";
import Navbar from "./navbar/Navbar";
import {PublicHeader} from "@niklaspelli/fwk4-23-components";
import {PrivateHeader} from "@niklaspelli/fwk4-23-components";

function App() {
  const location = useLocation();

  const isPublicPage =
    location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      <div className="appContainer">
        {isPublicPage ? <PublicHeader /> : <PrivateHeader />}

        {!isPublicPage && <Navbar />}
        <div className="appContentWrap">
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="/home" element={<HomePage />}></Route>
            <Route path="/workspace" element={<WorkspacePage />}></Route>
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
