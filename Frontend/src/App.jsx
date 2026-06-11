import { Routes, Route } from "react-router-dom"
import Feed from "./pages/Feed"
import Post from "./pages/Post"
const App = () => {
  return (
    <div className="bg-gray-100 w-full min-h-dvh flex flex-col justify-center items-center py-6">
    <Routes>
      <Route path="/" element={<Feed />} />
      <Route path="/post" element={<Post />} />
    </Routes>
    </div>
  )
}

export default App