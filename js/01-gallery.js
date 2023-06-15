import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryEl = document.querySelector('.gallery');

const galleryItemEl = createGalleryItems(galleryItems);

galleryEl.insertAdjacentHTML('beforeend', galleryItemEl);

function createGalleryItems(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
    <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
}

galleryEl.addEventListener('click', imgClickHandler);
function imgClickHandler(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  const isImageItemEl = evt.target.classList.contains('gallery__image');

  if (!isImageItemEl) {
    return;
  }

  const currentImgUrl = evt.target.dataset.source;

  const instance = basicLightbox.create(
    `
		<img src="${currentImgUrl}" width="1280" height="auto"/>
        `,
    {
      onShow: instance => {
        window.addEventListener('keydown', onEscKeyPress);
      },
      onClose: instance => {
        window.removeEventListener('keydown', onEscKeyPress);
      },
    }
  );
  instance.show();

  function onEscKeyPress(evt) {
    const ESC_KEY_CODE = 'Escape';
    const isEscKey = evt.code === ESC_KEY_CODE;
    if (!isEscKey) return;
    instance.close();
  }
}
