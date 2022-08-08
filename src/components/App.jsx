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
    isOpenModal: '',
    modal: {
      alt: '',
      href: '',
      key: '',
    },
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query) {
      this.getFirstPageQueriedPhotos();
    } else if (prevState.page !== page) {
      this.getNextPageQueriedPhotos(query, page);
    }
  }

  updateQuery = formInput => {
    this.setState({ query: formInput, page: 1 });
  };

  updatePage = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  updateModalParams = ({ imageParams }) => {
    const { alt, key, href } = imageParams;

    return this.setState({
      isOpenModal: false,
      modal: {
        alt,
        href,
        key,
      },
    });
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

  calculateNumberPages = () => {
    const { totalHits } = this.state;
    return Math.ceil(totalHits / per_page);
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
            handleItemClick={this.updateModalParams}
          />
        )}
        {images.length === 0 || page === this.calculateNumberPages() || (
          <Button increasePageNumber={this.updatePage} />
        )}
        {isOpenModal && <Modal imageParams={modal} />}
      </div>
    );
  }
}

export default App;
