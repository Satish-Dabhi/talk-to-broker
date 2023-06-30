import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './index.css'

const MyCarousel = ({ imageList }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} fade={true}>
      {
        imageList && imageList.length > 0 && imageList.map((item, index) => {
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
