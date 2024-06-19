import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Home } from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./components/auth/RequireAuth";
import PersistLogin from "./components/auth/PersistLogin";
// eslint-disable-next-line no-unused-vars
import ErrorPage from "./pages/errorPage/errorPage";
import Admin from "./pages/admin/Admin"

function App(){

    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                {/* Public Routes */}
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>

                {/* Protected Routes */}
                <Route element={<PersistLogin/>}>
                    <Route element={<RequireAuth allowedRoles={[8218, 1134, 4438]}/>}>
                        <Route path="/" element={<Home/>}/>
                    </Route>
                    <Route element={<RequireAuth allowedRoles={'1134'}/>}>
                        <Route path="admin" element={<Admin/>}/>
                    </Route>
                </Route>

                {/* Catch All Route */}
                    
            </Route>
        </Routes>
    )
}

export default App