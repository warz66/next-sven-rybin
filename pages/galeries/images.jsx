import Link from 'next/link'
import styles from './images.module.css'
import styles2 from '../../components/galerie/galerie-images/galerie_images.module.css'
import { useEffect, useState, useReducer } from 'react'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import imagesLoaded from 'imagesloaded'
import GalerieImages from '../../components/galerie/galerie-images/GalerieImages'
import FiltreFormGalerie from '../../components/galerie/filtre-form-galerie/FiltreFormGalerie'

const initialState = {
    adress: process.env.NEXT_PUBLIC_GALERIES_ADRESS, 
    reference: process.env.NEXT_PUBLIC_GALERIES_REFERENCE, 
    clientAxios: null,
    galeries: false,
    galeriesLoaded: false,
    galerie: false,
    galerieLoaded: false,
    errorInitGalerie: false,
    errorImagesUpdate: false,
    totalImages: 0,
    imgsPerPage: process.env.NEXT_PUBLIC_GALERIES_IMGS_PER_PAGE,
    nbPages: 0,
    galeriesSelect: {},
    galerieSelect: {},
    sizeSelect: '0', 
    themes: [],
    theme: '',
    minYearSelect: process.env.NEXT_PUBLIC_MIN_YEAR,
    maxYearSelect: process.env.NEXT_PUBLIC_MAX_YEAR,
    galerieVide: false,
    images: [],
    request: false,
    previousPageLoaded: false,
};
  
function reducer(state, action) {

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
            return { ...state, clientAxios: action.payload.clientAxios, galeriesLoaded: true, galeries: action.payload.galeries, galerieSelect: galerieSelect, galeriesSelect: galeriesSelect, themes: themes, theme: theme, request: { id: id, page: 1 } };
        }
        case 'errorInitGalerie': 
            return { ...state, errorInitGalerie: true };
        case 'imagesUpdate': 
            if(action.payload.totalItems != 0) {
                let nbPages = Math.ceil(action.payload.totalItems/state.imgsPerPage);
                let images = [...state.images, ...action.payload.images];
                return { ...state, galerieLoaded: false , galerieVide: false, totalImages: action.payload.totalItems, nbPages: nbPages, images: images};
            } else {
                return { ...state, errorImagesUpdate: false, galerieLoaded: true, galerieVide: true };
            }
        case 'errorImagesUpdate':
            return { ...state, errorImagesUpdate: true }
        case 'changeRequest': {
            return { ...state, galerieSelect: action.payload.galerieSelect, theme: action.payload.theme, sizeSelect: action.payload.sizeSelect, minYearSelect: action.payload.minYearSelect, maxYearSelect: action.payload.maxYearSelect, images: [], request: { id: action.payload.id, theme: action.payload.theme, page: 1, sizeMin: action.payload.sizeMin, sizeMax: action.payload.sizeMax, yearMin: action.payload.yearMin, yearMax: action.payload.yearMax} };
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
            return { ...state, previousPageLoaded: false, galerieLoaded: false };
        default:
            return initialState;    
    }
}

export default function Galeries({galerieId = 240}) {
    const [stateGalerie, dispatch] = useReducer(reducer, initialState);
    //const [clientAxios, setClientAxios] = useState();
    const [moduleMasonry, setModuleMasonry] = useState(false);
    const [masonry, setMasonry] = useState();
    const [indexLightbox, setIndexLightbox] = useState(0);
    
    /*function classNameByWidth(width) {
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
    } */

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

            dispatch({ type: 'galerieUnloaded'});

            masonry.reloadItems();
            
            var imgLoad = imagesLoaded(`.${styles2.grid}`);
            imgLoad.on('always', onAlways);

            return(()=> {
                imgLoad.off('always', onAlways);
            });
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

            stateGalerie.clientAxios.get(`/images?galerie.reference=${stateGalerie.reference}&galerie.id=${id}${theme}&order[ordre]=asc&tableau.surface[gte]=${sizeMin}&tableau.surface[lte]=${sizeMax}&tableau.year[gte]=${yearMin}&tableau.year[lte]=${yearMax}&page=${page}`).then(response => {dispatch({type: 'imagesUpdate', payload: {images: response.data['hydra:member'], totalItems: response.data['hydra:totalItems']}});console.log(response)}).catch(error => {dispatch({type:'errorImagesUpdate'});console.log(error)});
        }
    },[stateGalerie.request]);

    useEffect(() => {
        const client = axios.create({ baseURL: stateGalerie.adress });
        axiosRetry(client, {
            retries: 3,
            retryDelay: (retryCount) => {
                console.log(`retry attempt: ${retryCount}`);
                return retryCount * 1000;
            },
            retryCondition: (error) => {
                return error.response.status >= 400;
            },
        });
        client.get(`/galeries?reference=${stateGalerie.reference}`).then(response => {dispatch({type: 'initGalerie', payload: { clientAxios: client, galeries: response.data['hydra:member'], id: galerieId}});console.log(response)}).catch(error => {dispatch({type:'errorInitGalerie'});console.log(error)});

        import('masonry-layout').then( data => setModuleMasonry(data));
    }, []);

    function StatutGalerieBottom() {
        if(!stateGalerie.galerieVide) {
            if(stateGalerie.request.page > 1) {
                if(stateGalerie.galerieLoaded && stateGalerie.previousPageLoaded && (stateGalerie.request.page == stateGalerie.nbPages)) {
                    var statut = <span>Fin de la galerie</span>
                } else if(stateGalerie.errorImagesUpdate) {
                    var statut = <span>{"Erreur de communication avec l'Api. Les prochaines images ne pourront être chargées."}</span>  
                } else {
                    var statut = <span className="clignote">Chargement...</span>
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
                            <span>Fin de la galerie</span>
                        </div>
                    </div>
                );
            }
        }
        return null;
    }

    function FiltreFormGalerieLoaded() {
        if (stateGalerie.galeriesLoaded) {
            return <FiltreFormGalerie dispatch={dispatch} galerieSelect={stateGalerie.galerieSelect} galeriesSelect={stateGalerie.galeriesSelect} theme={stateGalerie.theme} themes={stateGalerie.themes} sizeSelect={stateGalerie.sizeSelect} minYearSelect={stateGalerie.minYearSelect} maxYearSelect={stateGalerie.maxYearSelect}/>
        } else if(!stateGalerie.errorInitGalerie) {
            return  <div id={styles.galerie_filtre_loaded}>
                        <span className="clignote">Chargement...</span>
                    </div>
        }
        return null;
    }

    function GalerieFirstLoadStatut() {
        if(!stateGalerie.galerieLoaded && stateGalerie.request.page == 1) {
            if(stateGalerie.errorImagesUpdate) {
                var statut = <span>{"Erreur de communication avec l'Api. Les images ne pourront être chargées."}</span>  
            } else {
                var statut = <span className="clignote">Chargement...</span>
            }
            return <div id={styles.galerie_first_loading}>
                        {statut}
                   </div>
        }
        return null;
    }

    return (

        <main id={styles.galerie}>

            <div id={styles.galerie_title}>
                <h3>SVEN RYBIN</h3>
                <h2>Galerie</h2>
            </div>

            <FiltreFormGalerieLoaded/>

            {stateGalerie.errorInitGalerie &&
                <div id={styles.galerie_error}>
                    <span>{"Erreur de communication avec l'Api. Veuillez réessayer ultérieurement et nous vous prions de nous en excuser."}</span>
                    <div>
                        <Link href="/">
                            <span className="btn">Accueil</span>
                        </Link>
                    </div>
                </div>
            }

            <GalerieFirstLoadStatut/>

            {stateGalerie.galerieVide && stateGalerie.galerieLoaded &&
                <div id={styles.galerie_vide}>
                    <span>Aucun resultat.</span>
                </div>
            }

            <GalerieImages styles={styles2} images={stateGalerie.images} galerieLoaded={stateGalerie.galerieLoaded} imagesIsUnloaded={imagesIsUnloaded} setIndexLightbox={setIndexLightbox}/>

            <StatutGalerieBottom/>

        </main>

    );
}