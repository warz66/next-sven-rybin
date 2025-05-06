import Image from 'next/image'
import styles from './biographie.module.css'
import Link from 'next/link'
import { useContext } from 'react'
import { ModeContext }from '../../../pages/_app'
import TitleSection from '../../title-section/TitleSection'
import main_e from '../../../assets/images/home/main_ebony.svg'
import main_mg from '../../../assets/images/home/main_mongoose.svg'
import sven from '../../../assets/images/home/svenrybin@2x.png'
import sven2 from '../../../assets/images/home/portrait_rybin.jpg'
import bioImg2 from '../../../assets/images/home/bio_img2.jpg'

export default function Biographie() {
    const mode = useContext(ModeContext);
    return (
        <section id="biographie" className={styles.biographie}>
            <div className="global_paddingX wrapper">

                <TitleSection title={"Biographie"} text={"ARTISTE COSMIQUE"} image={mode ? main_e : main_mg} titleColor="--primary-typo" textColor="--secondary-typo"/>

                <div className={styles.main_content_1}>
                    <div id={styles.portrait_img}>
                        <Image priority={true} layout="responsive" src={sven} alt="Portrait photo noir/blanc de Sven Rybin"/>
                    </div>
                    <div>
                        <p>{"Sven Rybin, est né en 1914 à Stockholm (Suède), il a étudie à l'école de peinture Edward Berggren de 1943 à 1944, mais se considère comme un autodidacte . Au cours de ses longs séjours à Paris entre les années 1940 et 1950 et de ses voyages d'études (Danemark 1946, Corse de 1948 à 49, Espagne et Iles Canaries de 1950 à 51), il étudie l'art dans divers musées et expositions."}</p>
                        <p>{"Inspirée par les phénomènes cosmiques, ses compositions de grand format, ce prêtent à l'invention de formes (art sphérique) et au libre choix des coloris. Il conduira tout de même, parallèlement à son art cosmique, des peintures figuratives (paysages, portraits, natures mortes). De nombreuses compositions majeures à l'huile , au pastel ou à l'aquarelle."}</p>
                        <div>
                            <p>{`Au cours de sa carrière, il recevra de nombreux prix et distinctions. En 1966 le Gouvernement Suédois fera l'acquisition d'une grande toile sphérique cosmique destinée à être reproduite sur l'annuaire publié par l'institut de recherche scientifique suédois "Svensk Naturvetenskap". En 1967 il est sélectionné pour figurer dans le Who's Who in Europe et la même année il sera grand finaliste de la section "composition" au 18eme Grand Prix International de Peinture de Deauville.`}</p>
                            <div>
                                <Image priority={true} layout="responsive" src={sven2} alt="Portrait dessin de Sven Rybin"/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span>{"Rybin nous quittera le 28 mai 2012 à Antibes, France."}</span>
                        <a href="">{"Télécharger la Biographie de S.Rybin/ PDF"}</a>
                    </div>
                </div>

                <div className={styles.main_content_2}>
                    <div>
                        <Image priority={true} layout="responsive" src={bioImg2} alt="Tableau cosmique de 1967"/>
                    </div>
                    <div>
                        {`Il reçoit le prix de la Fondation Taylor à Paris en 1979 ainsi que le Prix d'Excellence "Grand Prix International de Peinture de la Riviera Côtes d'Azur" en 1990.`}
                    </div>
                </div>

                <div>
                    <Link href="/galerie">
                        <div className={`btn ${styles.btn_bio}`}>
                            GALERIES
                        </div>
                    </Link>
                </div>

            </div>
        </section>
    )
}