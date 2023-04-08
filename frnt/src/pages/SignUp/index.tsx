import { Link } from 'react-router-dom';
import styles from '../../styles/authForm.module.scss';
import InpGrp from '../../components/InpGrp';
import { FormEvent, useEffect, useState } from 'react';
import { basicApi } from '../../api/api';
import useAuth from '../../contexts/AuthContext';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import validator from 'validator';

const SignUp = () => {
    const [username, setUsername] = useState<string>("");
    const [unameError, setUnameError] = useState<string>("");
    const [validuname, setValidUname] = useState<boolean>(false);

    const [password, setPassword] = useState<string>("");
    const [pwdError, setPwdError] = useState<string>("");
    const [validPwd, setValidPwd] = useState<boolean>(false);

    const [confirm, setConfirm] = useState<string>("");
    const [confirmError, setConfirmError] = useState<string>("");
    const [validMatch, setValidMatch] = useState<boolean>(false);

    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const { updUserAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (username.length) {
            if(/^[a-z0-9_]{2,}$/gi.test(username) === false){
                setUnameError("Username should only contain - and alphanumeric characters and atleast 2 characters");
                setValidUname(false)
            } else{
                setUnameError("")
                setValidUname(true)
            }
        }
    }, [username])

    useEffect(()=>{
        if (password.length){
            if (!validator.isStrongPassword(password)){
                setPwdError("Password is too weak");
                setValidPwd(false);
            } else{
                setPwdError("");
                setValidPwd(true)
            }
        }

        if(confirm.length){
            if(password!==confirm){
                setConfirmError("ReType the exact match of password");
                setValidMatch(false)
            } else{
                setConfirmError("");
                setValidMatch(true)
            }
        }
    }, [password, confirm]);

    useEffect(() => {
        setError("");
    }, [username, password, confirm]);


    const signUpHandler = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if (!username.length || !password.length || !confirm.length) {
                return setError("Fill out all fields")
            }
            if (!validuname || !validPwd || !validMatch){
                return setError("Enter valid values for all fields")
            }
            setLoading(true)
            const res = await basicApi.post("/auth/register", { username, password });
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
                <title>Sign Up</title>
                <meta name="description" content="Sign Up page of bloggatta" />
            </Helmet>
            <div className={styles.masterContainer}>
                <div className={styles.pageTitle}>Sign Up</div>
                <div className={styles.error}>{error}</div>
                <form className={styles.authForm} onSubmit={signUpHandler}>
                    <InpGrp
                        inpId='username'
                        label="username"
                        state={username}
                        setState={setUsername}
                        placeholder="You're username here"
                        errField
                        error={unameError}
                    />
                    <InpGrp
                        inpId='password'
                        label='password'
                        state={password}
                        setState={setPassword} isPwd
                        placeholder="You're password here"
                        errField
                        error={pwdError}
                    />
                    <InpGrp
                        inpId='confirm'
                        label='confirm'
                        state={confirm}
                        setState={setConfirm} isPwd
                        placeholder="Re-Type password here"
                        errField
                        error={confirmError}
                    />
                    <button disabled={loading} >{loading ? "Signing Up.." : "Sign Up"}</button>
                </form>
                <div className={styles.info}>Already Registered? <Link to="/signIn">Sign In</Link></div>
            </div>
        </>
    )
}

export default SignUp;