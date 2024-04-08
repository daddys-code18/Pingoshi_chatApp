import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react"
import ProtectRoute from "./components/auth/ProtectRoute"
import { LayoutLoader } from "./components/layout/Loader"
const Home = lazy(() => import("./pages/Home"))
const Chat = lazy(() => import("./pages/Chat"))
const Group = lazy(() => import("./pages/Group"))
const Login = lazy(() => import("./pages/Login"))
const NotFound = lazy(() => import("./pages/NotFound"))
const AdminLogin = lazy(() => import("./pages/Admin/AdminLogin"))
const DashBoard = lazy(() => import("./pages/Admin/DashBoard"))

let user = true;

const App = () => {
  return (

    <Router>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Group />} />

          </Route>

          <Route path="/login" element={<ProtectRoute user={!user} redirect="/">
            <Login />
          </ProtectRoute>} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<DashBoard />} />

          <Route path="*" element={<NotFound />} />



        </Routes>
      </Suspense>

    </Router>

  )
}

export default App
