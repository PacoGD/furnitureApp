import React from 'react';
import { withRouter, Link } from 'react-router-dom'
import './index.css'
import { CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption, Carousel, NavLink } from 'reactstrap';


const items = [
  {
    src: 'https://www.atrapamuebles.com/5656-large_default/mueble-de-salon-alida-mediterraneo.jpg',
  },
  {
    src: 'https://www.atrapamuebles.com/6417-large_default/dormitorio-matrimonio-tekkan.jpg',
  },
  {
    src: 'https://www.atrapamuebles.com/726-large_default/mesa-consola-extensible-4-en-1.jpg',
  }
];
class Landing extends React.Component {


  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }


  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });
    return (
      <div>
        <h4>HIGH QUALITY PRODUCTS FOR INDOOR & OUTDOOR USE</h4>

        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
        <div>
          <div className="container text-center">
            <br />
            <div className="row">
              <div className="col-sm-4">

                <Link to="/tables">Tables</Link>
                <Link to="/tables"><img src="https://i.pinimg.com/736x/cb/4c/53/cb4c53a5bd1d4a3510062bd53789beb9.jpg" className="img-responsive" alt="Image" /></Link>
              </div>
              <div className="col-sm-4">
                <Link to="/chairs">Chairs</Link>
                <Link to="/chairs"><img src="https://img1.kenayhome.com/25999-large_default/cali-silla-ratan-negro.jpg" className="img-responsive" alt="Image" /></Link>
              </div>
              <div className="col-sm-4">
                <Link to="/sofa">Sofa</Link>
                <Link to="/sofa"><img src="https://img2.kenayhome.com/28139-large_default/ohio-sofa-rincon-tapizado-tela-gris.jpg" className="img-responsive" alt="Image" /></Link>
              </div>

            </div>
          </div><br />
        </div>
      </div>
    );
  }

}
export default withRouter(Landing)