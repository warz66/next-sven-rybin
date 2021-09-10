import styles from "./contact.module.css"
import Image from 'next/image'
import TitleSection from "../../title-section/TitleSection"
import ch from '../../../assets/images/home/ch_portrait.png'
import imgPortrait from '../../../assets/images/home/contact_portrait.jpg'

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

                </div>
            </div>

            </div>
        </section>
    );
} 