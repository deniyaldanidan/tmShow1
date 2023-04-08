import { Dispatch, SetStateAction, useState } from 'react';
import styles from './index.module.scss';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { capitalize } from 'lodash';


type props = {
    inpId: string,
    label: string,
    state: string,
    setState: Dispatch<SetStateAction<string>>,
    isPwd?: true,
    placeholder: string
    errField?: true,
    error?: string,
};

const InpGrp = ({ inpId, label, state, setState, isPwd, placeholder, error, errField }: props) => {
    const [pwdVisible, setPwdVisible] = useState<boolean>(false);

    return (
        <div className={styles.inpGrp}>
            <label htmlFor={inpId}>{capitalize(label)}</label>
            {
                isPwd ? (
                    <div className={styles.pwdInp}>
                        <input
                            type={pwdVisible ? "text" : "password"}
                            id={inpId}
                            value={state}
                            onChange={e => setState(e.target.value)}
                            placeholder={placeholder}
                        />
                        <div onClick={() => setPwdVisible(prev => !prev)}>
                            {
                                pwdVisible ? <AiFillEye /> : <AiFillEyeInvisible />
                            }
                        </div>
                    </div>
                ) : (
                    <input
                        type="text"
                        id={inpId}
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className={styles.ordInp}
                        placeholder={placeholder}
                    />
                )
            }
            {errField ? <div className={styles.inpError}>{error}</div> : ""}
        </div>
    )
}

export default InpGrp;