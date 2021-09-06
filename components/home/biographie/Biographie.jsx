import Image from 'next/image'
import styles from './biographie.module.css'
import ch from '../../../assets/images/home/ch_portrait.png'
import sven from '../../../assets/images/home/svenrybin@2x.png'
import sven2 from '../../../assets/images/home/svenrybin.png'

export default function Biographie() {
  return (
    <section id={styles.biographie}>
        <div className="global_padding wrapper">

            <div className={styles.title_section}>
                <span>ARTISTE COSMIQUE</span>
                <h2 className="h2_home">Biographie</h2>
                <div>
                    <Image layout="fixed" width={150} height={190} src={ch} alt=""/>
                </div>
            </div>

            <div className={styles.main_content}>
                <div id={styles.portrait_img}>
                    <Image layout="responsive" src={sven} alt=""/>
                </div>
                <div>
                    <p>Sven Rybin, est né en 1914 à Stockholm (Suède), il a étudie à l'école de peinture Edward Berggren de 1943 à 1944, mais se considère comme un autodidacte . Au cours de ses longs séjours à Paris entre les années 1940 et 1950 et de ses voyages d'études (Danemark 1946, Corse de 1948 à 49, Espagne et Iles Canaries de 1950 à 51), il étudie l'art dans divers musées et expositions.</p>
                    <p>Inspirée par les phénomènes cosmiques, ses compositions de grand format, ce prêtent à l'invention de formes (art sphérique) et au libre choix des coloris. Il conduira tout de même, parallèlement à son art cosmique, des peintures figuratives (paysages, portraits, natures mortes). De nombreuses compositions majeures à l'huile , au pastel ou à l'aquarelle.</p>
                    <div>
                        <p>Au cours de sa carrière, il recevra de nombreux prix et distinctions. En 1966 le Gouvernement Suédois fera l'acquisition d'une grande toile sphérique cosmique destinée à être reproduite sur l'annuaire publié par l'institut de recherche scientifique suédois "Svensk Naturvetenskap". En 1967 il est sélectionné pour figurer dans le Who's Who in Europe et la même année il sera grand finaliste de la section "composition" au 18eme Grand Prix International de Peinture de Deauville.</p>
                        <div>
                            <Image layout="responsive" src={sven2} alt=""/>
                        </div>
                    </div>
                </div>
                <div>
                    <span>Rybin nous quittera le 28 mai 2012 à Antibes, France.</span>
                    <a href="">Télécharger la Biographie de S.Rybin/ PDF</a>
                </div>
            </div>

        </div>
    </section>
  )
}