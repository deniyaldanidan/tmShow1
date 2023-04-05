import { Outlet } from "react-router-dom"
import Header from "./Header";
import styles from './index.module.scss';
import Footer from "./Footer";

const Layout1 = () => {

    return (
        <div className={styles.layout}>
            <Header />
            <main style={{ flexGrow: 1 }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout1;