import React from 'react';
import css from './ImageGalleryItem.module.css'

export const ImageGalleryItem = React.forwardRef(({ image, onClick }, ref) => (
  <li className={css.ImageGalleryItem} id={image.id} onClick={onClick} ref={ref}>
    <img
      src={image.webformatURL}
      alt={image.tags}
      name={image.largeImageURL}
      className={css.ImageGalleryItemImage}
    />
  </li>
));
