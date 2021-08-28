import styles from './retourHaut.module.css'
import { useEffect, useState } from 'react';

export default function RetourHaut() {
    const [retourHautVisible, setRetourHautVisible] = useState(false);

    function retourHaut() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    useEffect(() => {
        function handleRetourHautVisible ()  {
            window.onscroll = function() {
                (window.pageYOffset > 1500) ? setRetourHautVisible(true) : setRetourHautVisible(false);
            };
        };
        window.addEventListener('DOMContentLoaded', handleRetourHautVisible());
        return(()=> {
            window.removeEventListener('DOMContentLoaded', handleRetourHautVisible());
        });
    },[]);

    return(
        <span id={styles.btn_retour_haut} className={retourHautVisible ? styles.visible : styles.invisible } onClick={() => retourHaut()}/>
    );
}