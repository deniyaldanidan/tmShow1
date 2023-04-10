import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout1 from "./components/Layout1";
import ViewBlog from "./pages/ViewBlog";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UnAuthedOnly from "./components/UnAuthedOnly";
import AdminOnly from "./components/AdminOnly";
import CreateBlog from "./pages/CreateBlog";
import ManageBlogs from "./pages/ManageBlogs";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout1 />}>
        <Route index element={<Home />} />
        <Route path="/blog/view/:id" element={<ViewBlog />} />

        {/* Only unAuthed Users */}
        <Route element={<UnAuthedOnly/>}>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
        </Route>
        {/* Only Admins */}
        <Route element={<AdminOnly/>}>
          <Route path="/admin/blogs/create" element={<CreateBlog/>} />
          <Route path="/admin/blogs/manage" element={<ManageBlogs/>} />
        </Route>
      </Route>
      <Route path="*" element={<div>404 not found</div>} />
    </Routes>
  );
}

export default App;
