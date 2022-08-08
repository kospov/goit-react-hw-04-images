import { Component } from 'react';
import {
  fetchFirstPhotos,
  fetchNextPhotos,
  per_page,
} from '../utils/fetch-api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    totalHits: '',
    isLoading: false,
    isOpenModal: false,
    modal: {
      alt: '',
      href: '',
    },
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query) {
      this.getFirstPageQueriedPhotos();
    } else if (prevState.page !== page) {
      this.getNextPageQueriedPhotos(query, page);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  updateQuery = formInput => {
    this.setState({ query: formInput, page: 1 });
  };

  getFirstPageQueriedPhotos = () => {
    const { query, page } = this.state;

    this.setState({ isLoading: true });

    return fetchFirstPhotos(query, page)
      .then(data => {
        return this.setState({
          page: 1,
          images: [...data.hits],
          totalHits: data.totalHits,
        });
      })
      .catch(error => console.log(error))
      .finally(() => this.setState({ isLoading: false }));
  };

  getNextPageQueriedPhotos = () => {
    const { images, query, page } = this.state;

    this.setState({ isLoading: true });

    return fetchNextPhotos(query, page)
      .then(data => {
        return this.setState({
          images: [...images, ...data.hits],
          totalHits: data.totalHits,
        });
      })
      .catch(error => console.log(error))
      .finally(() => this.setState({ isLoading: false }));
  };

  updatePage = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  calculateNumberPages = () => {
    const { totalHits } = this.state;
    return Math.ceil(totalHits / per_page);
  };

  updateModalParams = ({ alt, href }) => {
    return this.setState({
      isOpenModal: true,
      modal: {
        alt,
        href,
      },
    });
  };

  closeModal = () => {
    this.setState({ isOpenModal: false });
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.closeModal();
    }
  };

  closeModalByClickOnOverlay = () => {
    this.closeModal();
  };

  render() {
    const { images, page, isLoading, isOpenModal, modal } = this.state;

    return (
      <div class="App">
        <Searchbar updateQuery={this.updateQuery} />
        {isLoading && <Loader />}
        {images.length === 0 || (
          <ImageGallery
            images={images}
            updateModalParams={this.updateModalParams}
          />
        )}
        {images.length === 0 || page === this.calculateNumberPages() || (
          <Button increasePageNumber={this.updatePage} />
        )}
        {isOpenModal && (
          <Modal
            modalParams={modal}
            closeModalByClickOnOverlay={this.closeModalByClickOnOverlay}
          />
        )}
      </div>
    );
  }
}

export default App;
