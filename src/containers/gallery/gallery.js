import React, { useEffect, useState } from 'react';
import './gallery.css';
import LazyImage from '../../components/lazy-image/lazy-image';
import Dialog from '../../components/dialog/dialog';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [modal, setModal] = useState({ isVisible: false, imgSrc: '' });

  useEffect(() => {
    console.time('images load');
    fetch('images?limit=100')
      .then((res) => res.json())
      .then((data) => {
        console.log('Success:', data);
        console.timeEnd('images load');
        setImages(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <>
      <div className="row">
        {images.length > 0 ? (
          images.map((img) => (
            <div className="column" key={img.id}>
              <LazyImage
                src={`${img.url}.jpg`}
                onClick={(_) => setModal({ isVisible: true, imgSrc: `${img.url}.jpg` })}
                alt=""
              />
              <LazyImage
                src={`${img.user.profile_image}.webp`}
                onClick={(_) =>
                  setModal({
                    isVisible: true,
                    imgSrc: `${img.user.profile_image}.webp`,
                  })
                }
                alt=""
              />
            </div>
          ))
        ) : (
          <div>loading...</div>
        )}
      </div>
      <Dialog
        show={modal.isVisible}
        handleClose={(_) => setModal({ isVisible: false, imgSrc: '' })}
        children={
          <div className="imgbox">
            <img className="center-fit" src={modal.imgSrc} alt="" />
          </div>
        }
      ></Dialog>
    </>
  );
};

export default Gallery;
