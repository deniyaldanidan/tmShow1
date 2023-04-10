import { useState } from "react";
import useBasicFetch from "../../hooks/useBasicFetch";
import { Blog } from "../../types/myTypes";
import { Helmet } from "react-helmet-async";
import BlogCard from "../../components/BlogCard";
import { basicApi } from "../../api/api";
import useAuth from "../../contexts/AuthContext";



const ManageBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const {auth} = useAuth();

    useBasicFetch("/", (data) => {
        setBlogs(data)
    });

    const deleteHandler = async (id:string)=>{
        try {
            const res = await basicApi.delete(`/${id}`, {headers: {Authorization: `Bearer ${auth?.accessToken}`}});
            if (res.data?.success){
                setBlogs(prev=>prev.filter(bl=>bl._id!==id));
            }
            return;
        } catch (error) {
            return;
        }
    }

    return (
        <>
            <Helmet>
                <title>Manage Blogs</title>
            </Helmet>
            <div style={{display:"flex", flexDirection: "column", rowGap: "40px"}}>
                {
                    blogs.length ? blogs.map(blog=><div style={{display:"flex", rowGap: "15px", flexDirection:"column"}} key={blog._id} ><BlogCard  blog={blog} /><div style={{cursor: "pointer", display: "block", width: "fit-content"}} onClick={()=>deleteHandler(blog._id)}>Delete</div></div>) : ""
                }
            </div>
        </>
    )
}


export default ManageBlogs;