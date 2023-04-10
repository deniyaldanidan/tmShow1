import { Helmet } from "react-helmet-async";
import styles from './index.module.scss';
import InpGrp from "../../components/InpGrp";
import { FormEvent, useState } from "react";
import { basicApi } from "../../api/api";
import useAuth from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const CreateBlog = (): JSX.Element => {
    const [title, setTitle] = useState<string>("");
    const [excerpt, setExcerpt] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [error, setError] = useState<string>("");
    const {auth} = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (e:FormEvent)=>{
        e.preventDefault()
        if(!title || !excerpt || !content){
            return setError("Fill out all fields");
        }

        try {
            await basicApi.post("/", {title, excerpt, content, category: "general"}, {
                headers: {
                    'Authorization': `Bearer ${auth?.accessToken}`
                }
            });
            navigate("/")
        } catch (error) {
            setError("Error Happened")
        }
    }

    return (
        <>
        <Helmet>
            <title>Create Blog</title>
        </Helmet>
        <div className={styles.pageWrapper}>
            <div className={styles.pageTitle}>Create Blog</div>
            <div className={styles.error}>{error}</div>
            <form onSubmit={onSubmit}>
                <InpGrp inpId="title" label="Title of the blog" placeholder="Title of your blog" state={title} setState={setTitle}  />
                <InpGrp inpId="excerpt" label="Excerpt" placeholder="Short description your blog" 
                state={excerpt}
                setState={setExcerpt}
                />
                <div className={styles.custGrp}>
                    <label htmlFor="body">Content</label>
                    <textarea id="body" value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
                </div>
                <button className={styles.btn}>Submit</button>
            </form>
        </div>
        </>
    )
}

export default CreateBlog;