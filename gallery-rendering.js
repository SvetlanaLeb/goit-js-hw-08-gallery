import galleryItems from "./gallery-items.js";

const refs = {
     galleryList : document.querySelector('.js-gallery'),
     galleryMarkup : createGalleryMarkup(galleryItems),
     modalBox : document.querySelector('.js-lightbox'),
     closeButton : document.querySelector('button[data-action="close-lightbox"]'),
     lightboxImage : document.querySelector('.lightbox__image'),
     lightboxOverlay : document.querySelector('.lightbox__overlay'),
};

refs.galleryList.insertAdjacentHTML('beforeend', refs.galleryMarkup);
refs.galleryList.addEventListener('click', onGalleryListClick);
refs.closeButton.addEventListener('click', onCloseButtonClick);
refs.lightboxOverlay.addEventListener('click', onLightboxOverlayClick)

function createGalleryMarkup(galleryItems) {
   return galleryItems
        .map(({ preview, original, description }) => {
        return`

        <li class="gallery__item">
            
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                />
           
        </li>
        `
        })
        .join('');
};

function onGalleryListClick(evt) {
    const galleryItemEl = evt.target;
    const isGalleryItemEl = galleryItemEl.classList.contains('gallery__image');

    window.addEventListener('keydown', onEscKeyPress);
    
    if (!isGalleryItemEl) {
        return
    };

    refs.modalBox.classList.add('is-open');
    refs.lightboxImage.src = `${galleryItemEl.dataset.source}`;
    refs.lightboxImage.alt = `${galleryItemEl.alt}`;

    let newGalleryLeftItemEl;
    let newGalleryRightItemEl;

    if (galleryItemEl.parentNode.previousElementSibling !== null) {
     newGalleryLeftItemEl = galleryItemEl.parentNode.previousElementSibling.firstElementChild;
    };
    if (galleryItemEl.parentNode.nextElementSibling !== null) {
     newGalleryRightItemEl = galleryItemEl.parentNode.nextElementSibling.firstElementChild;
    }
    
    window.addEventListener('keydown', (event) =>{console.log(newGalleryRightItemEl)
   
        if (event.code === 'ArrowLeft') {

             refs.lightboxImage.src = `${newGalleryLeftItemEl.dataset.source}`;
             refs.lightboxImage.alt = `${newGalleryLeftItemEl.alt}`;
            
            if (newGalleryLeftItemEl.parentNode.previousElementSibling !== null) {
                
                newGalleryLeftItemEl = newGalleryLeftItemEl.parentNode.previousElementSibling.firstElementChild;
                newGalleryRightItemEl = newGalleryLeftItemEl.parentNode.nextElementSibling.firstElementChild;
            };
        };
       
        if (event.code === 'ArrowRight') {
            
            refs.lightboxImage.src = `${newGalleryRightItemEl.dataset.source}`;
            refs.lightboxImage.alt = `${newGalleryRightItemEl.alt}`;
            
            if ( newGalleryRightItemEl.parentNode.nextElementSibling !== null) {
            
                newGalleryRightItemEl = newGalleryRightItemEl.parentNode.nextElementSibling.firstElementChild;
                newGalleryLeftItemEl = newGalleryRightItemEl.parentNode.previousElementSibling.firstElementChild;
            };
        }
    });

}
   


function onCloseButtonClick() {
  
  window.removeEventListener('keydown', onEscKeyPress);

  window.removeEventListener('keydown', (event) =>{
   
        if (event.code === 'ArrowLeft') {

             refs.lightboxImage.src = `${newGalleryLeftItemEl.dataset.source}`;
             refs.lightboxImage.alt = `${newGalleryLeftItemEl.alt}`;
            
            if (newGalleryLeftItemEl.parentNode.previousElementSibling !== null) {
                
                newGalleryLeftItemEl = newGalleryLeftItemEl.parentNode.previousElementSibling.firstElementChild;
                newGalleryRightItemEl = newGalleryLeftItemEl.parentNode.nextElementSibling.firstElementChild;
            };
        };
       
        if (event.code === 'ArrowRight') {
            
            refs.lightboxImage.src = `${newGalleryRightItemEl.dataset.source}`;
            refs.lightboxImage.alt = `${newGalleryRightItemEl.alt}`;
            
            if ( newGalleryRightItemEl.parentNode.nextElementSibling !== null) {
            
                newGalleryRightItemEl = newGalleryRightItemEl.parentNode.nextElementSibling.firstElementChild;
                newGalleryLeftItemEl = newGalleryRightItemEl.parentNode.previousElementSibling.firstElementChild;
            };
        }
    });

    refs.modalBox.classList.remove('is-open');
    refs.lightboxImage.src ='';
    refs.lightboxImage.alt ='';

};

function onLightboxOverlayClick(evt) {
    
    if (evt.currentTarget === evt.target) {
    onCloseButtonClick()
}
};

function onEscKeyPress(evt) {

    if (evt.code === 'Escape') {
        onCloseButtonClick()
    }
};

