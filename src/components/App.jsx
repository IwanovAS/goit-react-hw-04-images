import React from 'react';
import { Component } from 'react';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { fetchImages } from 'components/FetchImages/fetchImages';

export class App extends Component {
  constructor(props) {
    super(props);
    this.firstNewImageRef = React.createRef();
  }
  state = {
    images: [],
    isLoading: false,
    currentSearch: '',
    pageNr: 1,
    modalOpen: false,
    modalImg: '',
    modalAlt: '',
    loadMore: true,
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.pageNr !== prevState.pageNr ||
      this.state.currentSearch !== prevState.currentSearch
    ) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    this.setState({ isLoading: true });

    const response = await fetchImages(
      this.state.currentSearch,
      this.state.pageNr
    );

    const { hits, totalHits } = response;

    this.setState(
      prevState => ({
        images: [...prevState.images, ...hits],
        isLoading: false,
        loadMore: prevState.pageNr < Math.ceil(totalHits / 12),
      }),
      () => {
        if (this.firstNewImageRef.current) {
          this.firstNewImageRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    );
  };

  handleSearch = query => {
    this.setState({
      currentSearch: query,
      images: [],
      pageNr: 1,
      loadMore: true,
    });
  };

  handleClickMore = () => {
    this.setState(prevState => ({
      pageNr: prevState.pageNr + 1,
    }));
  };

  handleImageClick = e => {
    this.setState({
      modalOpen: true,
      modalAlt: e.target.alt,
      modalImg: e.target.name,
    });
  };

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
      modalAlt: '',
      modalImg: '',
    });
  };

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        {this.state.isLoading && <Loader />}
        <SearchBar onSubmit={this.handleSearch} />

        {this.state.images.length > 0 && (
          <ImageGallery
            onImageClick={this.handleImageClick}
            images={this.state.images}
            firstNewImageRef={this.firstNewImageRef}
          />
        )}

        {this.state.images.length > 0 &&
          !this.state.isLoading &&
          this.state.loadMore && <Button onClick={this.handleClickMore} />}

        {this.state.modalOpen && (
          <Modal
            src={this.state.modalImg}
            alt={this.state.modalAlt}
            handleClose={this.handleModalClose}
          />
        )}
      </div>
    );
  }
}

export default App;
