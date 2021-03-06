import styles from './header.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react';

export default function Header({mode, handleMode}) {
    const [animOK, setAnimOK] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [docHeight, setDocHeight] = useState(0);

    function handleMenuOpen() {
        if(!menuOpen) {
            setDocHeight(window.document.body.offsetHeight - 100);
        }
        setMenuOpen(!menuOpen);
    }

    function menuClose() {
        setMenuOpen(false);
    }

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

    useEffect(() => {
        window.addEventListener('resize', menuClose);
        return () => {
            window.removeEventListener('resize', menuClose);
        }
    },[]);

    return(
        <header id={styles.header} className="global_paddingX">

            <div>
                <Link href="/"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 50"><path d="M23.91,37.8a6.82,6.82,0,0,0-2.48-2.67,17.28,17.28,0,0,1-3.44-4c-2.16-2.93-4.57-5.68-6.75-8.63-.66-.93-1.49.11-1.76.75a4,4,0,0,0,.11,3.42C11.66,29.43,13.93,32,16,34.79a36.93,36.93,0,0,0,2.94,3.79c.75.79,2.47,1.59,2.91,2.56s1.15,1,1.74.13A3.86,3.86,0,0,0,23.91,37.8Z"/><path d="M11.47,30.44c.19,1.1.65,4.69.65,4.8.52,4.13-1.68,1.81-2.25,1.36l-.07-.07c-1.06-1.2-1.56-3.34-2.14-4.8-1-2.8-1-6-1.95-8.78-.13-.41-.5-2.15-.57-2.67-.21-1.4-.67-2.73-1-4.09s-.32-2.86-.71-4.26c-.2-.78-.5-1.51-.73-2.24a14.71,14.71,0,0,0,1.51.6c1.17.54,2.46.71,3.58,1.27A15.16,15.16,0,0,1,11,13.72a7.42,7.42,0,0,1,2.27,2.73c0-.06-.07.26-.21.56a15,15,0,0,1-1,1.83,4.09,4.09,0,0,0-.32,3.49c.39.86,1.22,1.07,1.74.12,1.84-3.16,3.4-6.78,1.43-10.28a13.7,13.7,0,0,0-4-4.2A15.42,15.42,0,0,0,7.87,6.33a27.41,27.41,0,0,1-2.94-1C3.37,4.59,2,4.35.9,6a7,7,0,0,0-.74,5.1c.28,1.59,1.06,3.06,1.29,4.65.32,2.3,2.13,4.39,2.45,6.69.07.5,1,2.93,1.17,3.66,1,3,1,6.35,2.23,9.32.52,1.33.39,2.56,1.35,3.7s1.81,2.43,2.85,3.53A.86.86,0,0,0,13,42.36c1.35-2.56,1.17-5,.89-7.74C13.84,34,11.29,29.41,11.47,30.44Z"/><path d="M44.4,46.35c-.39-3.13-2.55-5.6-3.58-8.53A79.25,79.25,0,0,1,38.34,27a1.66,1.66,0,0,0-.76-1.2,3.68,3.68,0,0,0,.07-.73c.05-.67.07-2.5-1-2.56s-1.42,1.76-1.44,2.36c0-.1.21-.53-.07.2-.11.26-.25.51-.39.77a8.77,8.77,0,0,1-1.31,1.81,1.87,1.87,0,0,1-2.59.47c-1.56-1.16-1.74-3.89-2.27-5.55-.32-1-1.22-.9-1.75-.13a4.27,4.27,0,0,0-.32,3.49c.67,2.09,1.31,7,4.55,7.49,1.88.3,3.19-1.23,4.15-2.5.27-.41.57-.79.85-1.22A102,102,0,0,0,38.41,40a20.43,20.43,0,0,0,1.81,4.26,11.87,11.87,0,0,1,1.84,4.43c.11.8.73,1.71,1.6,1S44.49,47.31,44.4,46.35Z"/><path d="M109,14.86a17.3,17.3,0,0,1-3.86-2.2c-.85-.56-2.32-1.59-3.44-1.63s-2.09,1.27-2.59,2c-.76,1-1.49,2.46-2.87,2.69s-2-1-3.26-1.05a17,17,0,0,0-4.61.84,7,7,0,0,0-3.37,2,14.52,14.52,0,0,0-1,1.42c-.5.69-1,.75-1.74,1.14-1.1.56-2.53,2.56-3.9,2.3s-1.22-2-2.92-1.1a39.13,39.13,0,0,1-8.65,3.06c-3,.73-6.1,1.4-8.58,3.29-1.67,1.27-4.4,3.86-6.54,1.6-.92-1-1.31-2.63-1.81-3.83-.78-1.77-1.61-3.49-2.45-5.23A44,44,0,0,1,44,8.57c-.14-.77-.71-1.72-1.61-1s-1,2.43-.73,3.34a58.93,58.93,0,0,0,2.73,10.35c1.28,3.23,3,6.33,4.34,9.51,1,2.39,2.38,4.39,5.5,4,2.78-.31,4.36-2.91,6.82-4C64,29.47,67.39,29,70.48,28a23,23,0,0,0,4.66-1.7c.46-.26.57-.5,1-.32.67.3.92,1.07,1.84,1.2,1.56.2,2.87-1.16,4-2s2.39-1.09,3.3-2.39a5.67,5.67,0,0,1,3.4-2.6c1.17-.32,3.51-1.08,4.61-.56,1.38.62,2.34,1.36,3.9.54s2.2-2.09,3.17-3.3c.59-.73.8-1.09,1.63-.79a10.26,10.26,0,0,1,2.18,1.2,17.44,17.44,0,0,0,4.49,2.44C109.9,20.26,110.77,15.46,109,14.86Z"/><path d="M80.78,1.51C80.72,1.1,80.14-.42,79,.11A69.34,69.34,0,0,1,72,2.74c-1.74.62-1.23,4.73.72,4a60.38,60.38,0,0,0,7.06-2.62A2.29,2.29,0,0,0,80.78,1.51Z"/></svg></Link>
            </div>

            <div className={menuOpen ? styles.menu_is_open : ""} onClick={() => menuClose()}>
                <ul>
                    <li><Link href="/">Accueil</Link></li>
                    <li><Link href="/#biographie">Biographie</Link></li>
                    <li><Link href="/#expositions">Expositions</Link></li>
                    <li><Link href="/#galeries">Galeries</Link></li>
                    <li><Link href="/#contact">Contact</Link></li>
                </ul>
            </div>

            <span id={styles.menu_curtain} className={menuOpen ? styles.curtain_is_open : ""} onClick={() => menuClose()} style={{ height: docHeight }}/>

            <div id={styles.menu_burger} onClick={() => handleMenuOpen()}>
                <span></span>
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