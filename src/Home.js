import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 

import slideOneImage from './assets/images/slideone.jpg';
import slideTwoImage from './assets/images/slidetwo.webp';
import slideThreeImage from './assets/images/slidethree.webp';
import welcomeImage from './assets/images/welcome.png';

function Home() {
  return (
    <div>
      <div className="header-image-container" style={{   
          border: '5px solid #000',  
          borderRadius: '30px',     
        }}>
        <img className="d-block w-100 header-image"
            src={welcomeImage}
            alt="welcome banner" style = {{borderRadius: '30px'}}
            />
      </div>
      <div className="carousel-container mt-4"
      style={{
        height: '400px',
        border: '1px solid #ddd',   
        borderRadius: '8px',        
      }}> 
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src={slideOneImage}
              alt="First slide" 
            />
            <Carousel.Caption>
            <h3><Link to="/stockexplorer">Explore your next investment</Link></h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src={slideTwoImage}
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3><Link to="/stockexplorer">Study the history of different assets</Link></h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src={slideThreeImage}
              alt="Third slide"
            />
            <Carousel.Caption>
            <h3><Link to="/stockexplorer">Compare historic returns</Link></h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default Home;
