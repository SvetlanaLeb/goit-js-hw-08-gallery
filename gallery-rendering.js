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
    
    let newGalleryLeftItemEl = galleryItemEl.parentNode.previousElementSibling.firstElementChild;
    let newGalleryRightItemEl = galleryItemEl.parentNode.nextElementSibling.firstElementChild;
    
    window.addEventListener('keydown', (event) =>{
   
    if (event.code === 'ArrowLeft') {
        
        refs.lightboxImage.src = `${newGalleryLeftItemEl.dataset.source}`;
        refs.lightboxImage.alt = `${newGalleryLeftItemEl.alt}`;
        newGalleryLeftItemEl = newGalleryLeftItemEl.parentNode.previousElementSibling.firstElementChild;
        
        
        };
    if (event.code === 'ArrowRight') {
        
        refs.lightboxImage.src = `${newGalleryRightItemEl.dataset.source}`;
        refs.lightboxImage.alt = `${newGalleryRightItemEl.alt}`;
        newGalleryRightItemEl = newGalleryRightItemEl.parentNode.nextElementSibling.firstElementChild;
         
        };    
});

}
   


function onCloseButtonClick() {
    window.removeEventListener('keydown', onEscKeyPress);

    window.removeEventListener('keydown', (event) =>{
   
    if (event.code === 'ArrowLeft') {
        
        refs.lightboxImage.src = `${newGalleryItemEl.dataset.source}`;
        refs.lightboxImage.alt = `${newGalleryItemEl.alt}`;
        newGalleryItemEl = newGalleryItemEl.parentNode.previousElementSibling.firstElementChild;
        
        };
    if (event.code === 'ArrowRight') {
        
        refs.lightboxImage.src = `${newGalleryItemEl.dataset.source}`;
        refs.lightboxImage.alt = `${newGalleryItemEl.alt}`;
        newGalleryItemEl = newGalleryItemEl.parentNode.nextElementSibling.firstElementChild;
        
        };    
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

