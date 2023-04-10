import styles from './home.module.scss';
import { useState } from "react";
import { Blog } from "../../types/myTypes";
import BlogCard from "../../components/BlogCard";
import { Helmet } from 'react-helmet-async';
import useBasicFetch from '../../hooks/useBasicFetch';

const Home = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useBasicFetch("/", data=>{
        setBlogs(data)
    })

    return (
        <>
            <Helmet>
                <title>Home</title>
                <meta name='description' content='Home page of the Bloggatta app' />
                <meta name='keywords' content='Bloggatta, Blogging, Articles' />
            </Helmet>
            <div className={styles.pageTitle}>All Blogs</div>
            <div className={styles.blogCards}>
                {
                    blogs.map((blog) => <BlogCard blog={blog} key={blog._id} />)
                }
            </div>
        </>
    );
}

export default Home;