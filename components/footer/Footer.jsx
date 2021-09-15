import styles from './footer.module.css'
import Link from 'next/link'

export default function Footer() {
    return(
        <footer id={styles.footer} className="global_paddingX">
            <div>Sven Rybin</div>
            <div>
                <ul>
                    <li><Link href="/">Accueil</Link></li>
                    <li><Link href="/#biographie">Biographie</Link></li>
                    <li><Link href="/#expositions">Expositions</Link></li>
                    <li><Link href="/#galeries">Galeries</Link></li>
                    <li><Link href="/#contact">Contact</Link></li>
                </ul>
            </div>
            <div>
                <span>Développer par <a href="https://david-oeslick.fr" target="_blank" rel="noreferrer">David Oeslick</a> et designer par <a href="https://aurore-graphique.fr" target="_blank" rel="noreferrer">Aurore Graphique</a>. Copyright 2021.</span>
            </div>
        </footer>
    );
}