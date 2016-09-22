import '../styles/Base.css';

import React from 'react';
import Lightbox from 'react-image-lightbox';


class ImageComponent extends React.Component {

  static propTypes = {
    images: React.PropTypes.array
  };

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      isOpen: false
    };
  }

  openLightbox(index) {
    this.setState({
      isOpen: true,
      index: index
    });
  }

  closeLightbox() {
    this.setState({
      isOpen: false
    });
  }

  moveNext() {
    this.setState({
      index: (this.state.index + 1) % this.props.images.length
    });
  }

  movePrev() {
    this.setState({
      index: (this.state.index + this.props.images.length - 1) % this.props.images.length
    });
  }

  generateTitle({title, link}) {
    // prevent jsfmt's ugly style
    const child = <a
                    className={ 'link' }
                    target={ '_blank' }
                    href={ link }>(→ pixiv.netで見ます)</a>
    return <span>{ title } { child }</span>;
  }

  render() {
    if (this.state.isOpen) {
      return (
        <Lightbox
          mainSrc={ this.props.images[this.state.index].uri }
          nextSrc={ this.props.images[(this.state.index + 1) % this.props.images.length].uri }
          prevSrc={ this.props.images[(this.state.index + this.props.images.length - 1) % this.props.images.length].uri }
          imageTitle={ this.generateTitle(this.props.images[this.state.index]) }
          onCloseRequest={ this.closeLightbox.bind(this) }
          onMovePrevRequest={ this.movePrev.bind(this) }
          onMoveNextRequest={ this.moveNext.bind(this) } />
        );
    }

    return null;
  }

}

export default ImageComponent;