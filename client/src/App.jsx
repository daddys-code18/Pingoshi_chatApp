import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Suspense, lazy, useEffect } from "react"
import ProtectRoute from "./components/auth/ProtectRoute"
import { LayoutLoader } from "./components/layout/Loader"
import axios from "axios";
import { server } from "./constants/config";
import { useDispatch, useSelector } from "react-redux"
import { userExists, userNotExists } from "./redux/reducers/auth";
import { Toaster } from "react-hot-toast"

const Home = lazy(() => import("./pages/Home"))
const Chat = lazy(() => import("./pages/Chat"))
const Group = lazy(() => import("./pages/Group"))
const Login = lazy(() => import("./pages/Login"))
const NotFound = lazy(() => import("./pages/NotFound"))
const AdminLogin = lazy(() => import("./pages/Admin/AdminLogin"))
const DashBoard = lazy(() => import("./pages/Admin/DashBoard"))
const UserManagement = lazy(() => import("./pages/Admin/UserManagement"))
const ChatManagement = lazy(() => import("./pages/Admin/ChatManagement"))
const MessageManagement = lazy(() => import("./pages/Admin/MessageManagement"))



const App = () => {
  const { user, loader } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    axios
    .get(`${server}/api/v1/user/me`, { withCredentials: true })
    .then(({ data }) => dispatch(userExists(data.user)))
    .catch((err) => dispatch(userNotExists()))

  }, [dispatch])
  return loader ? <LayoutLoader /> : (

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
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/chats" element={<ChatManagement />} />
          <Route path="/admin/messages" element={<MessageManagement />} />

          <Route path="*" element={<NotFound />} />



        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />

    </Router>

  )
}

export default App
