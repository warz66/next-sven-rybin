import Link from 'next/link'
import styles from './images.module.css'
import { useEffect, useState, useReducer } from 'react'
import axios from 'axios'
import imagesLoaded from 'imagesloaded'

const initialState = {
    galeries: false,
    galerie: false,
    images: false,
    request: false,
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
            action.payload.galeries.map(galerie => {
                if (galerie.id == action.payload.id) {
                    return { ...state, galeries: action.payload.galeries, galerie: galerie, request: { id: galerie.id } };
                }
            });
            return { ...state, galeries: action.payload.galeries, request: { page: 1 } };
        }
        case 'images': 
            return { ...state, images: action.payload.images};
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
        case 'changeRequest': {
            let galerie = false;
            state.galeries.map(galerieData => {
                if (galerieData.id == action.payload.id) {
                    galerie = galerieData;
                }
                return;
            });
            return { ...state, galerie: galerie, request: { id: action.payload.id, page: 1, sizeMin: action.payload.sizeMin, sizeMax: action.payload.sizeMax, yearMin: action.payload.yearMin, yearMax: action.payload.yearMax} };
        }
        case 'nextPage': {
            console.log(state.request);
            return { ...state, request: { ...state.request, page: state.request.page+1 }};
        }
        default:
            return initialState;    
    }
}

export default function Galeries({galerieId = 189}) {
    const [stateGaleries, dispatch] = useReducer(reducer, initialState);
    const [galerieLoaded, setGalerieLoaded] = useState(false);
    const [moduleMasonry, setModuleMasonry] = useState(false);
    const [valueSelect, setValueSelect] = useState(galerieId);
    const [valueCheckedYear, setValueCheckedYear] = useState(false);
    const [valueCheckedSize, setValueCheckedSize] = useState(false);

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

    function handleSubmit(e) {
        e.preventDefault();
        setGalerieLoaded(false);
        let id = e.target[0].value;
        let yearMin = e.target[4].value;
        let yearMax = e.target[5].value;
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
        dispatch({type: 'changeRequest', payload: {id: id, sizeMin: sizeMin, sizeMax: sizeMax, yearMin: yearMin, yearMax: yearMax}});
    }

    useEffect(() => {
        if(stateGaleries.images && moduleMasonry) {
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
            let totalImgs = stateGaleries.images.length;
            imagesLoaded(`.${styles.grid}`).on('progress', function() {
                count++;
                if(count == totalImgs) {
                    msnry.layout();
                    setGalerieLoaded(true);
                }
            });
        }
    }, [stateGaleries.images, moduleMasonry]);

    useEffect(() => {
        if(stateGaleries.request) {
            let id = stateGaleries.request.id ? stateGaleries.request.id : "";
            let page = stateGaleries.request.page ? stateGaleries.request.page : "";
            let sizeMin = stateGaleries.request.sizeMin && valueCheckedSize ? stateGaleries.request.sizeMin : "";
            let sizeMax = stateGaleries.request.sizeMax && valueCheckedSize ? stateGaleries.request.sizeMax : "";
            let yearMin = stateGaleries.request.yearMin && valueCheckedYear ? stateGaleries.request.yearMin : "";
            let yearMax = stateGaleries.request.yearMax && valueCheckedYear ? stateGaleries.request.yearMax : "";
            axios.get(`http://localhost:8000/api/images?galerie.reference=svenrybin&galerie.id=${id}&order[ordre]=asc&tableau.surface[gte]=${sizeMin}&tableau.surface[lte]=${sizeMax}&tableau.year[gte]=${yearMin}&tableau.year[lte]=${yearMax}&page=${page}`).then(response => {dispatch({type: 'images', payload: {images: response.data['hydra:member']}});console.log(response)});
        }
    },[stateGaleries.request]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/galeries?reference=svenrybin").then(response => {dispatch({type: 'galeries', payload: {galeries: response.data['hydra:member'], id: galerieId}});console.log(response)});
        import('masonry-layout').then( data => {setModuleMasonry(data); console.log(data.default)});
        //axios.get("http://90.118.74.20:8000/api/galerie/svenrybin").then(response => {handleGalerie(response.data);console.log(response)});
    }, []);

    return (
        <>

            <h1>Galerie Cosmique</h1>

            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>

            {stateGaleries.galeries && <div id={styles.container_form}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <select value={valueSelect} onChange={(e) => setValueSelect(e.target.value)}>
                        <option value="">Toutes les galeries</option>
                        {stateGaleries.galeries.map(galerie =>
                            <option key={galerie.id} value={galerie.id}>{galerie.title}</option>
                        )}
                    </select>
                    <div>
                        <input type="checkbox" name="taille" id="" checked={valueCheckedSize} onChange={(e) => setValueCheckedSize(e.target.checked)}/><label htmlFor="taille">Taille</label>
                        <div className={styles.select_size+`${valueCheckedSize ? "" : " "+styles.input_unchecked}` }>
                            <select defaultValue={false}>
                                <option value={false}>Toutes les tailles</option>
                                <option value="petit">Petit</option>
                                <option value="moyen">Moyen</option>
                                <option value="grand">Grand</option>
                            </select>
                        </div>
                        
                    </div>
                    <div>
                        <input type="checkbox" name="periode" id="" checked={valueCheckedYear} onChange={(e) => setValueCheckedYear(e.target.checked)}/><label htmlFor="periode">Période</label>
                        <div className={styles.inputs_range_year+`${valueCheckedYear ? "" : " "+styles.input_unchecked}` }>
                            <input type="number" name="yearMin" min={process.env.NEXT_PUBLIC_MIN_YEAR} max={process.env.NEXT_PUBLIC_MAX_YEAR} defaultValue={process.env.NEXT_PUBLIC_MIN_YEAR}/>
                            <input type="number" name="yearMax" min={process.env.NEXT_PUBLIC_MIN_YEAR} max={process.env.NEXT_PUBLIC_MAX_YEAR} defaultValue={process.env.NEXT_PUBLIC_MAX_YEAR}/>
                        </div>
                    </div>
                    <input type="submit" value="Valider"/>
                </form>
            </div>}

            <div className={galerieLoaded ? styles.grid : styles.grid+' '+styles.are_images_unloaded}>
                <div className={styles.grid_sizer}/>
                {stateGaleries.images && stateGaleries.images.map(image =>
                    <div key={image.id} className={styles.grid_item+' '+classNameByWidth(image.tableau.width)}><img className={styles.grid_image} src={image.pathUrlCache} alt="sdfsdf" /></div>
                )}
            </div>

            <button onClick={() => dispatch({type: 'nextPage'})}>nextPage</button>

        </>
    );
    
}