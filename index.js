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

const galleryListContainer = document.querySelector('.js-gallery');
const markup = galleryItems.map(galleryItemTemplate).join('');
galleryListContainer.insertAdjacentHTML('beforeend', markup);

// Modal
const lightboxEl = document.querySelector('.js-lightbox');
const imgEl = document.querySelector('.lightbox__image');

function isOpenModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const key = parseInt(event.target.getAttribute('key'), 10);

  lightboxEl.classList.add('is-open');
  imgEl.src = galleryItems[key].original;
  imgEl.setAttribute('key', key);
}
galleryListContainer.addEventListener('click', isOpenModal);

// Button
const closeBtn = document.querySelector('button[data-action="close-lightbox"]');

function isCloseModal(event) {
  lightboxEl.classList.remove('is-open');
  imgEl.src = '';
}

closeBtn.addEventListener('click', isCloseModal);

const overlayEl = document.querySelector('.lightbox__overlay');
overlayEl.addEventListener('click', isCloseModal);

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

  imgEl.src = galleryItems[index].original;
  imgEl.setAttribute('key', index);
}

document.addEventListener('keydown', event => {
  if (event.code === 'Escape') {
    isCloseModal();
  }
  navigateImage(event);
});
