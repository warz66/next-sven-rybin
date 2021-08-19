import styles from './filtre_form_galerie.module.css'
import { useState } from 'react'

export default function FiltreFormGalerie({dispatch, galerieId, galeries, theme, themes}) {
    const [valueSelectId, setValueSelectId] = useState(galerieId);
    const [valueSelectTheme, setValueSelectTheme] = useState();

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

    function handleSelectTheme(e) {
        setValueSelectTheme(e.target.value);
        setValueSelectId("");
    }

    function handleSelectId(e) {
        setValueSelectId(e.target.value);
        setValueSelectTheme(e.target.options[e.target.selectedIndex].dataset.theme);
    }

    return (
        <>
            {galeries && <div id={styles.container_form}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <select value={valueSelectTheme} defaultValue={theme} onChange={(e) => handleSelectTheme(e)}>
                            <option value="">Tous les thèmes</option>
                            {themes.map((theme, index) =>
                                <option key={index} value={theme}>{theme}</option>
                            )}
                        </select>
                        <select value={valueSelectId} onChange={(e) => handleSelectId(e)}>
                            <option value="">Toutes les galeries</option>
                            {galeries.map(galerie =>
                                <option key={galerie.id} value={galerie.id} data-theme={galerie.theme}>{galerie.title}</option>
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
                    </div>
                    <div>
                        <input id={styles.valider} type="submit" value="Valider"/>
                    </div>
                </form>
            </div>}
        </>    
    );
}

