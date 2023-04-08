import { Link } from "react-router-dom";
import { Blog } from "../../types/myTypes";
import styles from './index.module.scss';
import { formatDistance } from 'date-fns';
import {FaUserEdit, FaCalendarAlt, FaTags} from 'react-icons/fa';

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
                    <div><FaUserEdit className={styles.metaIcon}/> <span>{blog.author.username}</span></div>
                    <div><FaCalendarAlt className={styles.metaIcon}/> <span>{formatDistance(new Date(blog.updatedAt), new Date(), {addSuffix:true})}</span></div>
                    <div><FaTags className={styles.metaIcon}/> <span>{blog.category}</span></div>
                </div>
                <Link to={`/blog/view/${blog._id}`}>Read More...</Link>
            </div>
        </div>
    )
}

export default BlogCard;