import { Link } from 'react-router-dom';
import styles from './DrpMenu.module.scss'
import { useState, useRef } from "react";
import useClickOutside from '../../hooks/useClickOutside';
import { motion, AnimatePresence } from 'framer-motion';

type props = {
    menuClass: string,
    options: Array<{ name: string, path: string }>,
    menuName: string
}

const DrpMenu = ({ menuClass, options, menuName }: props) => {
    const [hoverState, setHoverState] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement | null>(null)

    useClickOutside(() => { setHoverState(false) }, ref)

    return (
        <div className={styles.drpDwnMenu} ref={ref}>
            <div className={menuClass} onClick={() => setHoverState(prev => !prev)}>{menuName}</div>
            <AnimatePresence initial={false}>
                {
                    hoverState ? (
                        <motion.div
                            className={styles.drpDwn}
                            style={{x:"-50%"}}
                            initial={{y:-5, opacity:0}}
                            animate={{y:0, opacity:1}}
                            exit={{y:-5, opacity:0}}
                            transition={{type: "spring", duration:0.5}}
                        >
                            {
                                options.map(opt => (<Link key={opt.path} to={opt.path} onClick={()=>setHoverState(false)}>{opt.name}</Link>))
                            }
                        </motion.div>
                    ) : ""
                }
            </AnimatePresence>
        </div>
    )
}

export default DrpMenu;