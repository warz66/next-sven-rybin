import Link from 'next/link'
import styles from './galerie.module.css'
import styles2 from '../../components/galerie/galerie-images/galerie_images.module.css'
import { useEffect, useState, useReducer, useRef } from 'react'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import imagesLoaded from 'imagesloaded'
import GalerieImages from '../../components/galerie/galerie-images/GalerieImages'
import FiltreFormGalerie from '../../components/galerie/filtre-form-galerie/FiltreFormGalerie'
import Head from 'next/head'

const initialState = {
    clientAxios: null,
    formatWebp: false,
    galeries: false,
    galeriesLoaded: false,
    galerie: false,
    galerieLoaded: false,
    errorInitGalerie: false,
    errorImagesUpdate: false,
    galerieVide: false,
    previousPageLoaded: false,
    images: [],
    totalImages: 0,
    imgsPerPage: process.env.NEXT_PUBLIC_GALERIES_IMGS_PER_PAGE,
    nbPages: 0,
    dataFiltre: {
        galeriesSelect: {},
        galerieSelect: {},
        sizeSelect: '0',
        themesSelect: [],
        themeSelect: '',
        minYearSelect: process.env.NEXT_PUBLIC_MIN_YEAR,
        maxYearSelect: process.env.NEXT_PUBLIC_MAX_YEAR,

    },
    adress: process.env.NEXT_PUBLIC_GALERIES_ADRESS, 
    reference: process.env.NEXT_PUBLIC_GALERIES_REFERENCE, 
    request: {
        id: '',
        theme: '',
        page: '',
        sizeMin: '',
        sizeMax: '',
        yearMin: '',
        yearMax: '',
    },
};
  
function reducer(state, action) {

    switch (action.type) {
        case 'initGalerie': {
            let id = false;
            let themesSelect = [];
            let themeSelect = 'Tous les thèmes';
            let galeriesSelect = [{value: '0-Tous les thèmes', label: 'Toutes les galeries'}];
            let galerieSelect = {value: '0-Tous les thèmes', label: 'Toutes les galeries'};
            action.payload.galeries.map((galerie, index) => {
                if (galerie.id == action.payload.id) {
                    id = galerie.id;
                    themeSelect = galerie.theme;
                    galerieSelect = { value: galerie.id+'-'+galerie.theme, label: galerie.title }
                }
                if (galerie.theme) {
                    themesSelect[index] = galerie.theme;
                }
                galeriesSelect = [...galeriesSelect, {value: galerie.id+'-'+galerie.theme, label: galerie.title}]
            });
            themesSelect = [...new Set(themesSelect)];
            themesSelect.unshift('Tous les thèmes');
            return { ...state, clientAxios: action.payload.clientAxios, galeriesLoaded: true, galeries: action.payload.galeries, dataFiltre: { ...state.dataFiltre, galerieSelect: galerieSelect, galeriesSelect: galeriesSelect, themesSelect: themesSelect, themeSelect: themeSelect}, request: {...state.request, id: id, page: 1 } };
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
            return { ...state, images: [], dataFiltre: { ...state.dataFiltre, galerieSelect: action.payload.galerieSelect, themeSelect: action.payload.themeSelect, sizeSelect: action.payload.sizeSelect, minYearSelect: action.payload.minYearSelect, maxYearSelect: action.payload.maxYearSelect }, request: { id: action.payload.id, theme: action.payload.theme, page: 1, sizeMin: action.payload.sizeMin, sizeMax: action.payload.sizeMax, yearMin: action.payload.yearMin, yearMax: action.payload.yearMax} };
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
    const [moduleMasonry, setModuleMasonry] = useState(false);
    const [masonry, setMasonry] = useState();
    const [indexLightbox, setIndexLightbox] = useState(0);
    const lastImgRef = useRef(null);

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

    function handleScroll() { // faire mieux pour les perforances
        if(lastImgRef && stateGalerie.previousPageLoaded) {
            let rect = lastImgRef.current.getBoundingClientRect();
            let elemTop = rect.top;
            let elemBottom = rect.bottom;
            if((elemTop >= 0) && (elemBottom <= window.innerHeight)) {
                dispatch({type: 'nextPage'});
            }
        }
    };

    function onAlways() {
        dispatch({ type: 'galerieLoaded'});
    }

    function canUseWebp() {
        var elem = document.createElement('canvas');
        if (!!(elem.getContext && elem.getContext('2d'))) {
            return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
        } else {
            return false;
        }
    }

    useEffect(() => {
        if(stateGalerie.galerieLoaded && masonry) masonry.layout();
    },[stateGalerie.galerieLoaded]);

    useEffect(() => {
        if(moduleMasonry) {
            let Masonry = moduleMasonry.default;
            let msnry = new Masonry(`.${styles2.grid}`, {
                columnWidth: `.${styles2.grid_sizer}`,
                itemSelector: 'none',
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
        console.log(stateGalerie.previousPageLoaded);
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
        if(stateGalerie.clientAxios) {
            let id = stateGalerie.request.id;
            let theme = stateGalerie.request.theme ? `&galerie.theme=${stateGalerie.request.theme }` : "";
            let page = stateGalerie.request.page;
            let sizeMin = stateGalerie.request.sizeMin;
            let sizeMax = stateGalerie.request.sizeMax;
            let yearMin = ""/*stateGalerie.request.yearMin;*/
            let yearMax = ""/*stateGalerie.request.yearMax;*/

            stateGalerie.clientAxios.get(`/images?galerie.reference=${stateGalerie.reference}&galerie.id=${id}${theme}&order[ordre]=asc&tableau.surface[gte]=${sizeMin}&tableau.surface[lte]=${sizeMax}&tableau.year[gte]=${yearMin}&tableau.year[lte]=${yearMax}&page=${page}`).then(response => {dispatch({type: 'imagesUpdate', payload: {images: response.data['hydra:member'], totalItems: response.data['hydra:totalItems']}});console.log(response)}).catch(error => {dispatch({type:'errorImagesUpdate'});console.log(error)});
        }
    },[stateGalerie.request, stateGalerie.clientAxios]);

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
        const formatWebp = canUseWebp();
        client.get(`/galeries?reference=${stateGalerie.reference}`).then(response => {dispatch({type: 'initGalerie', payload: { clientAxios: client, formatWeb: formatWebp, galeries: response.data['hydra:member'], id: galerieId}});console.log(response)}).catch(error => {dispatch({type:'errorInitGalerie'});console.log(error)});

        import('masonry-layout').then( data => setModuleMasonry(data));
    }, []);

    function StatutGalerieBottom() {
        if(!stateGalerie.galerieVide) {
            if(stateGalerie.galerieLoaded && stateGalerie.previousPageLoaded && (stateGalerie.request.page == stateGalerie.nbPages)) {
                var statut = <span>Fin de la galerie</span>
            } else if(stateGalerie.errorImagesUpdate) {
                var statut = <span>{"Erreur de communication avec l'Api. Les prochaines images ne pourront être chargées."}</span>  
            } else {
                var statut = <span className="clignote">Chargement...</span>
            }
            return (
                <div id={styles.next_statut_galerie} style={{ display: ((stateGalerie.request.page == 1 || !stateGalerie.request.page) && stateGalerie.previousPageLoaded == false) ? "none" : "block"}}>
                    <div>{statut}</div>
                </div>
            );
        } 
        return null;
    }

    function FiltreFormGalerieLoaded() {
        if (stateGalerie.galeriesLoaded) {
            return <FiltreFormGalerie dispatch={dispatch} data={stateGalerie.dataFiltre}/>
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

        <main id={styles.galerie} className="global_padding">

            <Head>
                <title>Galerie | Sven Rybin</title>
            </Head>

            <div id={styles.galerie_title}>
                <h3>SVEN RYBIN</h3>
                <h2>Galerie</h2>
            </div>

            <FiltreFormGalerieLoaded/>

            {stateGalerie.errorInitGalerie &&
                <div id={styles.galerie_error}>
                    <span>{"Erreur de communication avec l'Api. Veuillez réessayer ultérieurement, nous vous prions de nous en excuser."}</span>
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
                    <span>{"Aucun résultat."}</span>
                </div>
            }

            <GalerieImages styles={styles2} images={stateGalerie.images} formatWebp={stateGalerie.formatWebp} galerieLoaded={stateGalerie.galerieLoaded} imagesIsUnloaded={imagesIsUnloaded} setIndexLightbox={setIndexLightbox} lastImgRef={lastImgRef}/>

            <StatutGalerieBottom/>

        </main>

    );
}