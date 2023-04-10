import clsx from "clsx"
import styles from './header.module.scss';
import { Link } from "react-router-dom";
import DrpMenu from "../DrpDwn/DrpMenu";
import useAuth from "../../contexts/AuthContext";
import { capitalize } from "lodash";
import useLogout from "../../hooks/useLogout";

const options = [
    {
        name: "General",
        path: "/categories/general"
    },
    {
        name: "Technology",
        path: "/categories/technology"
    },
    {
        name: "Politics",
        path: "/categories/politics"
    },
    {
        name: "Entertainment",
        path: "/categories/entertainment"
    },
    {
        name: "Sports",
        path: "/categories/sports"
    }
];

const Header = (): JSX.Element => {
    const { isAuthed, auth, isAdmin } = useAuth();
    const logout = useLogout();

    return (
        <div className={clsx(styles.header)}>
            <div className={styles.title}>Bloggatta</div>
            <div className={styles.menus}>
                <Link to="/" className={styles.menu}>Home</Link>
                <DrpMenu menuClass={styles.menu} options={options} menuName="Topics" />
                <Link to="/howTo" className={styles.menu}>How To's</Link>
                <Link to="/about" className={styles.menu}>About</Link>
                {
                    isAdmin() ? (
                        <>
                            <Link to="/admin/blogs/create" className={styles.menu}>Create Blog</Link>
                            <Link to="/admin/blogs/manage" className={styles.menu}>Manage Blogs</Link>
                        </>
                    ) : ""
                }
            </div>
            <div className={styles.menus} >
                {
                    isAuthed() ? (
                        <>
                            <div className={styles.infoM} >Hi, {capitalize(auth?.username)}</div>
                            <div className={styles.menu} onClick={logout}>Logout</div>
                        </>
                    ) : (
                        <>
                            <Link to="/signIn" className={styles.menu}>Sign In</Link>

                            <Link to="/signUp" className={styles.menu}>Sign Up</Link>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Header;