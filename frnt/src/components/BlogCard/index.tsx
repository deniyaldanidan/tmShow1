import { Link } from "react-router-dom";
import { Blog } from "../../types/BlogData";
import styles from './index.module.scss';
import { format } from 'date-fns';

type props = {
    blog: Blog
}

const BlogCard = ({ blog }: props) => {
    return (
        <div className={styles.blogCard}>
            <div className={styles.left}>
                <img src={`https://picsum.photos/seed/${blog._id}/600/400`} alt={blog.title} />
            </div>
            <div className={styles.right}>
                <div className={styles.title}>{blog.title}</div>
                <div className={styles.excerpt}>{blog.excerpt}</div>

                <div className={styles.metaCol}>
                    <div>by {blog.author.username}</div>
                    <div>last updated {format(new Date(blog.updatedAt), "yyyy-MM-dd")}</div>
                    <div>Category: {blog.category}</div>
                </div>
                <Link to={`/blog/view/${blog._id}`}>View more..</Link>
            </div>
        </div>
    )
}

export default BlogCard;