import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Cosmique() {
    const [galerie, setGalerie] = useState();

    function handleGalerie($data) {
        setGalerie($data);
    }

    useEffect(() => {
        axios.get("https://90.118.74.20:8000/api/galerie/svenrybin").then(response => {handleGalerie(response.data);console.log(response)});
    }, []);

    return (
        <>
            <h1>Galerie Cosmique</h1>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
            {galerie && galerie.images.map((image) =>
                <Image
                    src={image.pathUrlCache} // Route of the image file
                    layout={'fill'}
                    alt="Your Name"
                    objectFit={'contain'}
                />
            )}
            <div style={{ maxWidth : "1000px", height: "600px", position: "relative" }}>
                <Image
                    src="http://localhost:80/img/indatabase/galerie/content/61132f2d13f90_adwaita-wallpaper.jpeg" // Route of the image file
                    layout={'fill'}
                    alt="Your Name"
                    objectFit={'contain'}
                />
            </div>
        </>
    );
    
}