import { Link } from 'react-router-dom';
import styles from '../../styles/authForm.module.scss';
import InpGrp from '../../components/InpGrp';
import { FormEvent, useEffect, useState } from 'react';
import { basicApi } from '../../api/api';
import useAuth from '../../contexts/AuthContext';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const SignIn = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const { updUserAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setError("");
    }, [username, password]);


    const signInHandler = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if (!username.length || !password.length) {
                return setError("Fill out all fields")
            }
            setLoading(true)
            const res = await basicApi.post("/auth/login", { username, password });
            if (res.data?.accessToken) {
                console.log(res.data.accessToken)
                updUserAuth(res.data.accessToken)
                return navigate("/");
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 400) {
                    return error.response?.data?.error ? setError(error.response.data.error) : setError("Error Happened. Try again.")
                }
                return setError("Error Happened. Try again, few minutes later");
            }
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <Helmet>
                <title>Sign In</title>
                <meta name="description" content="Sign in page of bloggatta" />
            </Helmet>
            <div className={styles.masterContainer}>
                <div className={styles.pageTitle}>Sign In</div>
                <div className={styles.error}>{error}</div>
                <form className={styles.authForm} onSubmit={signInHandler}>
                    <InpGrp
                        inpId='username'
                        label="username"
                        state={username}
                        setState={setUsername}
                        placeholder="You're username here"
                    />
                    <InpGrp
                        inpId='password'
                        label='password'
                        state={password}
                        setState={setPassword} isPwd
                        placeholder="You're password here"
                    />
                    <button disabled={loading} >{loading ? "Signing In.." : "Sign In"}</button>
                </form>
                <div className={styles.info}>Don't have an account yet? <Link to="/signUp">Sign Up</Link></div>
            </div>
        </>
    )
}

export default SignIn;