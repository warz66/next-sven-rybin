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
                        <div className={styles.custom_select}>
                            <label htmlFor="select-themes">Thèmes</label>
                            <select id="select-themes" value={valueSelectTheme} defaultValue={theme} onChange={(e) => handleSelectTheme(e)}>
                                <optgroup/>
                                <optgroup><option value="">Tous les thèmes</option></optgroup>
                                {themes.map((theme, index) =>
                                    <optgroup><option key={index} value={theme}>{theme}</option></optgroup>
                                )}
                                <optgroup/>
                            </select>
                        </div>
                        <div className={styles.custom_select}>
                            <label htmlFor="select-galeries">Galeries</label>
                            <select id="select-galeries" value={valueSelectId} onChange={(e) => handleSelectId(e)}>
                                <option value="">Toutes les galeries</option>
                                {galeries.map(galerie =>
                                    <option key={galerie.id} value={galerie.id} data-theme={galerie.theme}>{galerie.title}</option>
                                )}
                            </select>
                        </div>
                        <div>
                            <div className={styles.custom_select}>
                                <label htmlFor="select-tailles">Tailles</label>
                                <select id="select-tailles" defaultValue={false}>
                                    <option value={false}>Toutes les tailles</option>
                                    <option value="petit">Petit</option>
                                    <option value="moyen">Moyen</option>
                                    <option value="grand">Grand</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="inputs-periode">Période</label>
                                <div id="inputs-periode" className={styles.inputs_range_year}>
                                    <input type="number" name="yearMin" min={process.env.NEXT_PUBLIC_MIN_YEAR} max={process.env.NEXT_PUBLIC_MAX_YEAR} defaultValue={process.env.NEXT_PUBLIC_MIN_YEAR}/>
                                    <input type="number" name="yearMax" min={process.env.NEXT_PUBLIC_MIN_YEAR} max={process.env.NEXT_PUBLIC_MAX_YEAR} defaultValue={process.env.NEXT_PUBLIC_MAX_YEAR}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <input type="submit" value="VALIDER"/>
                    </div>
                </form>
            </div>}
        </>    
    );
}

