import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ images, updateModalParams }) => {
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
          updateModalParams={updateModalParams}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array,
  handleItemClick: PropTypes.func,
};

export default ImageGallery;
