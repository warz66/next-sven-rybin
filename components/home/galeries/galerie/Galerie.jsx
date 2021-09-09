import styles from './galerie.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Galerie({reverse = false, title, text, srcImg, galerieId, alt}) {
    return(

        <div className={styles.galerie_intro} style={{ flexDirection: reverse ? "row-reverse" : "row" }}>

            <div>
                <Image layout="fill" objectFit="cover" className={'image'} src={srcImg} alt={alt}/>
            </div>

            <div>
                <span>GALERIE</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <Link className={styles.link_galerie} href={{ pathname: '/galerie', query: { id: galerieId } }}>
                    <div style={{ float: reverse ? "left" : "right" }}>
                        <span className={`btn ${styles.btn}`}>Voir la galerie</span>
                    </div>
                </Link>
            </div>

        </div>        

    );
}