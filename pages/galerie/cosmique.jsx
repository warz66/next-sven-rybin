import Link from 'next/link'
import Image from 'next/image'
import styles from './Cosmique.module.css'
import { useEffect, useState, useRef, useReducer } from 'react'
import axios from 'axios'
import imagesLoaded from 'imagesloaded'

const initialState = {
    galeries: false,
    galerie: false,
    moyenne: 0,
    max: 0,
    min: 0,
    gap: 0
};
  
function reducer(state, action) {

    function calcSpecGalerie(galerie) {
        let dataGalerie = new Object();
        let images = galerie.images;
        let arrayWidth = [];
        let sum = 0;
        images.map((image, i) => {
            if (image.tableau.width) {
                arrayWidth[i] = image.tableau.width;
                sum += arrayWidth[i]; 
            }
        });
        dataGalerie.moyenne = sum/arrayWidth.length;
        dataGalerie.min = Math.min(...arrayWidth);
        dataGalerie.max = Math.max(...arrayWidth);
        dataGalerie.gap = ((dataGalerie.min + dataGalerie.max) / 2) - dataGalerie.moyenne;
        dataGalerie.galerie = galerie;
        return dataGalerie;
    }

    switch (action.type) {
        case 'galeries': {
            let dataGalerie;
            action.payload.galeries.map(galerie => {
                if (galerie.slug == action.payload.slug) {
                    dataGalerie = calcSpecGalerie(galerie);
                }
                return;
            })
            console.log(dataGalerie);
            return { ...state, galeries: action.payload.galeries, galerie: dataGalerie.galerie, moyenne: dataGalerie.moyenne, min: dataGalerie.min, max: dataGalerie.max, gap: dataGalerie.gap };
        }
        case 'galerieData': {
            let dataGalerie;
            state.galeries.map(galerie => {
                if (galerie.id == action.payload.galerieId) {
                    dataGalerie = calcSpecGalerie(galerie);
                }
                return;
            });
            return { ...state, galerie: dataGalerie.galerie, moyenne: dataGalerie.moyenne, min: dataGalerie.min, max: dataGalerie.max, gap: dataGalerie.gap };
        }
        default:
            return initialState; 
    }
}

export default function Cosmique({galerieSlug = "similique-molestiae-voluptatum-nihil-dolores-officiis-pariatur-quaerat"}) {
    const [stateGaleries, dispatch] = useReducer(reducer, initialState);
    const [galerieLoaded, setGalerieLoaded] = useState(false);
    const [moduleMasonry, setModuleMasonry] = useState(false);
    const grid = useRef();
    const gridItem = useRef();

    function classNameByWidth(width) {
        width = width + stateGaleries.gap;
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
        if(stateGaleries.galerie && moduleMasonry) {
            setGalerieLoaded(false);
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
            let totalImgs = stateGaleries.galerie.images.length;
            imagesLoaded(`.${styles.grid}`).on('progress', function() {
                count++;
                if(count == totalImgs) {
                    msnry.layout();
                    setGalerieLoaded(true);
                }
            });
        }
    }, [stateGaleries.galerie, moduleMasonry]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/galeries-images?reference=svenrybin").then(response => {dispatch({type: 'galeries', payload: {galeries: response.data['hydra:member'], slug: galerieSlug}});console.log(response)});
        import('masonry-layout').then( data => {setModuleMasonry(data); console.log(data.default)});
        //axios.get("http://90.118.74.20:8000/api/galerie/svenrybin").then(response => {handleGalerie(response.data);console.log(response)});
        //axios.get("http://localhost:8000/api/galerie/similique-molestiae-voluptatum-nihil-dolores-officiis-pariatur-quaerat").then(response => {dispatch({type: 'galerieData', payload: {galerie: response.data}});console.log(response)});
    }, []);

    return (
        <>
            <h1>Galerie Cosmique</h1>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
            {stateGaleries.galeries && <div id={styles.container_select}>
                <select value={stateGaleries.galerie.id} onChange={(e) => dispatch({type: 'galerieData', payload: {galerieId: e.target.value}})}>
                    {stateGaleries.galeries.map(galerie =>
                        <option key={galerie.id} value={galerie.id}>{galerie.title}</option>
                    )}
                </select>
            </div>}
            <div ref={grid} className={galerieLoaded ? styles.grid : styles.grid+' '+styles.are_images_unloaded}>
                <div className={styles.grid_sizer}/>
                {stateGaleries.galerie && stateGaleries.galerie.images.map(image =>
                    <div key={image.id} ref={gridItem} className={styles.grid_item+' '+classNameByWidth(image.tableau.width)}><img className={styles.grid_image} src={image.pathUrlCache} alt="sdfsdf" /></div>
                )}
            </div>
        </>
    );
    
}