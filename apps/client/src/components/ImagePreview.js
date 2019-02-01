import React from 'react';

function ImagePreview ({ src, onOverlayClick = () => {} }) {
  return (
    <div className="image-preview" onClick={onOverlayClick}>
      <div className="image-preview__img-wrapper">
        <img src={src} />
      </div>
    </div>
  );
}

export default ImagePreview;
