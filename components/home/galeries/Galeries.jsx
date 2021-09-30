import styles from './galeries.module.css'
import { useContext } from 'react'
import { ModeContext }from '../../../pages/_app'
import TitleSection from '../../title-section/TitleSection'
import Galerie from './galerie/Galerie'
import cosmiqueImg from '../../../assets/images/home/galerie_cover_cosmique.jpg'
import paysageImg from '../../../assets/images/home/galerie_cover_paysage.jpg'
import natureMorteImg from '../../../assets/images/home/galerie_cover_nature_morte.jpg'
import nuImg from '../../../assets/images/home/galerie_cover_nu.jpg'
import portraitImg from '../../../assets/images/home/galerie_cover_portrait.jpg'
import bt_e from '../../../assets/images/home/bateau_ebony.svg'
import bt_mg from '../../../assets/images/home/bateau_mongoose.svg'

export default function Galeries() {
    const mode = useContext(ModeContext);
    return (
        <section id="galeries" className={styles.galeries}>
            <div className="global_paddingX wrapper">

                <TitleSection title="Les Galeries" text="SVEN RYBIN" image={mode ? bt_e : bt_mg} titleColor="--primary-typo" textColor="--secondary-typo"/>

                <div id={styles.galeries_content}>
                    <Galerie 
                        title="Cosmique" 
                        text={`L'art cosmique... Où quand "l'esprit contemplatif regarde le ciel différemment". S.RYBIN`}
                        srcImg={cosmiqueImg}
                        alt="Tableau cosmique RIGNEBULOSA de 1968"
                        galerieId={process.env.NEXT_PUBLIC_GALERIE_COSMIQUE}
                    />

                    <Galerie 
                        reverse={true}
                        title="Paysage"
                        text={`Le Paysage dans les œuvres de Rybin, tend moins à être reproduit qu'à être interprété, de manière originale, propre à l'artiste.`}
                        srcImg={paysageImg}
                        alt="Tableau ULYSSE de 1976"
                        galerieId={process.env.NEXT_PUBLIC_GALERIE_PAYSAGE}
                    />

                    <Galerie 
                        title="Nature Morte" 
                        text={`La nature morte, vue selon l'artiste. Représentation d'une composition d’objets ou de choses inanimés mis en scène.`}
                        srcImg={natureMorteImg}
                        alt="Tableau nature morte de 1959"
                        galerieId={process.env.NEXT_PUBLIC_GALERIE_NATURE_MORTE}
                    />

                    <Galerie 
                        reverse={true}
                        title="Nu" 
                        text={`Les nus de Rybin démontrent l’harmonie et la distorsion des corps dans une esthétique singulière.`}
                        srcImg={nuImg}
                        alt="Tableau de nu de 1982"
                        galerieId={process.env.NEXT_PUBLIC_GALERIE_NU}
                    />

                    <Galerie 
                        title="Portrait" 
                        text={`Dans cette discipline, l'artiste représente plus un caractère, une personnalité, un sentiment, au-delà de la simple apparence de ses modèles.`}
                        srcImg={portraitImg}
                        alt="Tableau portrait de 1958"
                        galerieId={process.env.NEXT_PUBLIC_GALERIE_PORTRAIT}
                    />
                </div>
            </div>
        </section>
    );
}