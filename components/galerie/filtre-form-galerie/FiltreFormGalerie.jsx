import styles from './filtre_form_galerie.module.css'
import { useState } from 'react'
import Dropdown from 'react-dropdown';

export default function FiltreFormGalerie({dispatch, data}) {
    const [valueSelectGalerie, setValueSelectGalerie] = useState(data.galerieSelect);
    const [valueSelectTheme, setValueSelectTheme] = useState(data.themeSelect);
    const [valueSelectSize, setValueSelectSize] = useState(data.sizeSelect);

    function handleSubmit(e) {
        e.preventDefault();

        dispatch({type: 'galerieUnloaded'});

        let id;
        if(valueSelectGalerie.value.split('-')[0] != '0') {
            id = valueSelectGalerie.value.split('-')[0];
        } else {
            id = '';
        }

        let theme;
        let themeSelect;
        if(valueSelectTheme != 'Tous les thèmes') {
            theme = valueSelectTheme;
            themeSelect = valueSelectTheme;
        } else {
            theme = '';
            themeSelect = 'Tous les thèmes';
        }

        let yearMin = e.target[0].value;
        let yearMax = e.target[1].value;

        var sizeMin;
        var sizeMax;
        switch(valueSelectSize) {
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

        dispatch({type: 'changeRequest', payload: {galerieSelect: valueSelectGalerie, themeSelect: themeSelect, sizeSelect: valueSelectSize, minYearSelect: yearMin, maxYearSelect: yearMax, id: id, theme: theme, sizeMin: sizeMin, sizeMax: sizeMax, yearMin: yearMin, yearMax: yearMax}});
    }

    function handleSelectTheme(e) {
        setValueSelectTheme(e.value);
        setValueSelectGalerie({value: '0-Tous les thèmes', label: 'Toutes les galeries'});
    }

    function handleSelectGalerie(e) {
        setValueSelectTheme(e.value.split('-')[1]);
        setValueSelectGalerie(e);
    }

    function handleSelectSize(e) {
        setValueSelectSize(e.value);
    }

    const sizesSelect = [
        { value: '0', label: 'Toutes les tailles' },
        { value: 'petit', label: 'Petit' },
        { value: 'moyen', label: 'Moyen' },
        { value: 'grand', label: 'Grand' }
    ]

    return (
        <>
            <div id={styles.container_form}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <div>
                            <label htmlFor="select-themes">Thèmes</label>
                            <Dropdown id="select-themes" controlClassName={styles.select_control_themes} options={data.themesSelect} onChange={(e) => handleSelectTheme(e)} value={valueSelectTheme} placeholder="Thèmes..."/>
                        </div>
                        <div>
                            <label htmlFor="select-galeries">Galeries</label>
                            <Dropdown id="select-galeries" controlClassName={styles.select_control_galeries} options={data.galeriesSelect} onChange={(e) => handleSelectGalerie(e)} value={valueSelectGalerie} placeholder="Galeries..."/>
                        </div>
                        <div>
                            <label htmlFor="select-tailles">Tailles</label>
                            <Dropdown id="select-tailles" controlClassName={styles.select_control_sizes} options={sizesSelect} onChange={(e) => handleSelectSize(e)} value={valueSelectSize} placeholder="Tailles..."/>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="inputs-periode">Période</label>
                                <div id="inputs-periode" className={styles.inputs_range_year}>
                                    <input type="number" name="yearMin" min={process.env.NEXT_PUBLIC_MIN_YEAR} max={process.env.NEXT_PUBLIC_MAX_YEAR} defaultValue={data.minYearSelect}/>
                                    <input type="number" name="yearMax" min={process.env.NEXT_PUBLIC_MIN_YEAR} max={process.env.NEXT_PUBLIC_MAX_YEAR} defaultValue={data.maxYearSelect}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <input type="submit" value="VALIDER"/>
                    </div>
                </form>
            </div>
        </>    
    );
}

