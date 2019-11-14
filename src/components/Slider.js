import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';

import Slideshow from 'react-native-image-slider-show';
import {bannersFavorite} from './Banners';
import {connect} from 'react-redux';

const {height, width} = Dimensions.get('window');

class SlideshowTools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 1,
      interval: null,
      dataSource: [this.props.webtoonLocal.webtoons],
    };
  }
  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position:
            this.state.position === this.state.dataSource.length
              ? 0
              : this.state.position + 1,
        });
      }, 2000),
    });
  }
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }
  render() {
    const {webtoons} = this.props.webtoonLocal;
    return (
      <View style={styles.showBorder}>
        <Slideshow
          height={height * 0.364}
          dataSource={webtoons}
          position={this.state.position}
          onPositionChanged={position => this.setState({position})}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    webtoonLocal: state.webtoons,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SlideshowTools);

const styles = {
  showBorder: {
    height: height * 0.37,
    width: width * 0.933,
    marginTop: 15,
    borderColor: 'silver',
    borderWidth: 3,
    borderRadius: 5,
  },
};
