import Carousel from 'react-bootstrap/Carousel';
import Headphone from "../images/slides/headphone.png"
import Speaker from "../images/slides/speaker.png"
import Earphone  from "../images/slides/earphone.png"


function IndividualIntervalsExample() {
  return (
    <Carousel>

      <Carousel.Item interval={3000}>
          <div className='slide'>
            <div className='slide__content'>
              <h1 className='slide__content__heading'>Headphone</h1>
              <h2 className='slide__content__des'>Raining Offers For Hot Summer!</h2>
            </div>
            <img className='slide__image' src={Headphone} alt='Headphone'></img>
          </div>
      </Carousel.Item>

      <Carousel.Item interval={3000}>
          <div className='slide'>
            <div className='slide__content'>
              <h1 className='slide__content__heading'>Headphone</h1>
              <h2 className='slide__content__des'>Raining Offers For Hot Summer!</h2>
            </div>
            <img className='slide__image' src={Speaker} alt='Headphone'></img>
          </div>
      </Carousel.Item>

      <Carousel.Item interval={3000}>
      <div className='slide'>
            <div className='slide__content'>
              <h1 className='slide__content__heading'>Headphone</h1>
              <h2 className='slide__content__des'>Raining Offers For Hot Summer!</h2>
            </div>
            <img className='slide__image' src={Headphone} alt='Headphone'></img>
          </div>
      </Carousel.Item>

    </Carousel>
  );
}

export default IndividualIntervalsExample;