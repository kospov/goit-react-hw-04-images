import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ imageParams, updateModalParams }) => {
  const { src, alt, key, href } = imageParams;

  const handleItemClick = () => {
    // const item = e.currentTarget;
    // const itemImage = e.target;

    updateModalParams({
      alt,
      href,
    });
  };

  return (
    <li className={s.item} id={key} onClick={handleItemClick}>
      <img src={src} alt={alt} className={s.image} href={href} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imageParams: PropTypes.object,
  handleItemClick: PropTypes.func,
};

export default ImageGalleryItem;
