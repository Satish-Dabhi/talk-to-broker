import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './index.css'

const MyCarousel = ({ imageList }) => {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(imageList);
  }, [imageList])


  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} fade={true}>
      {
        images && images.length > 0 && images.map((item, index) => {
          return (
            <Carousel.Item className='property-detail-carousel'>
              <img className="d-block w-100" src={item} alt={`item-${index}`} />
            </Carousel.Item>)
        })
      }
    </Carousel>
  );
};

export default MyCarousel;
