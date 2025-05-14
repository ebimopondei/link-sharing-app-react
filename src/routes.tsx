import { Routes, Route, Outlet } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import App from "./pages/app";
import MainLayout from "./components/layout/main";
import Profile from "./pages/profile";
import ProtectedPage from "./hooks/protected-page";
import Preview from "./pages/preview";
import UserProfileLinkView from "./pages/user-profile-link-view";

export default function AppRoute() {
    return(
        <Routes>
            <Route element={<Outlet />}>
                <Route path="/" element={<div><Outlet /></div>}>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="/u/:username" element={<UserProfileLinkView />} />
                </Route>
            </Route>

            <Route element={<ProtectedPage />}>
                <Route path="/" element={<MainLayout><Outlet /></MainLayout>}>
                    <Route index element={<App />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="/" element={<Outlet />}>
                    <Route path="/preview" element={<Preview />} />
                </Route>
            </Route>
        </Routes>
    )
}