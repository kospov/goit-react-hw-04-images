import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ images, handleItemClick }) => {
  return (
    <ul className={s.imageGallery}>
      {images.map(el => (
        <ImageGalleryItem
          imageParams={{
            src: el.webformatURL,
            alt: el.tags,
            key: el.id,
            href: el.largeImageURL,
          }}
          handleItemClick={handleItemClick}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
