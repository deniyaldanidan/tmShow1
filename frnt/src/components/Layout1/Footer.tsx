import { Link } from 'react-router-dom';
import styles from './footer.module.scss'
import {FaFacebookF, FaSlack, FaTwitter} from 'react-icons/fa';

const Footer = (): JSX.Element => {
    return (
        <div className={styles.footerWrapper}>
            <div className={styles.cta}>
                <div className={styles.title}>Subscribe to our newsletter</div>
                <div className={styles.ctaInpGrp}>
                    <input type="text" placeholder="example@example.com"/>
                    <button type='button'>Subscribe</button>
                </div>
            </div>
            <div className={styles.primary}>
                <div className={styles.left}>Bloggatta</div>
                <div className={styles.right}>
                    <FaFacebookF />
                    <FaTwitter />
                    <FaSlack /> 
                </div>
            </div>
            <div className={styles.secondary}>
                <div className={styles.copy}>&copy; 2023 Dani's Products</div>
                <div className={styles.footerMenu}>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/faq">FAQ</Link>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <Link to="/terms">Terms And Conditions</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer;