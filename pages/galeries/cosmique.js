import Link from 'next/link'
import Image from 'next/image'

export default function Cosmique() {

    const src = "https://localhost:8000/img/indatabase/galerie/cover/6111aa84ef06b_38.jpg";
    return (
        <>
            <h1>Galerie Cosmique</h1>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
            <div style={{ maxWidth : "600px", height: "600px", position: "relative" }}>
                <Image
                    src="https://90.118.74.20:8000/img/indatabase/galerie/content/61132f2d13f90_adwaita-wallpaper.jpeg" // Route of the image file
                    width={500}
                    height={250}
                    alt="Your Name"
                    
                />
            </div>
        </>
    );
    
}