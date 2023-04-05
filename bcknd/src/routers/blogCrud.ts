import { Router } from "express";
import authOnly from "../middlewares/authOnly";
import allowedRolesFunc from "../middlewares/allowedRoles";
import roles from "../config/roles";
import createBlog from "../Controllers/blogCrud/createBlog";
import deleteBlog from "../Controllers/blogCrud/deleteBlog";
import getAllBlogs from "../Controllers/blogCrud/getAllBlogs";
import getBlog from "../Controllers/blogCrud/getBlog";

const blogCrud = Router();

blogCrud.get("/", getAllBlogs);
blogCrud.get("/:id", getBlog);
blogCrud.post("/", authOnly, allowedRolesFunc(roles.Admin), createBlog)
blogCrud.delete("/:id", authOnly, allowedRolesFunc(roles.Admin), deleteBlog)

export default blogCrud;