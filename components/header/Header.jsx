import styles from './header.module.css'
import Image from 'next/image'
import logo from '../../assets/images/logo-rybin.png'
import { useEffect, useState } from 'react';

export default function Header({mode, handleMode}) {
    const [animOK, setAnimOK] = useState(false);

    function changeMode() {
        handleMode();
        setAnimOK(true)
    }

    useEffect(() => {
        if(animOK) {
            let timer;
            mode ?  timer = 1250 : timer = 750; 
            var timerID = setTimeout(function(){setAnimOK(false)}, timer)
        }
        return() => {
            clearTimeout(timerID);
        }
    });

    return(
        <header id={styles.header} className="global_padding">

            <div>
                <Image src={logo} alt="logo sven rybin" />
            </div>

            <div>
                <ul>
                    <li><a href="">Accueil</a></li>
                    <li><a href="">Biographie</a></li>
                    <li><a href="">Galeries</a></li>
                    <li><a href="">Contact</a></li>
                </ul>
            </div>

            {/*<div onClick={() => handleMode()}>{mode ? 'light-mode' : 'dark-mode'}</div>*/}

            <div>
                <div className={styles.switch_mode}>
                    <label className={animOK ? styles.animation_ok : ""}>
                        <input type="checkbox" onChange={changeMode} defaultChecked={mode}/>
                        <div className={styles.switch}>
                            <div></div>
                            <div></div>
                            <span></span>
                        </div>
                    </label>
                </div>
            </div>
            
        </header>
    );
}