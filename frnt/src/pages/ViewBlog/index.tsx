import { useState } from 'react';
import styles from './index.module.scss';
import { Blog } from '../../types/myTypes';
import { useParams } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { capitalize } from 'lodash'
import { Helmet } from 'react-helmet-async';
import useBasicFetch from '../../hooks/useBasicFetch';


const ViewBlog = (): JSX.Element => {
    const [data, setData] = useState<Blog | null>(null)
    const { id } = useParams();

    useBasicFetch(`/${id}`, (data)=>{
        setData(data)
    })

    return (
        data ? (
            <>
                <Helmet prioritizeSeoTags>
                    <title>{data.title}</title>
                    <meta name="description" content={data.excerpt} />
                    <meta name='author' content={data.author.username} />
                    <meta name='keywords' content={data.category} />
                </Helmet>

                <div className={styles.blogWrapper}>
                    <div className={styles.blogTitle}>{data.title}</div>
                    <div className={styles.blogExcerpt}>{data.excerpt}</div>
                    <div className={styles.blogMeta}>
                        <div>Written {formatDistance(new Date(data.createdAt), new Date(), { addSuffix: true })}</div>
                        <div>Updated {formatDistance(new Date(data.updatedAt), new Date(), { addSuffix: true })}</div>
                        <div>By {capitalize(data.author.username)}</div>
                        <div>Category: {capitalize(data.category)}</div>
                    </div>
                    <img src={`https://picsum.photos/seed/${data._id}/900/450`} alt="" />
                    <div className={styles.blogContent}>{data.content.split("\n").map((txt, index) => <p key={index}>{txt}</p>)}</div>
                </div >
            </>
        ) : <h2 style={{ textAlign: "center" }}>Loading...</h2>
    )
}

export default ViewBlog;