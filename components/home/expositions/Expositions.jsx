import Image from 'next/image'
import styles from './expositions.module.css'
import TitleSection from '../../title-section/TitleSection'
import ch from '../../../assets/images/home/ch_portrait.png'

export default function Expositions() {
  return (
    <section id={styles.expositions}>
        <div className="global_paddingX wrapper">

            <TitleSection title={"Expositions"} text={"CARRIERE"} image={ch} titleColor="--primary-typo" textColor="--ebony-clay"/>


        </div>
    </section>
  )
}