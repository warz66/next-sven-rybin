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
                    src="https://90.118.74.20:8000/img/indatabase/galerie/cover/6111aa84ef06b_38.jpg" // Route of the image file
                    layout={'fill'}
                    alt="Your Name"
                    objectFit={'contain'}
                />
            </div>
        </>
    );
    
}