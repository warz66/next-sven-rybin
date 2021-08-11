import Link from 'next/link'
import Image from 'next/image'
import styles from './Cosmique.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Masonry from 'react-masonry-css'

export default function Cosmique() {
    const [galerie, setGalerie] = useState();

    function handleGalerie($data) {
        setGalerie($data);
    }

    const breakpointColumnsObj = {
        default: 5,
        1500: 5,
        1300: 4,
        1000: 3,
        800: 2,
        500: 1
      };

    var images=null;
    if(galerie) {
        images = galerie.images.map((image, index) => {
                    return <div key={index} style={{ position: "relative" }}>
                                {/*<Image
                                    src={image.pathUrl} // Route of the image file
                                    width={image.tableau.width}
                                    height={image.tableau.height}
                                    alt="Your Name"
                                />*/}
                                <img src={image.pathUrlCache} alt="sdfsdf"></img>
                            </div>
        });
    }

    useEffect(() => {
        axios.get("http://90.118.74.20:8000/api/galerie/svenrybin").then(response => {handleGalerie(response.data);console.log(response)});
        //axios.get("http://localhost:8000/api/galerie/svenrybin").then(response => {handleGalerie(response.data);console.log(response)});
    }, []);

    return (
        <>
            <h1>Galerie Cosmique</h1>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
            {<Masonry
                breakpointCols={breakpointColumnsObj}
                className={styles.masonry_grid}
                columnClassName={styles.my_masonry_grid_column}>
                {images}
            </Masonry>}
            {/*galerie && galerie.images.map((image, index) =>
                <div key={index} style={{ maxWidth : "800px", maxHeight: "600px", height : "400px", position: "relative" }}>
                    <Image
                        src={image.pathUrl} // Route of the image file
                        layout={'fill'}
                        alt="Your Name"
                        objectFit={'contain'}
                    />
                </div>
            )*/}
            {/*<div style={{ maxWidth : "1000px", height: "600px", position: "relative" }}>
                <Image
                    src="http://localhost:80/img/indatabase/galerie/content/61132f2d13f90_adwaita-wallpaper.jpeg" // Route of the image file
                    layout={'fill'}
                    alt="Your Name"
                    objectFit={'contain'}
                />
            </div>*/}
        </>
    );
    
}