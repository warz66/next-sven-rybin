import { SRLWrapper } from 'simple-react-lightbox'

export default function GalerieImages({styles, images, formatWebp, galerieLoaded, imagesIsUnloaded, setIndexLightbox}) {

    const callbacks = {
        onSlideChange: object => {console.log(object);
            if(object.action = "right") {
                setIndexLightbox(object.index);
            }
        },
        /*onLightboxOpened: object => console.log(object),
        onLightboxClosed: object => console.log(object),
        onCountSlides: object => console.log(object)*/
    };

    const options = {
        /*settings: {
            autoplaySpeed: 3000,
            boxShadow: 'none',
            disableKeyboardControls: false,
            disablePanzoom: false,
            disableWheelControls: false,
            hideControlsAfter: false,
            lightboxTransitionSpeed: 0.3,
            lightboxTransitionTimingFunction: 'linear',
            overlayColor: 'rgba(30, 30, 30, 0.9)',
            slideAnimationType: 'fade',
            slideSpringValues: [300, 50],
            slideTransitionSpeed: 0.6,
            slideTransitionTimingFunction: 'linear',
            usingPreact: false
        },
        buttons: {
            backgroundColor: 'rgba(30,30,36,0.8)',
            iconColor: 'rgba(255, 255, 255, 0.8)',
            iconPadding: '10px',
            showAutoplayButton: true,
            showCloseButton: true,
            showDownloadButton: true,
            showFullscreenButton: true,
            showNextButton: true,
            showPrevButton: true,
            showThumbnailsButton: true,
            size: '40px'
        },
        caption: {
            captionAlignment: 'start',
            captionColor: '#FFFFFF',
            captionContainerPadding: '20px 0 30px 0',
            captionFontFamily: 'inherit',
            captionFontSize: 'inherit',
            captionFontStyle: 'inherit',
            captionFontWeight: 'inherit',
            captionTextTransform: 'inherit',
            showCaption: true
        }*/
    };

    return(

        <SRLWrapper options={options} callbacks={callbacks}>
            <div className={styles.grid}>
                <div className={styles.grid_sizer}/>
                <div className={styles.gutter_sizer}/>
                {images.length > 0 && 
                    images.map((image , index) =>
                        <div key={image.id} className={styles.grid_item+`${galerieLoaded ? '' : ' '+imagesIsUnloaded(index)}`}>
                            <div>
                                <a href={image.pathUrl} data-attribute="SRL">
                                    <img className={styles.grid_image} src={formatWebp ? image.pathUrlWebpCache : image.pathUrlCache} alt={image.tableau.year+'-'+image.tableau.height+'x'+image.tableau.width+' cm'+'-'+image.tableau.technique+'-'+image.tableau.title+'-'+image.caption } />
                                </a>
                                {(image.tableau.title || image.tableau.technique || image.tableau.year || (image.tableau.height && image.tableau.width)) && <div>
                                    <div className={styles.info_tableau}>
                                        <div>
                                            <span>{image.tableau.title}</span>
                                            <span>{image.tableau.technique}</span>
                                        </div>
                                        <div>
                                            <span>{image.tableau.year}</span>
                                            <span>{image.tableau.height && image.tableau.width ? image.tableau.height+'x'+image.tableau.width+' cm' : ""}</span>
                                        </div>
                                    </div>
                                    <hr />
                                </div>}
                            </div>
                        </div>
                    )
                }
            </div>
        </SRLWrapper>
    );
}