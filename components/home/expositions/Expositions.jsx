import Image from 'next/image'
import styles from './expositions.module.css'
import { useContext } from 'react'
import { ModeContext }from '../../../pages/_app'
import TitleSection from '../../title-section/TitleSection'
import forme_e from '../../../assets/images/home/forme_ebony.svg'
import forme_mg from '../../../assets/images/home/forme_mongoose.svg'
import expoImg from '../../../assets/images/home/expo_img1.jpg'
import expoImg2 from '../../../assets/images/home/expo_img2.jpg'

export default function Expositions() {
	const mode = useContext(ModeContext);
	return (
		<section id="expositions" className={styles.expositions}>
			<div className="global_paddingX wrapper">

				<TitleSection title={"Expositions"} text={"CARRIERE"} image={mode ? forme_e : forme_mg} titleColor="--primary-typo" textColor="--secondary-typo"/>

				<div className={styles.main_content}>

					<div>
						<h3>SES PREMIERES EXPOSTIONS</h3>
						<p>{"Il exposera pour la première fois à la galerie d'Art Ekström à Stockholm en 1949 puis à la galerie Palmes (1951 et 1953) à Paris et à Modern Art in Home Environment à Stockholm en 1953. Il participe à une exposition à la galerie de la Maison des Beaux-Arts en 1954 à Paris et l'année suivante dans une exposition organisée par le Centre Culturel de la Cité Universitaire à Paris. Rybin expose à Munich en Allemagne en 1955."}</p>
					</div>

					<div>
						<Image priority={true} layout="responsive" src={expoImg} alt="Tableau cosmique SLAKTA LANTARNOR de 1962"/>
					</div>

					<div>
						{"Ses Collections sont aujourd'hui représentées au musée de Tours, de Pau et de Montparnasse à Paris ainsi qu'à l'institut Tessin Centre Culturel Suédois à Paris, au musée de Gâvie en Suéde, au cercle Suèdois de Paris et également dans des collections privées en Suède, France et Espagne."}
					</div>

					<div>
						<Image priority={true} layout="responsive" src={expoImg2} alt="Tableau de 1980"/>
					</div>

					<div>
						<h3>{"LES SUITES DE SA CARRIERE"}</h3>
						<p>
							{"En Suède, il participe à des expositions de collections organisées par Art Promotion et la Art Guild de Gotland... Avec plusieurs artistes suédois parisiens, il participe à plusieurs expositions au cercle suédois à Paris. Aux côtés de Gunnar Nilsson , Johannes Bruggner et Nils Zetterberg."}<br/><br/>
							{`1957 - Musée de Gävie. Suède et "Les artistes étrangers en France" - Petit Palais.Paris (expo collective)`}<br/>
							{`1958 - "Trois artistes Suèdois" - Foyer des artistes Marc Vaux. Paris (expo collective)`}<br/>
							{"1960 à 1988 - Société des artistes indépendants, Grand Palais. Paris (expo collective)"}<br/>
							{"1965 - Hotel de ville de Corun. Espagne"}<br/>
							{"1967 - Salon international. Paris - Sud Juvisy (expo collective)"}<br/>
							{"1969 - Galerie Henquez St Jaigny. Paris 1972 - Musée Liljevalchs Stockholm. Suède"}<br/>
							{"1977 - Galerie Jaquester. Paris 1978 - Innauguration de la Galerie de Nesles. Paris (expo collective)"}<br/>
							{`1978 à 1980 - Selectionné dans le cadre de "l'action concertée Art-Science" au Palais de la découverte. Paris`}<br/>
							{"1984 - Exposition au Cercle Suèdois. Paris"}<br/>
							{"1987 à 1993 - Nombreuses expositions dans plusieurs villes de la Côte d'Azur."}<br/>
							{"1988 - Salon d'Automne au Grand Palais .Paris (expo collective)"}<br/>
							{"1989 - Exposition Internationala à Orléans (expo collective)"}<br/>
							{"1994 - Exposition au Cercle Suédois. Paris"}
						</p>
					</div>

				</div>

				{/*<div className={styles.main_content_2}>
					<div>
						<Image priority={true} layout="responsive" src={expoImg} alt=""/>
					</div>
					<div>
						<h3>LES SUITES DE SA CARRIERE</h3>
						<p>
							En Suède, il participe à des expositions de collections organisées par Art Promotion et la Art Guild de Gotland... Avec plusieurs artistes suédois parisiens, il participe à plusieurs expositions au cercle suédois à Paris. Aux côtés de Gunnar Nilsson , Johannes Bruggner et Nils Zetterberg.<br/><br/>
							1957 - Musée de Gävie. Suède et "Les artistes étrangers en France" - Petit Palais.Paris (expo collective)<br/>
							1958 - "Trois artistes Suèdois" - Foyer des artistes Marc Vaux. Paris (expo collective)<br/>
							1960 à 1988 - Société des artistes indépendants, Grand Palais. Paris (expo collective)<br/>
							1965 - Hotel de ville de Corun. Espagne<br/>
							1967 - Salon international. Paris - Sud Juvisy (expo collective)<br/>
							1969 - Galerie Henquez St Jaigny. Paris 1972 - Musée Liljevalchs Stockholm. Suède<br/>
							1977 - Galerie Jaquester. Paris 1978 - Innauguration de la Galerie de Nesles. Paris (expo collective)<br/>
							1978 à 1980 - Selectionné dans le cadre de "l'action concertée Art-Science" au Palais de la découverte. Paris<br/>
							1984 - Exposition au Cercle Suèdois. Paris<br/>
							1987 à 1993 - Nombreuses expositions dans plusieurs villes de la Côte d'Azur.<br/>
							1988 - Salon d'Automne au Grand Palais .Paris (expo collective)<br/>
							1989 - Exposition Internationala à Orléans (expo collective)<br/>
							1994 - Exposition au Cercle Suédois. Paris
						</p>
					</div>
				</div>*/}

			</div>
		</section>
	)
}