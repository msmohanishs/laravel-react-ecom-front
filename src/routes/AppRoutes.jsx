import { Route, Routes } from "react-router-dom"
import { Home } from "../components/Home"
import { Login } from "../components/Login"
import { Register } from "../components/Register"
import { Profile } from "../components/Profile"
import { Forgot } from "../components/Forgot"
import Resetp from "../components/Resetp"


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forgot-password" element={<Forgot />} />
            <Route path="/reset-password" element={<Resetp />} />
        </Routes>
    )
}