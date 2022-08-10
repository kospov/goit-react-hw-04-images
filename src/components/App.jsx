import { useState, useEffect } from 'react';
import { fetchPhotos, per_page } from '../utils/fetch-api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [alt, setAlt] = useState('');
  const [href, setHref] = useState('');

  useEffect(() => {
    if (query === '') return;

    setIsLoading(true);

    fetchPhotos(query, page)
      .then(data => {
        setImages(prev => {
          return [...prev, ...data.hits];
        });
        setTotalHits(data.totalHits);
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }, [query, page]);

  const updateQuery = formInput => {
    setQuery(formInput);
    setPage(1);
    setImages([]);
  };

  const updatePage = () => {
    setPage(prev => prev + 1);
  };

  const calculateNumberPages = () => {
    return Math.ceil(totalHits / per_page);
  };

  const updateModalParams = ({ alt, href }) => {
    setIsOpenModal(true);
    setAlt(alt);
    setHref(href);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const closeModalByClickOnOverlay = () => {
    closeModal();
  };

  return (
    <div class="App">
      <Searchbar updateQuery={updateQuery} />
      {isLoading && <Loader />}
      {images.length === 0 || (
        <ImageGallery images={images} updateModalParams={updateModalParams} />
      )}
      {images.length === 0 || page === calculateNumberPages() || (
        <Button increasePageNumber={updatePage} />
      )}
      {isOpenModal && (
        <Modal
          modalParams={{ alt, href }}
          closeModalByClickOnOverlay={closeModalByClickOnOverlay}
          handleKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
};

export default App;
