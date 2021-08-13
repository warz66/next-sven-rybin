import Link from 'next/link'
import Image from 'next/image'
import styles from './Cosmique.module.css'
import { useEffect, useState, useRef, useReducer } from 'react'
import axios from 'axios'
import imagesLoaded from 'imagesloaded'

const initialState = {
    galerie: false,
    moyenne: 0,
    max: 0,
    min: 0,
    gap: 0
};
  
function reducer(state, action) {
    switch (action.type) {
        case 'galerieData':
            let images = action.payload.galerie.images;
            let arrayWidth = [];
            let sum = 0;
            images.map((image, i) => {
                if (image.tableau.width) {
                    arrayWidth[i] = image.tableau.width;
                    sum += arrayWidth[i]; 
                }
            });
            let moyenne = sum/arrayWidth.length;
            let min = Math.min(...arrayWidth);
            let max = Math.max(...arrayWidth);
            let gap = ((min + max) / 2) - moyenne;
            return { galerie: action.payload.galerie, moyenne: moyenne, min: min, max: max, gap: gap };
        default:
            return initialState;    
    }
}

export default function Cosmique() {
    const [stateGalerie, dispatch] = useReducer(reducer, initialState);
    //const [galerie, setGalerie] = useState(false);
    const [galerieLoaded, setGalerieLoaded] = useState(false);
    const [moduleMasonry, setModuleMasonry] = useState(false);
    //const [msnry, setMsnry] = useState();
    const grid = useRef();
    const gridItem = useRef();

    function classNameByWidth(width) {
        width = width + stateGalerie.gap;
        if (width >= 400 && width < 600) {
            return styles.grid_item__width2;
        }
        if (width >= 600 && width < 800) {
            return styles.grid_item__width3;
        }
        if (width >= 800) {
            return styles.grid_item__width4;
        }
        /*if (width >= 840) {
            return styles.grid_item__width5;
        }*/
        /*if (width >= 360 && width < 520) {
            return styles.grid_item__width2;
        }*/
        /*if (width >= 520 && width < 680) {
            return styles.grid_item__width3;
        }*/
    }     

    useEffect(() => {
        if(stateGalerie.galerie && moduleMasonry) {
            let Masonry = moduleMasonry.default;
            let msnry = new Masonry(`.${styles.grid}`, {
                columnWidth: `.${styles.grid_sizer}`,
                //columnWidth: '.'+styles.grid_sizer,
                itemSelector: 'none',
                //horizontalOrder: false,
                itemSelector: '.'+styles.grid_item,
                gutter: 20,
                percentPosition: true,
                //columnWidth: 300,
                visibleStyle: { transform: 'translateY(0)', opacity: 1 },
                hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
            });

            let count = 0;
            let totalImgs = stateGalerie.galerie.images.length;
            imagesLoaded(`.${styles.grid}`).on('progress', function() {
                count++;
                if(count == totalImgs) {
                    msnry.layout();
                    setGalerieLoaded(true);
                }
                //document.getElementsByClassName(styles.grid).classList.remove(styles.are_images_unloaded)
                //$grid.removeClass('are-images-unloaded');
                //msnry.option({ itemSelector: '.'+styles.grid_item});
                //var items = document.querySelectorAll('.'+styles.grid_item);
                //msnry.appended(items);
                //msnry.reloadItems(items);
                //msnry.layout();
            });
            console.log(stateGalerie);
        }
    }, [stateGalerie.galerie, moduleMasonry]);

    useEffect(() => {
        import('masonry-layout').then( data => {setModuleMasonry(data); console.log(data.default)});
        //axios.get("http://90.118.74.20:8000/api/galerie/svenrybin").then(response => {handleGalerie(response.data);console.log(response)});
        axios.get("http://localhost:8000/api/galerie/similique-molestiae-voluptatum-nihil-dolores-officiis-pariatur-quaerat").then(response => {dispatch({type: 'galerieData', payload: {galerie: response.data}});console.log(response)});
    }, []);

    return (
        <>
            <h1>Galerie Cosmique</h1>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
            <div ref={grid} className={galerieLoaded ? styles.grid : styles.grid+' '+styles.are_images_unloaded}>
                <div className={styles.grid_sizer}/>
                {stateGalerie.galerie && stateGalerie.galerie.images.map((image, index) =>
                    <div key={index} ref={gridItem} className={styles.grid_item+' '+classNameByWidth(image.tableau.width)}><img className={styles.grid_image} src={image.pathUrlCache} alt="sdfsdf" /></div>
                )}
            </div>
        </>
    );
    
}