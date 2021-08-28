import styles from './footer.module.css'

export default function Footer() {
    return(
        <footer id={styles.footer}>
            <div>Sven Rybin</div>
            <div>
                <ul>
                    <li>Accueil</li>
                    <li>Biographie</li>
                    <li>Galeries</li>
                    <li>Contact</li>
                </ul>
            </div>
            <div>
                <span>Copyright</span>
            </div>
        </footer>
    );
}