import styles from "./contact.module.css"
import Image from 'next/image'
import TitleSection from "../../title-section/TitleSection"
import ch from '../../../assets/images/home/ch_portrait.png'
import imgPortrait from '../../../assets/images/home/contact_portrait.jpg'
import Form from "./form/Form"

export default function Contact() {
    return (
        <section id={styles.contact}>
            <div className="global_paddingX wrapper">

            <TitleSection title="Contact" text="FONDATION SVEN RYBIN" image={ch} titleColor="--primary-typo" textColor="--secondary-typo"/>

            <div className={styles.main_content}>
                <div id={styles.contact_img}>
                    <Image layout="responsive" src={imgPortrait} alt=""/>
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