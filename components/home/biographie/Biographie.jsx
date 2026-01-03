import Image from 'next/image'
import styles from './biographie.module.css'
import Link from 'next/link'
import { useContext } from 'react'
import { ModeContext } from '../../../pages/_app'
import TitleSection from '../../title-section/TitleSection'
import main_e from '../../../assets/images/home/main_ebony.svg'
import main_mg from '../../../assets/images/home/main_mongoose.svg'
import sven from '../../../assets/images/home/svenrybin@2x.png'
import sven2 from '../../../assets/images/home/portrait_rybin.jpg'
import bioImg2 from '../../../assets/images/home/bio_img2.jpg'
import bioImg3 from "../../../assets/images/home/bio_sven_rybin_tableau.jpg"
import bioImg4 from '../../../assets/images/home/NILS EDLING PROFESSEUR COLLECTIONNEUR ET AMI DE SVEN RYBIN_2.jpg'
import bioImg5 from '../../../assets/images/home/NILS EDLING PROFESSEUR COLLECTIONNEUR ET AMI DE SVEN RYBIN_3.jpg'
import imageFull from "../../../assets/images/home/tableau-principal-grand-rybin.jpg"

export default function Biographie() {
	const mode = useContext(ModeContext);

	return (
		<section id="biographie" className={styles.biographie}>
			<div className="global_paddingX wrapper">

				<TitleSection
					title={"Biographie"}
					text={"ARTISTE COSMIQUE"}
					image={mode ? main_e : main_mg}
					titleColor="--primary-typo"
					textColor="--secondary-typo"
				/>

				<div className={styles.main_content_1}>
					<div id={styles.portrait_img}>
						<Image priority src={sven} alt="Portrait photo noir/blanc de Sven Rybin" />
					</div>

					<div>
						<p>{"Sven Rybin, artiste peintre suédois, naît en juin 1914 à Stockholm (Suède) et décède en 2012 à Antibes (France)."}</p>

						<p>{"À sa naissance, sa mère n’a que 20 ans et bien que reconnu officiellement par son père, celui-ci ne semble guère s’être occupé de lui. Le couple n’est pas marié et sa mère, obligée de travailler et seule, place son fils à l’âge de 3 ans dans un foyer pour enfants de l’armée du salut."}</p>

						<p>
							{"À cette époque, avoir un enfant hors mariage est une honte et sa mère cache l’existence de cet enfant à ses amis et à sa famille très religieuse."}<br />
							{"Elle lui rend visite de temps en temps, c’est apparemment une femme intelligente car elle apprend à son fils à jouer aux échecs."}<br />
							{"Elle tombe malade et meurt de la tuberculose à l’âge de 35 ans. Son fils de 15 ans est désormais orphelin. Il n’a qu’un désir : quitter le foyer où il s’occupe des chevaux et de diverses tâches dans la ferme de l’armée du salut."}
						</p>

						<p>{"La chance se présente un an après en la personne d’un maître artisan, peintre en bâtiment, qui, compatissant pour ce jeune homme orphelin, l’engage pour 4 années d’apprentissage qui le sauveront de la misère pendant la grande crise mondiale des années 30."}</p>

						<p>{"Mais ceci n’est qu’une étape. Après des études d’art dramatique, Sven Rybin intègre en 1942-43 l’académie de peinture Edward Berggren à Stockholm où il reçoit un enseignement classique avec des bases solides."}</p>

						<p>
							{"Les années de guerre passées, il aspire à voyager en Europe pour parfaire ses études : un an au Danemark, puis cap vers la France, à Paris puis en Corse où il séjourne en 1948-49."}<br />
							{"Il loge chez l’habitant dans un hameau, Vistale, tout proche des spectaculaires calanques de Piana qui lui inspirent des paysages aux tonalités flamboyantes, ainsi que la toile de très grandes dimensions « Le Temps et l’Espace », révélatrice de son intérêt pour le cosmos."}
						</p>

						<p>{"En 1949, ses œuvres corses donneront matière à sa toute première exposition à Stockholm où il fera la connaissance de son futur mécène et fidèle ami, le Professeur de médecine Nils Edling qui le soutiendra toujours dans ses moments difficiles."}</p>

						<p>{"Mais il continue ses voyages d’étude : il repart en France, continue en Espagne et en rapporte de nombreux dessins des milieux populaires. Il poursuit vers les îles Canaries, alors peu touristiques. Sa peinture change : il abandonne les couleurs vives pour des paysages aux tonalités sombres."}</p>

						<p>{"Il expose à Paris où il réside jusqu'en 1989. Cependant, il n’abandonne pas la Suède : il passe quelques mois à Stockholm dans les quartiers pittoresques de Söder, dans des maisons alors dépourvues de tout confort que la ville loue à des artistes."}</p>

						<p>
							{"L'île de Faro occupe aussi dans sa vie et sa peinture une place toute particulière."}<br />
							{"Il y a vécu pendant la Seconde Guerre mondiale dans des conditions de grande pauvreté, soutenu par la générosité des habitants de l'île à qui il restera toujours fidèle."}<br />
							{"De Faro, il aime sa lumière et sa nature sévère, elles l’inspirent comme elles avaient inspiré avant lui de nombreux peintres."}
						</p>

						<p>{"En 1959, il acquiert une petite maison de bois en mauvais état qu’il restaurera peu à peu. C’est, pour lui, un lieu idéal de création dans le calme et la solitude. Il y habite presque tous les étés pendant 3 ou 4 mois."}</p>

						<p>{"En 1954, il expose à la Maison des Beaux-Arts à Paris ses toutes premières peintures cosmiques ainsi que des dessins à l’encre de Chine non figuratifs qui surprennent et suscitent des moqueries de certains visiteurs."}</p>

						<p>{"À partir de ce moment et sans jamais abandonner la peinture figurative, il approfondit de plus en plus ses œuvres inspirées du cosmos dans des compositions de grands formats aux formes plus élaborées et aux coloris d’une grande diversité."}</p>

						<p>{"Peu à peu, il s’éloigne de Paris et de son air pollué pour la Côte d’Azur, tout d’abord à Cap d’Ail, puis en 1989, il quitte définitivement Paris pour Antibes où il résidera jusqu’à son décès."}</p>

						<p>{"Mais aussi longtemps que sa santé le lui permettra, il retournera chaque été dans sa chère petite « stuga » de Faro où il fêtera ses 80 ans et ses 90 ans en compagnie de ses amis et de sa famille."}</p>

						<p>{"Ses œuvres — aquarelles, pastels, dessins et huiles — sont actuellement entreposées à Menton grâce aux bons soins de son ami Bernard Oeslick."}</p>

						<p>{"Il aimait chanter, réciter des poèmes, il avait des opinions très arrêtées, un caractère entier, beaucoup de charme, un esprit toujours en alerte et des idées plein la tête !"}</p>

						<p><strong>{"Madeleine Rybin"}</strong></p>

						{/*<div>
							<p>
								Au cours de sa carrière, il recevra de nombreux prix et distinctions. En 1966, le Gouvernement suédois fera l'acquisition d'une grande toile sphérique cosmique destinée à être reproduite sur l'annuaire publié par l'institut de recherche scientifique suédois "Svensk Naturvetenskap". En 1967, il est sélectionné pour figurer dans le Who's Who in Europe et la même année il sera grand finaliste de la section "composition" au 18e Grand Prix International de Peinture de Deauville.
							</p>
							<div>
								<Image priority src={sven2} alt="Portrait dessin de Sven Rybin" />
							</div>
						</div>*/}
					</div>

					<div>
						<span>Rybin nous quittera le 28 mai 2012 à Antibes, France.</span><br />
						<a href="/fragment-vie-artiste.pdf" target="_blank" rel="noopener noreferrer">
							Télécharger des documents – fragments d’une vie d’artiste
						</a>
						<div style={{ display: "flex", flexDirection: "column", gap: "40px", marginTop: "50px" }}>
							<div>
								<Image priority src={bioImg3} alt="photo biographique" />
							</div>
							<div>
								<Image priority src={bioImg4} alt="photo biographique" />
							</div>
							<div>
								<Image priority src={bioImg5} alt="photo biographique" />
							</div>
						</div>
					</div>
				</div>

				<div className={styles.image_full}>
					<Image priority layout="responsive" src={imageFull} alt="" />
				</div>

				<div className={styles.main_content_2}>
					<div>
						{`Il reçoit le prix de la Fondation Taylor à Paris en 1979 ainsi que le Prix d'Excellence "Grand Prix International de Peinture de la Riviera Côtes d'Azur" en 1990.`}
					</div>
					<div>
						<Image priority src={bioImg2} alt="Tableau cosmique de 1967" />
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
	);
}
