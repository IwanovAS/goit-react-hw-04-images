import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, onImageClick, firstNewImageRef }) => (
  <ul className={css.ImageGallery}>
    {images.map((image, index) => (
      <ImageGalleryItem 
      onClick={onImageClick} 
      image={image} 
      key={index}
      ref={index === 0 ? firstNewImageRef : null} 
      />
    ))}
  </ul>
);

export default ImageGallery;