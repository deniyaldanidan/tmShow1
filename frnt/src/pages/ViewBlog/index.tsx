import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { basicApi } from '../../api/api';
import { Blog } from '../../types/BlogData';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';


const ViewBlog = (): JSX.Element => {
    const [data, setData] = useState<Blog | null>(null)
    const { id } = useParams()

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getBlog = async () => {
            try {
                const response = await basicApi.get(`/${id}`, {
                    signal: controller.signal
                });
                isMounted && setData(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getBlog();

        return () => {
            isMounted = false;
            controller.abort()
        }

    }, [])


    return (
        data ? (
            <div className={styles.blogWrapper}>
                <div className={styles.blogTitle}>{data.title}</div>
                <div className={styles.blogExcerpt}>{data.excerpt}</div>
                <div className={styles.blogMeta}>
                    <div>written on {format(new Date(data.createdAt), "yyyy-MM-dd")}</div>
                    <div>last updated {format(new Date(data.updatedAt), "yyyy-MM-dd")}</div>
                    <div>By {data.author.username}</div>
                    <div>Category: {data.category}</div>
                </div>
                <img src={`https://picsum.photos/seed/${data._id}/900/450`} alt="" />
                <div className={styles.blogContent}>{data.content.split("\n").map((txt, index)=><p key={index}>{txt}</p>)}</div>
            </div >

        ) : <>Loading...</>
    )
}

export default ViewBlog;