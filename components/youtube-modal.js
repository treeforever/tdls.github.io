
import React, { useState } from 'react';

import ModalVideo from 'react-modal-video';

export const ModalVideoContext = React.createContext();

export const YouTubeModalWrapper = ({ children }) => {
  const [{ isOpen, modalYoutubeId }, setModalState] = useState({ isOpen: false });
  const openYoutube = (youtubeId) => {
    setModalState({ isOpen: true, modalYoutubeId: youtubeId });
  }

  const closeYoutubeModal = () => {
    setModalState({ isOpen: false });
  }

  return (
    <ModalVideoContext.Provider
      value={(youtubeId) => openYoutube(youtubeId)}
    >
      {children}
      <ModalVideo
        channel='youtube'
        isOpen={isOpen}
        videoId={modalYoutubeId}
        onClose={closeYoutubeModal}
        autoplay={true}
      />
    </ModalVideoContext.Provider>
  );
};