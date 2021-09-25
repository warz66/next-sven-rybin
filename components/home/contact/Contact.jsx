import styles from "./contact.module.css"
import Image from 'next/image'
import { useContext } from 'react'
import { ModeContext }from '../../../pages/_app'
import TitleSection from "../../title-section/TitleSection"
import imgPortrait from '../../../assets/images/home/contact_portrait.jpg'
import Form from "./form/Form"
import main_e from '../../../assets/images/home/main_ebony.svg'
import main_mg from '../../../assets/images/home/main_mongoose.svg'

export default function Contact() {
    const mode = useContext(ModeContext);
    return (
        <section id="contact" className={styles.contact}>
            <div className="global_paddingX wrapper">

            <TitleSection title="Contact" text="FONDATION SVEN RYBIN" image={mode ? main_e : main_mg} titleColor="--primary-typo" textColor="--secondary-typo"/>

            <div className={styles.main_content}>
                <div id={styles.contact_img}>
                    <Image priority={true} layout="responsive" src={imgPortrait} alt="Tableau portrait joueuse d'echec de 1983"/>
                </div>
                <div>
                    <h3>FONDATION</h3>
                    <p>
                        <span>E-mail: bernard.oeslick@wanadoo.fr</span><br/>
                        <span>Tel: 06.01.02.03.04</span>
                    </p>
                    <p>Veniam eaque autem eveniet debitis molestiae ducimus incidunt magnam quae et nemo culpa cum quasi expedita, ipsum minus natus ipsa odit dolore.</p>
                    <Form/>
                </div>
                <div>
                    <span>Merci de votre visite.</span>
                </div>
            </div>

            </div>
        </section>
    );
} 