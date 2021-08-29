import styles from './footer.module.css'
import Link from 'next/link'

export default function Footer() {
    return(
        <footer id={styles.footer} className="global_padding">
            <div>Sven Rybin</div>
            <div>
                <ul>
                    <li><Link href="/">Accueil</Link></li>
                    <li>Biographie</li>
                    <li><Link href="/galerie">Galeries</Link></li>
                    <li>Contact</li>
                </ul>
            </div>
            <div>
                <span>Développer par <a href="https://david-oeslick.fr" target="_blank">David Oeslick</a> et designer par <a href="https://aurore-graphique.fr" target="_blank">Aurore Graphique</a>. Copyright 2021.</span>
            </div>
        </footer>
    );
}