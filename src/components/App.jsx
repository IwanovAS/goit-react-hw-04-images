import React, { useState, useEffect, useRef } from 'react';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { fetchImages } from 'components/FetchImages/fetchImages';

export function App() {
  const firstNewImageRef = useRef();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSearch, setCurrentSearch] = useState('');
  const [pageNr, setPageNr] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [loadMore, setLoadMore] = useState(true);

  useEffect(() => {
    const fetchImagesAndSetState = async () => {
      setIsLoading(true);

      const response = await fetchImages(currentSearch, pageNr);

      const { hits, totalHits } = response;

      setImages(prevImages => [...prevImages, ...hits]);
      setIsLoading(false);
      setLoadMore(pageNr < Math.ceil(totalHits / 12));

      if (firstNewImageRef.current) {
        firstNewImageRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    };
     if (pageNr > 1 || currentSearch) {
      fetchImagesAndSetState();
     }
  }, [pageNr, currentSearch]);
    
  const handleSearch = query => {
    setCurrentSearch(query);
    setImages([]);
    setPageNr(1);
    setLoadMore(true);
  };

  const handleClickMore = () => {
    setPageNr(prevPageNr => prevPageNr + 1);
  };

  const handleImageClick = e => {
    setModalOpen(true);
    setModalAlt(e.target.alt);
    setModalImg(e.target.name);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalAlt('');
    setModalImg('');
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}

      {images.length > 0 && (
        <ImageGallery
          onImageClick={handleImageClick}
          images={images}
          firstNewImageRef={firstNewImageRef}
        />
      )}

      {images.length > 0 && !isLoading && loadMore && (
        <Button onClick={handleClickMore} />
      )}

      {modalOpen && (
        <Modal src={modalImg} alt={modalAlt} handleClose={handleModalClose} />
      )}
    </div>
  );
}

export default App;
