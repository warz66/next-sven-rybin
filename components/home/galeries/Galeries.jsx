import styles from './galeries.module.css'
import TitleSection from '../../title-section/TitleSection'
import Galerie from './galerie/Galerie';
import ch from '../../../assets/images/home/ch_portrait.png'
import cosmiqueImg from '../../../assets/images/home/galerie_cover_cosmique.jpg'
import paysageImg from '../../../assets/images/home/galerie_cover_paysage.jpg'
import natureMorteImg from '../../../assets/images/home/galerie_cover_nature_morte.jpg'
import nuImg from '../../../assets/images/home/galerie_cover_nu.jpg'
import portraitImg from '../../../assets/images/home/galerie_cover_portrait.jpg'

export default function Galeries() {
    return (
        <section id={styles.galeries}>
            <div className="global_paddingX wrapper">

                <TitleSection title="Les Galeries" text="SVEN RYBIN" image={ch} titleColor="--primary-typo" textColor="--secondary-typo"/>

                <div id={styles.galeries_content}>
                    <Galerie 
                        title="Cosmique" 
                        text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et"
                        srcImg={cosmiqueImg}
                        galerieId={process.env.NEXT_PUBLIC_GALERIE_COSMIQUE}
                    />

                    <Galerie 
                        reverse={true}
                        title="Paysage" 
                        text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et"
                        srcImg={paysageImg}
                        galerieId={process.env.NEXT_PUBLIC_GALERIE_PAYSAGE}
                    />

                    <Galerie 
                        title="Nature Morte" 
                        text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et"
                        srcImg={natureMorteImg}
                        galerieId={process.env.NEXT_PUBLIC_GALERIE_NATURE_MORTE}
                    />

                    <Galerie 
                        reverse={true}
                        title="Nu" 
                        text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et"
                        srcImg={nuImg}
                        galerieId={process.env.NEXT_PUBLIC_GALERIE_NU}
                    />

                    <Galerie 
                        title="Portrait" 
                        text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et"
                        srcImg={portraitImg}
                        galerieId={process.env.NEXT_PUBLIC_GALERIE_PORTRAIT}
                    />
                </div>
            </div>
        </section>
    );
}