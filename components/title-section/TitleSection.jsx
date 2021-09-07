import Image from 'next/image'
import styles from './titleSection.module.css'

export default function TitleSection({title, text, image, titleColor, textColor}) {
  return (
        <div className={styles.title_section}>
            <span style={{ color : `var(${textColor})` }}>{text}</span>
            <h2 style={{ color : `var(${titleColor})` }}>{title}</h2>
            <div>
                <Image layout="responsive" src={image} alt=""/>
            </div>
        </div>
  )
}