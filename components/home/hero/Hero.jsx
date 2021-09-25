import Image from 'next/image'
import { useContext } from 'react'
import styles from './hero.module.css'
import { ModeContext }from '../../../pages/_app'
import heroImg from '../../../assets/images/home/hero.jpg'
import fb_e from '../../../assets/images/home/femme_au_ballon_ebony.svg'
import fb_mg from '../../../assets/images/home/femme_au_ballon_mongoose.svg'

export default function Hero() {
    const mode = useContext(ModeContext);
    return (
    <section id="hero" className={styles.hero}>
        <div id={styles.wrapper_hero} className="wrapper global_paddingX">
            <div>
                <h1>Sven Rybin</h1>
                <span>Artiste Peintre</span>
                <div id={styles.wrapper_img_text}>
                    <Image priority={true} layout="fixed" width={190} height={240} src={mode ? fb_e : fb_mg} alt="Tableau DANSANDS FLOMMOT de 1970"/>
                </div>
            </div>
            <div>
                <Image priority={true} src={heroImg} layout="responsive" alt="Tableau cosmique présentation Sven Rybin"/>
            </div>
        </div>
    </section>
    )
}