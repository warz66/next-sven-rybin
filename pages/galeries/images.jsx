import Link from 'next/link'
import styles from './images.module.css'
import { useEffect, useState, useReducer } from 'react'
import axios from 'axios'
import imagesLoaded from 'imagesloaded'

const initialState = {
    galeries: false,
    galerie: false,
    totalImages: 0,
    imgsPerPage: 50, // récuperer cette valeur en variable globale
    nbPages: 0,
    themes: [],
    theme: false,
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
            let theme = false;
            action.payload.galeries.map((galerie, index) => {
                if (galerie.id == action.payload.id) {
                    id = galerie.id;
                    theme = galerie.theme;
                }
                if (galerie.theme) {
                    themes[index] = galerie.theme
                }
            });
            themes = [...new Set(themes)];
            return { ...state, galeries: action.payload.galeries, themes: themes, theme: theme, request: { id: id, page: 1 } };
        }
        case 'imagesUpdate': 
            if(action.payload.totalItems != 0) {
                console.log(action.payload.images);
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
    const [valueSelectId, setValueSelectId] = useState(galerieId);
    const [valueSelectTheme, setValueSelectTheme] = useState();

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
    }    

    function handleSubmit(e) {
        e.preventDefault();

        dispatch({  type: 'galerieUnloaded'});

        let theme = e.target[0].value;
        let id = e.target[1].value;
        let yearMin = e.target[3].value;
        let yearMax = e.target[4].value;
        var sizeMin;
        var sizeMax;
        switch(e.target[2].value) {
            case 'petit':
                sizeMin = false;
                sizeMax = process.env.NEXT_PUBLIC_SMALL_SIZE;
            break;
            case 'moyen':
                sizeMin = process.env.NEXT_PUBLIC_SMALL_SIZE;
                sizeMax = process.env.NEXT_PUBLIC_MIDDLE_SIZE
            break;
            case 'grand':
                sizeMin = process.env.NEXT_PUBLIC_MIDDLE_SIZE 
                sizeMax = false;
            break;
        }
        dispatch({type: 'changeRequest', payload: {id: id, theme: theme, sizeMin: sizeMin, sizeMax: sizeMax, yearMin: yearMin, yearMax: yearMax}});
    }

    function imagesIsUnloaded(index) {
        if(stateGalerie.images.length != stateGalerie.totalImages ) {
            if((index + 1) > (stateGalerie.images.length - stateGalerie.imgsPerPage)) {
                return styles.are_images_unloaded;
            }
        } else {
            if((index + 1) > ((stateGalerie.nbPages - 1) * stateGalerie.imgsPerPage)) {
                return styles.are_images_unloaded;
            }
        } 
    }

    function handleScroll() {
        let bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 150;
        if (bottom && stateGalerie.previousPageLoaded) {
            dispatch({type: 'nextPage'});
        }
    };

    useEffect(() => {

        if(stateGalerie.images.length > 0 && moduleMasonry) {

            var t0 = performance.now();

            dispatch({type: 'galerieUnloaded'});

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
            });

            imagesLoaded(`.${styles.grid}`).on('always', function() {
                dispatch({ type: 'galerieLoaded'});
                msnry.layout();
            });
            var t1 = performance.now();
            console.log("L'appel de doSomething a demandé " + (t1 - t0) + " millisecondes.")
        }

    }, [stateGalerie.images, moduleMasonry]);

    useEffect(() => {
        if(stateGalerie.request) {
            let id = stateGalerie.request.id ? stateGalerie.request.id : "";
            let theme = stateGalerie.request.theme ? `&galerie.theme=${stateGalerie.request.theme }` : "";
            let page = stateGalerie.request.page ? stateGalerie.request.page : "";
            let sizeMin = stateGalerie.request.sizeMin ? stateGalerie.request.sizeMin : "";
            let sizeMax = stateGalerie.request.sizeMax ? stateGalerie.request.sizeMax : "";
            let yearMin = stateGalerie.request.yearMin ? stateGalerie.request.yearMin : "";
            let yearMax = stateGalerie.request.yearMax ? stateGalerie.request.yearMax : "";
            axios.get(`http://localhost:8000/api/images?galerie.reference=svenrybin&galerie.id=${id}${theme}&order[ordre]=asc&tableau.surface[gte]=${sizeMin}&tableau.surface[lte]=${sizeMax}&tableau.year[gte]=${yearMin}&tableau.year[lte]=${yearMax}&page=${page}`).then(response => {dispatch({type: 'imagesUpdate', payload: {images: response.data['hydra:member'], totalItems: response.data['hydra:totalItems']}});console.log(response)});
        }
    },[stateGalerie.request]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/galeries?reference=svenrybin").then(response => {dispatch({type: 'initGalerie', payload: {galeries: response.data['hydra:member'], id: galerieId}});console.log(response)});
        import('masonry-layout').then( data => setModuleMasonry(data));
        //axios.get("http://90.118.74.20:8000/api/galerie/svenrybin").then(response => {handleGalerie(response.data);console.log(response)});
    }, []);

    useEffect(()=> {
        if(stateGalerie.previousPageLoaded) { 
            window.addEventListener('scroll', handleScroll, {
                passive: true
            });
        }
        return(()=> {
            window.removeEventListener('scroll', handleScroll);
        });
    },[stateGalerie.previousPageLoaded])

    function StatutGalerieBottom() {
        if(stateGalerie.request.page > 1) {
            if(stateGalerie.galerieLoaded && stateGalerie.previousPageLoaded && (stateGalerie.request.page == stateGalerie.nbPages)) {
                var statut = <h3>Fin de la galerie</h3>
            } else {
                var statut = <h3>Loading...</h3>
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
        <>

            <h1>Galerie Cosmique</h1>

            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>

            {stateGalerie.galeries && <div id={styles.container_form}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <select value={valueSelectTheme} defaultValue={stateGalerie.theme} onChange={(e) => setValueSelectTheme(e.target.value)}>
                        <option value="">Tous les thèmes</option>
                        {stateGalerie.themes.map((theme, index) =>
                            <option key={index} value={theme}>{theme}</option>
                        )}
                    </select>
                    <select value={valueSelectId} onChange={(e) => setValueSelectId(e.target.value)}>
                        <option value="">Toutes les galeries</option>
                        {stateGalerie.galeries.map(galerie =>
                            <option key={galerie.id} value={galerie.id}>{galerie.title}</option>
                        )}
                    </select>
                    <div>
                        <div className={styles.select_size}>
                            <select defaultValue={false}>
                                <option value={false}>Toutes les tailles</option>
                                <option value="petit">Petit</option>
                                <option value="moyen">Moyen</option>
                                <option value="grand">Grand</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div className={styles.inputs_range_year}>
                            <input type="number" name="yearMin" min={process.env.NEXT_PUBLIC_MIN_YEAR} max={process.env.NEXT_PUBLIC_MAX_YEAR} defaultValue={process.env.NEXT_PUBLIC_MIN_YEAR}/>
                            <input type="number" name="yearMax" min={process.env.NEXT_PUBLIC_MIN_YEAR} max={process.env.NEXT_PUBLIC_MAX_YEAR} defaultValue={process.env.NEXT_PUBLIC_MAX_YEAR}/>
                        </div>
                    </div>
                    <input type="submit" value="Valider"/>
                </form>
            </div>}

            {stateGalerie.images.length > 0 && <div className={styles.grid}>
                <div className={styles.grid_sizer}/>
                {stateGalerie.images.map((image , index) =>
                    <div key={image.id} className={styles.grid_item+' '+classNameByWidth(image.tableau.width)+`${stateGalerie.galerieLoaded ? '' : ' '+imagesIsUnloaded(index)}`}><img className={styles.grid_image} src={image.pathUrlCache} alt="sdfsdf" /></div>
                )}
            </div>}
            
            {!stateGalerie.galerieLoaded && stateGalerie.request.page == 1 &&
                <div id={styles.first_loading_galerie}>
                    <h3>Loading...</h3>
                </div>
            }

            {stateGalerie.galerieVide && stateGalerie.galerieLoaded &&
                <div>
                    <h3>Aucun resultat</h3>
                </div>
            }

            <StatutGalerieBottom/>

        </>
    );
    
}