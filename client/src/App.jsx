import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { lazy } from "react"
const Home = lazy(() => import("./pages/Home"))
const Chat = lazy(() => import("./pages/Chat"))
const Group = lazy(() => import("./pages/Group"))
const Login = lazy(() => import("./pages/Login"))


const App = () => {
  return (

    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:chatId" element={<Chat />} />
        <Route path="/groups" element={<Group />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>

  )
}

export default App
