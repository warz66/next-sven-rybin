import Link from 'next/link'
//import Image from 'next/image'
import styles from './images.module.css'
import styles2 from '../../components/galerie/galerie-images/galerie_images.module.css'
import { useEffect, useState, useReducer } from 'react'
import axios from 'axios'
import imagesLoaded from 'imagesloaded'
import GalerieImages from '../../components/galerie/galerie-images/GalerieImages'
import FiltreFormGalerie from '../../components/galerie/filtre-form-galerie/FiltreFormGalerie'

const initialState = {
    galeries: false,
    galerie: false,
    totalImages: 0,
    imgsPerPage: 50, // récuperer cette valeur en variable globale
    nbPages: 0,
    galeriesSelect: {},
    galerieSelect: {},
    themes: [],
    theme: '',
    galerieVide: false,
    images: [],
    request: false,
    previousPageLoaded: false,
    galerieLoaded: false,
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
        case 'initGalerie': {
            let id = false;
            let themes = [];
            let theme = 'Tous les thèmes';
            let galeriesSelect = [{value: '0-Tous les thèmes', label: 'Toutes les galeries'}];
            let galerieSelect = {value: '0-Tous les thèmes', label: 'Toutes les galeries'};
            action.payload.galeries.map((galerie, index) => {
                if (galerie.id == action.payload.id) {
                    id = galerie.id;
                    theme = galerie.theme;
                    galerieSelect = { value: galerie.id+'-'+galerie.theme, label: galerie.title }
                }
                if (galerie.theme) {
                    themes[index] = galerie.theme;
                }
                galeriesSelect = [...galeriesSelect, {value: galerie.id+'-'+galerie.theme, label: galerie.title}]
            });
            themes = [...new Set(themes)];
            themes.unshift('Tous les thèmes');
            return { ...state, galeries: action.payload.galeries, galerieSelect: galerieSelect, galeriesSelect: galeriesSelect, themes: themes, theme: theme, request: { id: id, page: 1 } };
        }
        case 'imagesUpdate': 
            if(action.payload.totalItems != 0) {
                let nbPages = Math.ceil(action.payload.totalItems/state.imgsPerPage);
                let images = [...state.images, ...action.payload.images];
                return { ...state, galerieLoaded: false , galerieVide: false, totalImages: action.payload.totalItems, nbPages: nbPages, images: images};
            } else {
                return { ...state, galerieLoaded: true, galerieVide: true }
            }
        /*case 'galerieData': {
            let dataGalerie;
            state.galeries.map(galerie => {
                if (galerie.id == action.payload.galerieId) {
                    dataGalerie = calcSpecGalerie(galerie);
                }
                return;
            });
            return { ...state, galerie: dataGalerie.galerie, moyenne: dataGalerie.moyenne, min: dataGalerie.min, max: dataGalerie.max, gap: dataGalerie.gap };
        }*/
        case 'changeRequest': {
            return { ...state, images: [], request: { id: action.payload.id, theme: action.payload.theme, page: 1, sizeMin: action.payload.sizeMin, sizeMax: action.payload.sizeMax, yearMin: action.payload.yearMin, yearMax: action.payload.yearMax} };
        }
        case 'nextPage':
            console.log(state.request);
            if(state.request.page != state.nbPages) {
                return { ...state, previousPageLoaded: false, request: { ...state.request, page: state.request.page+1 }};
            }
            return {  ...state};
        case 'galerieLoaded': 
            return { ...state, previousPageLoaded: true, galerieLoaded: true };
        case 'galerieUnloaded': 
            return { ...state, previousPageLoaded: false, galerieLoaded: false }
        default:
            return initialState;    
    }
}

export default function Galeries({galerieId = 240}) {
    const [stateGalerie, dispatch] = useReducer(reducer, initialState);
    const [moduleMasonry, setModuleMasonry] = useState(false);
    const [masonry, setMasonry] = useState();
    const [indexLightbox, setIndexLightbox] = useState(0);
    
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
    }    

    function imagesIsUnloaded(index) {
        if(stateGalerie.images.length != stateGalerie.totalImages ) {
            if((index + 1) > (stateGalerie.images.length - stateGalerie.imgsPerPage)) {
                return styles2.are_images_unloaded;
            }
        } else {
            if((index + 1) > ((stateGalerie.nbPages - 1) * stateGalerie.imgsPerPage)) {
                return styles2.are_images_unloaded;
            }
        } 
        return;
    }

    function handleScroll() {
        let bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight/* - 150*/;
        if (bottom && stateGalerie.previousPageLoaded) {
            dispatch({type: 'nextPage'});
        }
    };

    function onAlways() {
        dispatch({ type: 'galerieLoaded'});
    }

    useEffect(() => {
        if(stateGalerie.galerieLoaded && masonry) masonry.layout();
    },[stateGalerie.galerieLoaded]);

    useEffect(() => {
        if(moduleMasonry) {
            let Masonry = moduleMasonry.default;
            let msnry = new Masonry(`.${styles2.grid}`, {
                columnWidth: `.${styles2.grid_sizer}`,
                //columnWidth: '.'+styles.grid_sizer,
                itemSelector: 'none',
                //horizontalOrder: false,
                itemSelector: '.'+styles2.grid_item,
                gutter: `.${styles2.gutter_sizer}`,
                percentPosition: true,
            });
            setMasonry(msnry);
        }
    },[moduleMasonry]);

    useEffect(() => {

        if(stateGalerie.images.length > 0 && masonry) {
            var t0 = performance.now();
            dispatch({ type: 'galerieUnloaded'});

            masonry.reloadItems();
            
            var imgLoad = imagesLoaded(`.${styles2.grid}`);
            imgLoad.on('always', onAlways);
            var t1 = performance.now();
            console.log("L'appel de doSomething a demandé " + (t1 - t0) + " millisecondes.");
            /*return(()=> {
                var t0 = performance.now();
                imgLoad.off('always', onAlways);
                var t1 = performance.now();
                console.log("L'appel de doSomething a demandé " + (t1 - t0) + " millisecondes.");
            });*/
        }   
        
    },[stateGalerie.images]);

    useEffect(() => {
        if((stateGalerie.images.length > 0) && (indexLightbox > (stateGalerie.images.length - 5)) && (indexLightbox < ((stateGalerie.nbPages - 1) * stateGalerie.imgsPerPage))) { 
            dispatch({type: 'nextPage'});
        }
    },[indexLightbox,stateGalerie.images]);

    useEffect(()=> {
        if(stateGalerie.previousPageLoaded) { 
            window.addEventListener('scroll', handleScroll, {
                passive: true
            });
        }
        return(()=> {
            window.removeEventListener('scroll', handleScroll);
        });
    },[stateGalerie.previousPageLoaded]);

    useEffect(() => {
        if(stateGalerie.request) {
            let id = stateGalerie.request.id ? stateGalerie.request.id : "";
            let theme = stateGalerie.request.theme ? `&galerie.theme=${stateGalerie.request.theme }` : "";
            let page = stateGalerie.request.page ? stateGalerie.request.page : "";
            let sizeMin = stateGalerie.request.sizeMin ? stateGalerie.request.sizeMin : "";
            let sizeMax = stateGalerie.request.sizeMax ? stateGalerie.request.sizeMax : "";
            let yearMin = /*""*/stateGalerie.request.yearMin ? stateGalerie.request.yearMin : "";
            let yearMax = /*""*/stateGalerie.request.yearMax ? stateGalerie.request.yearMax : "";
        axios.get(`http://localhost:8000/api/images?galerie.reference=svenrybin&galerie.id=${id}${theme}&order[ordre]=asc&tableau.surface[gte]=${sizeMin}&tableau.surface[lte]=${sizeMax}&tableau.year[gte]=${yearMin}&tableau.year[lte]=${yearMax}&page=${page}`).then(response => {dispatch({type: 'imagesUpdate', payload: {images: response.data['hydra:member'], totalItems: response.data['hydra:totalItems']}});console.log(response)});
        {/*axios.get(`https://90.118.74.20:8000/api/images?galerie.reference=svenrybin&galerie.id=${id}${theme}&order[ordre]=asc&tableau.surface[gte]=${sizeMin}&tableau.surface[lte]=${sizeMax}&tableau.year[gte]=${yearMin}&tableau.year[lte]=${yearMax}&page=${page}`).then(response => {dispatch({type: 'imagesUpdate', payload: {images: response.data['hydra:member'], totalItems: response.data['hydra:totalItems']}});console.log(response)});*/}
        }
    },[stateGalerie.request]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/galeries?reference=svenrybin").then(response => {dispatch({type: 'initGalerie', payload: {galeries: response.data['hydra:member'], id: galerieId}});console.log(response)});
        {/*axios.get("https://90.118.74.20:8000/api/galeries?reference=svenrybin").then(response => {dispatch({type: 'initGalerie', payload: {galeries: response.data['hydra:member'], id: galerieId}});console.log(response)});*/}
        import('masonry-layout').then( data => setModuleMasonry(data));
    }, []);

    function StatutGalerieBottom() {
        if(stateGalerie.request.page > 1) {
            if(stateGalerie.galerieLoaded && stateGalerie.previousPageLoaded && (stateGalerie.request.page == stateGalerie.nbPages)) {
                var statut = <h3>Fin de la galerie</h3>
            } else {
                var statut = <h3 className="clignote">Chargement...</h3>
            }
            return (
                <div id={styles.next_statut_galerie}>
                    <hr/>
                    <div>{statut}</div>
                </div>
            );
        } else {
            return (
                <div id={styles.next_statut_galerie} style={{display: stateGalerie.galerieLoaded ? '' :  'none' } }>
                    <hr/>
                    <div>
                        <h3>Fin de la galerie</h3>
                    </div>
                </div>
            );
        }
    }

    return (

        <main id={styles.galerie}>
            {/*<SimpleReactLightbox>*/}
                <div id={styles.galerie_title}>
                    <h3>SVEN RYBIN</h3>
                    <h2>Galerie</h2>
                </div>

                {stateGalerie.galeries && <FiltreFormGalerie dispatch={dispatch} galerieSelect={stateGalerie.galerieSelect} galeriesSelect={stateGalerie.galeriesSelect} theme={stateGalerie.theme} themes={stateGalerie.themes}/>}

                {!stateGalerie.galerieLoaded && stateGalerie.request.page == 1 &&
                    <div id={styles.first_loading_galerie}>
                        <h3 className="clignote">Chargement...</h3>
                    </div>
                }

                {stateGalerie.galerieVide && stateGalerie.galerieLoaded &&
                    <div id={styles.galerie_vide}>
                        <h3>Aucun resultat.</h3>
                    </div>
                }

                <GalerieImages styles={styles2} images={stateGalerie.images} galerieLoaded={stateGalerie.galerieLoaded} imagesIsUnloaded={imagesIsUnloaded} setIndexLightbox={setIndexLightbox}/>

                {!stateGalerie.galerieVide && <StatutGalerieBottom/>}
            {/*</SimpleReactLightbox>*/}
        </main>

    );
    
}