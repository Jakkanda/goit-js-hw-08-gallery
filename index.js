import galleryItems from './gallery-items.js';

const galleryItemTemplate = ({ preview, original, description }) => {
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
    />
  </a>
</li>
`;
};

const galleryListContainer = document.querySelector('.js-gallery');
const markup = galleryItems.map(galleryItemTemplate).join('');

console.log(markup);
galleryListContainer.insertAdjacentHTML('beforeend', markup);
