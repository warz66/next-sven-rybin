import Image from 'next/image'
import styles from './hero.module.css'
import heroImg from '../../../assets/images/home/hero.jpg'
import ch from '../../../assets/images/home/ch_portrait.png'

export default function Hero() {
  return (
    <section id={styles.hero}>
        <div id={styles.wrapper_hero} className="wrapper global_paddingX">
            <div>
                <h1>Sven Rybin</h1>
                <span>Artiste Peintre</span>
                <div id={styles.wrapper_img_text}>
                    <Image layout="fixed" width={190} height={240} src={ch} alt=""/>
                </div>
            </div>
            <div>
                <Image src={heroImg} layout="responsive" alt="Tableau cosmique présentation Sven Rybin"/>
            </div>
        </div>
    </section>
  )
}