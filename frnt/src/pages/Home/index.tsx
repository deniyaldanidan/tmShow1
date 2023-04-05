import styles from './home.module.scss';
// import clsx from 'clsx';
import { useEffect, useState } from "react";
import { basicApi } from "../../api/api";
import { Blog } from "../../types/BlogData";
import BlogCard from "../../components/BlogCard";

const Home = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getBlogs = async () => {
            try {
                const response = await basicApi.get("/", {
                    signal: controller.signal
                });
                isMounted && setBlogs(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getBlogs();
        return () => {
            isMounted = false;
            controller.abort()
        }

    }, [])

    return (
        <div className={styles.blogCards}>
            {
                blogs.map((blog)=><BlogCard blog={blog} key={blog._id} />)
            }
        </div>
    );
}

export default Home;