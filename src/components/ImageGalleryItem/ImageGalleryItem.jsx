import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ imageParams, handleItemClick }) => {
  const { src, alt, key, href } = imageParams;

  handleItemClick = e => {
    // console.log(e.currentTarget);
    return this.props.handleModalParams({ src, alt, key, href });
  };

  return (
    <li className={s.item} key={key} onclick={() => handleItemClick()}>
      <img src={src} alt={alt} className={s.image} href={href} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imageParams: PropTypes.object,
  handleItemClick: PropTypes.func,
};

export default ImageGalleryItem;
