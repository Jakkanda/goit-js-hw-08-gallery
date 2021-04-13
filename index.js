import galleryItems from './gallery-items.js';

const galleryItemTemplate = ({ preview, original, description }, index) => {
  return `
  <li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
      key="${index}"
    />
  </a>
</li>
`;
};

const overlayEl = document.querySelector('.lightbox__overlay');
const galleryListContainer = document.querySelector('.js-gallery');
const markup = galleryItems.map(galleryItemTemplate).join('');
galleryListContainer.insertAdjacentHTML('beforeend', markup);
const lightboxEl = document.querySelector('.js-lightbox');
const imgEl = document.querySelector('.lightbox__image');
const closeBtn = document.querySelector('button[data-action="close-lightbox"]');

galleryListContainer.addEventListener('click', onOpenModal);
closeBtn.addEventListener('click', onCloseModal);
overlayEl.addEventListener('click', onCloseModal);

document.addEventListener('keydown', event => {
  if (event.code === 'Escape') {
    onCloseModal();
  }
  navigateImage(event);
});

function onOpenModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const key = parseInt(event.target.getAttribute('key'), 10);

  lightboxEl.classList.add('is-open');

  setImagesForElement(imgEl, key);
}

function clearAttributesForElement(element) {
  element.src = '';
  element.alt = '';
}

function setImagesForElement(element, index) {
  element.src = galleryItems[index].original;
  element.alt = galleryItems[index].description;
  element.setAttribute('key', index);
}

function onCloseModal(event) {
  lightboxEl.classList.remove('is-open');
  clearAttributesForElement(imgEl);
}

function navigateImage(event) {
  let index = parseInt(imgEl.getAttribute('key'), 10);
  const indexOfLastElement = galleryItems.length - 1;
  const indexOfFirstElement = 0;
  if (event.code === 'ArrowLeft') {
    index !== indexOfFirstElement ? (index -= 1) : (index = indexOfLastElement);
  }
  if (event.code === 'ArrowRight') {
    index !== indexOfLastElement ? (index += 1) : (index = indexOfFirstElement);
  }

  setImagesForElement(imgEl, index);
}
